import { ProductCategories } from "./product-categories.js";
import { Products } from "../products/products.js";

import { check } from "meteor/check";

const createdBy = require("../../startup/server/created-by.js");
const colors = require("../../startup/server/colors.js");

Meteor.methods({
  "add.product-category"(codPostal, ciudad, direccion,telefono){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }
    return ProductCategories.insert({
      codPostal: codPostal,
      ciudad: ciudad,
      direccion: direccion,
      telefono: telefono,
      // color: colors.getRandom(),
      createdBy: createdBy.getUser(Meteor.userId()),
      createdAt: new Date()
    });
  },
  "edit.product-category"(id, codPostal, ciudad, direccion,telefono){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    console.log(codPostal)
    console.log(ciudad)
    console.log(direccion)

    ProductCategories.update({_id: id},{
      $set: {
        codPostal: codPostal,
        ciudad: ciudad,
        direccion: direccion,
        telefono: telefono
      }
    });

    Products.update({"category.id": id},{
      $set: {
        "category.name": ciudad
      }
    }, {multi: true});
  },
  "delete.product-category"(id){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);

    //check if this product category is attached to a product(s)
    const isAttached = Products.find({"category.id": id}).fetch();
    if(isAttached.length >= 1){
      throw new Meteor.Error("attached", "Can't delete this category because it's attached to product(s)");
    }

    ProductCategories.remove({_id: id});
  }
});
