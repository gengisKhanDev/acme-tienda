import { Sede } from "./sede.js";
import { Products } from "../products/products.js";

import { check } from "meteor/check";

const createdBy = require("../../startup/server/created-by.js");
const colors = require("../../startup/server/colors.js");

Meteor.methods({
  "add.sede"(sede){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }
    return Sede.insert({
      nombre: sede.nombre,
      direccion: sede.direccion,
      capacidad: sede.capacidad,
      horario_atencion: sede.horario_atencion,
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

    Sede.update({_id: id},{
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

    Sede.remove({_id: id});
  }
});
