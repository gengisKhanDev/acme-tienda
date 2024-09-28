import "./add.html";

import { ProductCategories } from "../../../../api/product-categories/product-categories.js";

Template.desktop_products_add.onCreated(function(){
  document.title = "ACME - Add Product";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
    this.subscribe("get.product-categories");
  });
});

Template.desktop_products_add.onRendered(function(){
  initFormatName();
  initSelect2();
});

Template.desktop_products_add.helpers({
  productCategories(){
    return ProductCategories.find({});
  }
});

Template.desktop_products_add.events({
  "submit #addProduct"(event){
    event.preventDefault();

    const tipo = event.target.tipo.value;
    const marca = event.target.marca.value;
    const color = event.target.color.value;
    const descripcion = event.target.descripcion.value;
 

    disableBtn("form", true);

    Meteor.call("add.product", tipo, marca, color, descripcion,
     function(error, result){
      if(error){
        console.log(error);
        disableBtn("form", false, "Confirmar");
        if(error.error === "food-exists"){
          yoloAlert("error", error.reason);
        }
        else {
          yoloAlert("error");
        }
      }
      else {
        document.getElementById("addProduct").reset();
        disableBtn("form", false, "Add");
        yoloAlert("success", "Added Product!");
        FlowRouter.go(`/admin/products/agregar-sede/${result}`);
      }
    });
  }
});
