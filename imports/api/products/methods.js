import { Products } from "./products.js";
import { ProductCategories } from "../product-categories/product-categories.js"

import { check } from "meteor/check";
import { Random } from "meteor/random";

const createdBy = require("../../startup/server/created-by.js");
const toCents = require("../../startup/server/to-cents.js");

Meteor.methods({
  "add.product"(tipo, marca, color, descripcion){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }
    // const productCategory = ProductCategories.findOne({_id: ciudad});
    // const productCategoryObj = {
    //   id: productCategory._id,
    //   ciudad: productCategory.ciudad
    // };

    return Products.insert({
      tipo: tipo,
      marca: marca,
      color: color,
      descripcion: descripcion,
      //sede: productCategoryObj,
      createdBy: createdBy.getUser(Meteor.userId()),
      showOnMenu: true,
      createdAt: new Date()
    });
  },
  "agregar-sede.product"(id, cantidad, talla, ciudad){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    const productCategory = ProductCategories.findOne({_id: ciudad});
    const productCategoryObj = {
      id: productCategory._id,
      ciudad: productCategory.ciudad
    };

    Products.update({_id: id},{
      $set: {
      talla: talla,
      cantidad: cantidad,
      sede: productCategoryObj,
      }
    });
  },
  "mas-sedes.product"(tipo, marca, talla, color, descripcion, cantidad, ciudad){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    const productCategory = ProductCategories.findOne({_id: ciudad});
    const productCategoryObj = {
      id: productCategory._id,
      ciudad: productCategory.ciudad
    };

    return Products.insert({
      tipo: tipo,
      marca: marca,
      talla: talla,
      color: color,
      descripcion: descripcion,
      cantidad: cantidad,
      sede: productCategoryObj,
      createdBy: createdBy.getUser(Meteor.userId()),
      showOnMenu: true,
      createdAt: new Date()
    });
  },
  "edit.product"(id, tipo, marca, talla, color, cantidad, ciudad){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    const productCategory = ProductCategories.findOne({_id: ciudad});
    const productCategoryObj = {
      id: productCategory._id,
      ciudad: productCategory.ciudad
    };

    Products.update({_id: id},{
      $set: {
      tipo: tipo,
      marca: marca,
      talla: talla,
      color: color,
      cantidad: cantidad,
      sede: productCategoryObj,
      }
    });
  },
  "showOnMenu"(id, checkedBool){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }
    check(id, String);
    check(checkedBool, Boolean);

    Products.update({_id: id},{
      $set: {
        "showOnMenu": checkedBool
      }
    });
  },
  "delete.product"(id){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);

    Products.remove({_id: id});
  }
});
