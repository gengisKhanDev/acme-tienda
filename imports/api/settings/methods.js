import { check } from "meteor/check";
import { Random } from "meteor/random";

import { Settings } from "./settings.js";
import { Users } from "../users/users.js";

const createdBy = require("../../startup/server/created-by.js");

Meteor.methods({
  "company.info"(name, address, phoneNumber, email, taxID){
    console.log("Successfully ran [company.info]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(name, String);
    // check(address, Object);
    check(phoneNumber, String);
    check(email, String);
    check(taxID, String);

    const companyInfoExists = Settings.findOne({_id: "companyInfo"});
    if(companyInfoExists){
      if(address){
        Settings.update({_id: "companyInfo"},{
          $set: {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            taxID: taxID
          }
        });
      }
      else {
        Settings.update({_id: "companyInfo"},{
          $set: {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            taxID: taxID
          }
        });
      }
    }
    else {
      Settings.insert({
        _id: "companyInfo",
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        taxID: taxID,
        createdBy: createdBy.getUser(Meteor.userId()),
        createdAt: new Date()
      });
    }
  },
  "company.socialMedia"(facebook, twitter, google, instagram){
    console.log("Successfully ran [company.socialMedia]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(facebook, String);
    check(instagram, String);
    check(twitter, String);
    check(google, String);

    const companySocialMediaExists = Settings.findOne({_id: "socialMedia"});
    if(companySocialMediaExists){
      Settings.update({_id: "socialMedia"},{
        $set: {
          facebook: facebook,
          instagram: instagram,
          twitter: twitter,
          google: google,
          createdBy: createdBy.getUser(Meteor.userId()),
          createdAt: new Date()
        }
      });
    }
    else {
      Settings.insert({
        _id: "socialMedia",
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        google: google,
        createdBy: createdBy.getUser(Meteor.userId()),
        createdAt: new Date()
      });
    }
  },
  "upload.aboutUsImage"(fileObject){
    console.log("Ran Method [upload.aboutUsImage]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    const aboutUsImages = Settings.findOne({_id: "aboutUsImages"});
    if(typeof aboutUsImages === "undefined"){
      Settings.insert({_id: "aboutUsImages"});

      Settings.update({_id: "aboutUsImages"},{
        $push: {
          images: {
            id: Random.id(),
            name: fileObject.name,
            type: fileObject.type,
            base64: fileObject.base64,
            createdBy: createdBy.getUser(Meteor.userId()),
            createdAt: new Date()
          }
        }
      });
    }
    else {
      Settings.update({_id: "aboutUsImages"},{
        $push: {
          images: {
            id: Random.id(),
            name: fileObject.name,
            type: fileObject.type,
            base64: fileObject.base64,
            createdBy: createdBy.getUser(Meteor.userId()),
            createdAt: new Date()
          }
        }
      });
    }
  },
  "delete.aboutUsImage"(id){
    console.log("Ran Method [delete.aboutUsImage]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);

    Settings.update({_id: "aboutUsImages"},{
      $pull: {
        "images": {
          id: id
        }
      }
    });
  },
  "save.waiver"(text){
    console.log("Ran Method [save.waiver]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(text, String);

    const waiverExists = Settings.findOne({_id: "waiver"});
    if(waiverExists){
      Settings.update({_id: "waiver"},{
        $set: {
          text: text,
          createdBy: createdBy.getUser(Meteor.userId()),
          createdAt: new Date()
        }
      });
    }
    else {
      Settings.insert({
        _id: "waiver",
        text: text,
        createdBy: createdBy.getUser(Meteor.userId()),
        createdAt: new Date()
      });
    }
  },
  "openingClosingTimes"(openingTimeMondayToThursday, closingTimeMondayToThursday,
    openingTimeFridaySaturday, closingTimeFridaySaturday, openingTimeSunday, closingTimeSunday){
    console.log("Ran Method [openingClosingTimes]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(openingTimeMondayToThursday, String);
    check(closingTimeMondayToThursday, String);

    check(openingTimeFridaySaturday, String);
    check(closingTimeFridaySaturday, String);

    check(openingTimeSunday, String);
    check(closingTimeSunday, String);

    const openingClosingTimesExists = Settings.findOne({_id: "openingClosingTimes"});
    if(openingClosingTimesExists){
      Settings.update({_id: "openingClosingTimes"},{
        $set: {
          mondayToThursday: {
            opening: openingTimeMondayToThursday,
            closing: closingTimeMondayToThursday,
          },
          fridaySaturday: {
            opening: openingTimeFridaySaturday,
            closing: closingTimeFridaySaturday,
          },
          sunday: {
            opening: openingTimeSunday,
            closing: closingTimeSunday,
          },
          createdBy: createdBy.getUser(Meteor.userId()),
          createdAt: new Date()
        }
      });
    }
    else {
      Settings.insert({
        _id: "openingClosingTimes",
        times: {
          mondayToThursday: {
            opening: openingTimeMondayToThursday,
            closing: closingTimeMondayToThursday,
          },
          fridaySaturday: {
            opening: openingTimeFridaySaturday,
            closing: closingTimeFridaySaturday,
          },
          sunday: {
            opening: openingTimeSunday,
            closing: closingTimeSunday,
          },
        },
        createdBy: createdBy.getUser(Meteor.userId()),
        createdAt: new Date()
      });
    }
  }
});
