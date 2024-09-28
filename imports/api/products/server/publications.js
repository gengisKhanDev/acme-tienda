import { Products } from "../products.js";

import { check } from "meteor/check";

if(Meteor.isServer){
  ReactiveTable.publish("products", Products, {},{
      fields: {
        _id: 1,
       sede: 1,
       tipo: 1,
       marca: 1,
       color: 1,
       cantidad: 1,
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

  Meteor.publish("get.products.by.category.id", (id) => {
    if(Meteor.userId()){
      return Products.find({"category.id": id});
    }
    else {
      return [];
    }
  });


  Meteor.publish("get.products.public", () => {
    return Products.find({});
  });
}
