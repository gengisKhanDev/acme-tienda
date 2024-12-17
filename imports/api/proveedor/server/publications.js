import { Proveedor } from "../proveedor.js";

import { check } from "meteor/check";

if(Meteor.isServer){
  ReactiveTable.publish("proveedor", Proveedor, {},{
      fields: {
        _id: 1,
       nombre: 1,
       direccion: 1,
       informacion_contacto: 1,
       createdAt: 1,
       createdBy: 1
     }
   });

  // Meteor.publish("get.proveedor", (id) => {
  //   if(Meteor.userId()){
  //     check(id, String);

  //     return Proveedor.find({_id: id});
  //   }
  //   else {
  //     return [];
  //   }
  // });

  Meteor.publish("get.proveedor", () => {
    if(Meteor.userId()){
      return Proveedor.find({});
    }
    else {
      return [];
    }
  });
}
