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
  },
  "removeImage.product"(id){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);

    Products.update({_id: id}, {
      $unset: {
        image: 1
      }
    });
  },
  "product.saveAddition"(foodID, payload){
    console.log("Ran Method [product.saveAddition]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(foodID, String);
    check(payload, Object);

    if(payload.id){
      const thisFood = Products.findOne({_id: foodID});
      thisFood.additions.forEach((addition, index) => {
        if(addition.id === payload.id){
          Products.update({_id: foodID, "additions.id": payload.id}, {
            $set:{
              "additions.$.name": payload.name,
              "additions.$.price": toCents.convert(payload.price),
            }
          });
        }
      });
    }
    else {
      Products.update({_id: foodID},{
        $push: {
          additions: {
            id: Random.id(),
            name: payload.name,
            price: toCents.convert(payload.price),
            createdBy: createdBy.getUser(Meteor.userId()),
            createdAt: new Date()
          }
        }
      });
    }
  },
  "product.deleteAddition"(foodID, id){
    console.log("Ran Method [product.deleteAddition]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(foodID, String);
    check(id, String);

    Products.update({_id: foodID},{
      $pull: {
        additions: {
          id: id
        }
      }
    });
  },
  "product.saveSize"(foodID, payload){
    console.log("Ran Method [product.saveSize]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(foodID, String);
    check(payload, Object);

    if(payload.id){
      const thisFood = Products.findOne({_id: foodID});
      thisFood.sizes.forEach((size, index) => {
        if(size.id === payload.id){
          Products.update({_id: foodID, "sizes.id": payload.id}, {
            $set:{
              "sizes.$.name": payload.name,
              "sizes.$.price": toCents.convert(payload.price),
            }
          });
        }
      });
    }
    else {
      Products.update({_id: foodID},{
        $push: {
          sizes: {
            id: Random.id(),
            name: payload.name,
            price: toCents.convert(payload.price),
            createdBy: createdBy.getUser(Meteor.userId()),
            createdAt: new Date()
          }
        }
      });
    }
  },
  "product.deleteSize"(foodID, id){
    console.log("Ran Method [product.deleteSize]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(foodID, String);
    check(id, String);

    Products.update({_id: foodID},{
      $pull: {
        sizes: {
          id: id
        }
      }
    });
  },
  "product.saveFlavor"(foodID, payload){
    console.log("Ran Method [product.saveFlavor]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(foodID, String);
    check(payload, Object);

    if(payload.id){
      const thisFood = Products.findOne({_id: foodID});
      thisFood.flavors.forEach((flavor, index) => {
        if(flavor.id === payload.id){
          Products.update({_id: foodID, "flavors.id": payload.id}, {
            $set:{
              "flavors.$.name": payload.name,
              "flavors.$.price": toCents.convert(payload.price),
            }
          });
        }
      });
    }
    else {
      Products.update({_id: foodID},{
        $push: {
          flavors: {
            id: Random.id(),
            name: payload.name,
            price: toCents.convert(payload.price),
            createdBy: createdBy.getUser(Meteor.userId()),
            createdAt: new Date()
          }
        }
      });
    }
  },
  "product.deleteFlavor"(foodID, id){
    console.log("Ran Method [product.deleteFlavor]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(foodID, String);
    check(id, String);

    Products.update({_id: foodID},{
      $pull: {
        flavors: {
          id: id
        }
      }
    });
  }
});
