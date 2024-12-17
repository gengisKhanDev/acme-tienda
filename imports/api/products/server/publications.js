import { Products } from "../products.js";

import { check } from "meteor/check";

if(Meteor.isServer){
  ReactiveTable.publish("products", Products, {},{
      fields: {
        _id: 1,
       nombre: 1,
       nserie: 1,
       descripcion: 1,
       precio: 1,
       stock: 1,
       categoria: 1,
       proveedor: 1,
       sede: 1,
       createdAt: 1,
       createdBy: 1
     }
   });

  Meteor.publish("get.product", (id) => {
    if(Meteor.userId()){
      check(id, String);

      return Products.find({_id: id});
    }
    else {
      return [];
    }
  });

  Meteor.publish("get.products", () => {
    if(Meteor.userId()){
      return Products.find({});
    }
    else {
      return [];
    }
  });
}
