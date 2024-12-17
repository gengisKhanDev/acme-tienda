import { Sede } from "../sede.js";

import { check } from "meteor/check";

if(Meteor.isServer){
  ReactiveTable.publish("sede", Sede, {},{
      fields: {
        _id: 1,
       nombre: 1,
       capacidad: 1,
       direccion: 1,
     }
   });

  Meteor.publish("get.product-category", (id) => {
    if(Meteor.userId()){
      check(id, String);

      return Sede.find({_id: id});
    } else {
      return [];
    }
  });

  Meteor.publish("get.sede", () => {
    if(Meteor.userId()){
      return Sede.find({});
    } else {
      return [];
    }
  });
}
