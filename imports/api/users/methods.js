import { Users } from "./users.js";
import { Products } from "../products/products.js";
import { Sede } from "../sede/sede.js";
import { Settings } from "../settings/settings.js";

import { check } from "meteor/check";
import { Random } from "meteor/random";

Meteor.methods({
  "check.userRole"(email){
    console.log("Ran Method [check.userRole]");

    email = email.toLowerCase();

    //TODO check if DB email vaiable is uppercase
    const thisUser = Users.findOne({
      "emails.address": email
    });

    if(typeof thisUser === "undefined"){
      throw new Meteor.Error("no-user", "A user with this email does not exists!");
    }

    if(typeof thisUser.profile.role != "undefined"){
      return `${thisUser.profile.role.name.toLowerCase()}/products`;
    }
    else {
      throw new Meteor.Error("no-role", "You don't have a role assigned!");
    }
  },
  "public.invite.user"(firstName, lastName, dob, email, subscribedToCampaigns){
    console.log("Ran Method [invite.user]");

    check(firstName, String);
    check(lastName, String);
    // check(dob, Date);
    check(email, String);
    check(subscribedToCampaigns, Boolean);

    //check if email exists in DB
    const emailExists = Users.findOne({"emails.address": email});
    if(emailExists){
      throw new Meteor.Error(403, {message: "This email is already used"});
    }

    const userRoles = Settings.findOne({_id: "roles"}).roles;
    let thisUserRole = {};
    userRoles.forEach((userRole, index) => {
      if(userRole.name === "User") {
        thisUserRole.id = userRole.id;
        thisUserRole.name = userRole.name;
      }
    });

    const id = Accounts.createUser({
      username: firstName + lastName + "_" + Random.id(),
      dob: new Date(dob),
      email: email,
      password: Random.id(),
      profile: {
        firstName: firstName,
        lastName: lastName,
        role: thisUserRole,
        dob: new Date(dob),
        subscribedToCampaigns: subscribedToCampaigns
      }
    });

    Accounts.sendEnrollmentEmail(id, email);
  },
  "invite.user"(firstName, lastName, dob, email){
    console.log("Ran Method [invite.user]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(firstName, String);
    check(lastName, String);
    check(dob, String);
    check(email, String);

    //check if email exists in DB
    const emailExists = Users.findOne({"emails.address": email});
    if(emailExists){
      throw new Meteor.Error(403, {message: "This email is already used"});
    }

    const id = Accounts.createUser({
      username: firstName + lastName + "_" + Random.id(),
      dob: new Date(dob),
      email: email,
      password: Random.id(),
      profile: {
        firstName: firstName,
        lastName: lastName,
      }
    });

    Accounts.sendEnrollmentEmail(id, email);

    return id;
  },
  "edit.users"(id, firstName, lastName, dob){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);
    check(firstName, String);
    check(lastName, String);
    check(dob, Date);

    Users.update({_id: id},{
      $set: {
        "profile.firstName": firstName,
        "profile.lastName": lastName,
        "profile.dob": dob
      }
    });
  },
  "edit.user"(id, firstName, lastName, roleID){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);
    check(firstName, String);
    check(lastName, String);
    check(roleID, String);

    const roles = Settings.findOne({_id: "roles"}).roles;
    let thisRole = {};
    roles.forEach((role, index) => {
      if(role.id === roleID){
        thisRole = role;
      }
    });

    Users.update({_id: id},{
      $set: {
        profile: {
          firstName: firstName,
          lastName: lastName,
          role: {
            id: thisRole.id,
            name: thisRole.name
          }
        }
      }
    });

    Sede.update({"createdBy.id": id},{
      $set: {
        "createdBy.name": firstName + " " + lastName
      }
    }, {multi: true});

    Products.update({"createdBy.id": id},{
      $set: {
        "createdBy.name": firstName + " " + lastName
      }
    }, {multi: true});
  },
  "user.get"(id){
    console.log("Ran Method [user.get]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);

    return Users.findOne({_id: id});
  }
});
