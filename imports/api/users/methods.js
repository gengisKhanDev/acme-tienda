import { Users } from "./users.js";
import { Products } from "../products/products.js";
import { ProductCategories } from "../product-categories/product-categories.js";
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
  "subscription.user"(id, checkedBool){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }
    check(id, String);
    check(checkedBool, Boolean);

    Users.update({_id: id},{
      $set: {
        "profile.subscribedToCampaigns": checkedBool
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

    ProductCategories.update({"createdBy.id": id},{
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
  "delete.user"(id){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);

    //find user in DB
    const user = Users.findOne({_id: id});
    if(user.profile.role === "Super Admin"){
      throw new Meteor.Error("admin-user", "Can't delete this user!");
    }

    Users.remove({_id: id});
  },
  "user.get"(id){
    console.log("Ran Method [user.get]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);

    return Users.findOne({_id: id});
  },
  "user.happyBirthday.seen"(){
    console.log("Ran Method [user.happyBirthday.seen]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    Users.update({_id: Meteor.userId()},{
      $set: {
        "profile.hasShownHappyBirthday": true
      }
    });
  },
  "enter.user.code"(id, passcode){
    console.log("Ran Method [enter.user.code]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);
    check(passcode, String);

    Users.update({"_id": id},{
      $set: {
        "profile.passcode": passcode
      }
    });
  },
  "check.user.code"(id, passcode){
    console.log("Ran Method [check.user.code]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);
    check(passcode, String);

    const thisUser = Users.findOne({"_id": id});
    if(thisUser.profile.passcode === passcode && thisUser.profile.passcode.length === passcode.length){
      console.log("valid login");
      return {
        code: "valid login",
        role: thisUser.profile.role.name
      }
    }
    else if(thisUser != passcode && thisUser.profile.passcode.length === passcode.length){
      console.log("invalid login");
      return {
        code: "invalid login",
        role: thisUser.profile.role.name
      }
    }
  },
  "user.uploadAvatar"(id, avatarURL){
    console.log("Ran Method [user.uploadAvatar]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);
    check(avatarURL, String);

    Users.update({_id: id},{
      $set: {
        avatar: {
          type: "avatar",
          id: Random.id(),
          image: avatarURL
        }
      }
    });
  },
  "user.uploadImage"(id, fileObject){
    console.log("Ran Method [user.uploadImage]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);
    check(fileObject, Object);

    Users.update({_id: id},{
      $set: {
        avatar: {
          id: Random.id(),
          name: fileObject.name,
          type: fileObject.type,
          base64: fileObject.base64
        }
      }
    });
  }
});
