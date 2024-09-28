import { Email } from "meteor/email";
import { SSR } from "meteor/meteorhacks:ssr";

import { Settings } from "../../../api/settings/settings.js";
import { Users } from "../../../api/users/users.js";

const moment = require("moment");

Meteor.startup(function(){
  if(Meteor.isServer){
    SyncedCron.config({
      log: false,
      collectionName: "checkUpcomingBirthdays",
      utc: false
    });

    SyncedCron.add({
      name: "Check Upcoming Birthdays",
      schedule: function(parser){
        return parser.text("at 10:00 am");
      },
      job: function(){
        console.log("[Cron Job] Check Upcoming Birthdays");

        const users = Users.find({
          "profile.dob": {
            $exists: true
          }
        }).fetch();

        if(users.length >= 1){
          users.forEach((user, index) => {
            var today = moment(new Date()).startOf("day");
            var dob = moment(new Date(user.profile.dob)).startOf("day");
            var duration = moment.duration(dob.diff(today));
            var days = duration.asDays();

            if(days === 0){
              console.log("Happy birthday!");
              console.log(user.emails[0].address);

              const companyInfo = Settings.findOne({"_id": "companyInfo"});
              const socialMedia = Settings.findOne({"_id": "socialMedia"});

              const emailData = {
                url: Meteor.absoluteUrl(),
                logo: Meteor.absoluteUrl() + "logos/white.png",
                name: user.profile.firstName + " " + user.profile.lastName,
                socialMedia: socialMedia,
                businessName: companyInfo.name,
                currentYear: new Date().getFullYear(),
              };

              SSR.compileTemplate("happyBirthday", Assets.getText("happy-birthday.html"));

              Email.send({
                subject: "Happy Birthday! - Galaxy VR",
                to: user.emails[0].address,
                from: "noreply@galaxyvrcafe.com",
                html: SSR.render("happyBirthday", emailData)
              });
            }
          });
        }
      }
    });

    SyncedCron.start();
  }
});
