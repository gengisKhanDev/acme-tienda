import { Users } from "../users.js";

import { check } from "meteor/check";

if (Meteor.isServer) {
  ReactiveTable.publish("users", Users, {}, {
    fields: {
      _id: 1,
      "profile.firstName": 1,
      "profile.lastName": 1,
      "profile.role.name": 1,
      createdAt: 1
    }
  });

  Meteor.publish("users.all", () => {
    if (Meteor.userId()) {
      return Users.find({});
    }
    else {
      return [];
    }
  });

  Meteor.publish("get.user", (id) => {
    if (Meteor.userId()) {
      return Users.find({ "_id": id })
    }
    else {
      return [];
    }
  });
}
