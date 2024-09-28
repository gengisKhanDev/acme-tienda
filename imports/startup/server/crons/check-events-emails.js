import { Email } from "meteor/email";
import { SSR } from "meteor/meteorhacks:ssr";

import { Events } from "../../../api/events/events.js";
import { Users } from "../../../api/users/users.js";

const moment = require("moment");
const formatDate = require("../format-date.js");

const futureEvents = Events.find({
  emails: {
    $exists: true
  }
}).fetch();

if(futureEvents.length >= 1){
  futureEvents.forEach((futureEvent, index) => {
    const eventDate = moment(futureEvent.date);
    const today = moment(new Date());
    const daysDifference = eventDate.diff(today, "days");

    if(daysDifference == 1){
      futureEvent.emails.forEach((entry, index) => {
        const emailData = {
          url: Meteor.absoluteUrl(),
          logo: Meteor.absoluteUrl() + "logos/white.png",
          daysDifference: daysDifference,
          date: formatDate.formatDate(futureEvent.date, false),
          eventSlug: Meteor.absoluteUrl() + "events/" + futureEvent.slug,
          eventName: futureEvent.name
        };

        SSR.compileTemplate("eventReminder", Assets.getText("event-reminder.html"));

        Email.send({
          subject: "Upcoming Event!",
          to: entry.email,
          from: "noreply@galaxyvrcafe.com",
          html: SSR.render("eventReminder", emailData)
        });
      });
    }
  });
}

Meteor.startup(function(){
  if(Meteor.isServer){
    SyncedCron.config({
      log: false,
      collectionName: "checkEventsEmails",
      utc: false
    });

    SyncedCron.add({
      name: "Check Events Emails",
      schedule: function(parser){
        return parser.text("at 9:00 am");
      },
      job: function(){
        console.log("[Cron Job] Check Events Emails");

        const futureEvents = Events.find({
          emails: {
            $exists: true
          }
        }).fetch();

        if(futureEvents.length >= 1){
          futureEvents.forEach((futureEvent, index) => {
            const eventDate = moment(futureEvent.date);
            const today = moment(new Date());
            const daysDifference = eventDate.diff(today, "days");

            if(daysDifference == 1){
              futureEvent.emails.forEach((entry, index) => {
                const emailData = {
                  url: Meteor.absoluteUrl(),
                  logo: Meteor.absoluteUrl() + "logos/white.png",
                  daysDifference: daysDifference,
                  date: formatDate(futureEvent.date, false),
                  eventSlug: Meteor.absoluteUrl() + "events/" + futureEvent.slug,
                  eventName: futureEvent.name
                };

                SSR.compileTemplate("eventReminder", Assets.getText("event-reminder.html"));

                Email.send({
                  subject: "Upcoming Event!",
                  to: entry.email,
                  from: "noreply@galaxyvrcafe.com",
                  html: SSR.render("eventReminder", emailData)
                });
              });
            }
          });
        }
      }
    });

    SyncedCron.start();
  }
});
