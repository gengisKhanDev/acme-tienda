import { ProductCategories } from "../product-categories.js";

import { check } from "meteor/check";

if(Meteor.isServer){
  ReactiveTable.publish("productCategories", ProductCategories, {},{
      fields: {
        _id: 1,
       codPostal: 1,
       ciudad: 1,
       direccion: 1,
       telefono: 1,
       createdAt: 1,
       createdBy: 1
     }
   });

  Meteor.publish("get.product-category", (id) => {
    if(Meteor.userId()){
      check(id, String);

      return ProductCategories.find({_id: id});
    } else {
      return [];
    }
  });

  Meteor.publish("get.product-categories", () => {
    if(Meteor.userId()){
      return ProductCategories.find({});
    } else {
      return [];
    }
  });

  Meteor.publish("get.product-categories.public", () => {
    return ProductCategories.find({});
  });
}
