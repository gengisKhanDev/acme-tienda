import "./edit.html";
import { ProductCategories } from "../../../../api/product-categories/product-categories.js";
import { Products } from "../../../../api/products/products.js";


Template.desktop_products_edit.onCreated(function(){
  document.title = "ACME - Edit Product";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
    this.subscribe("get.product-categories");
    //this.subscribe("get.product");
    this.subscribe("get.product", FlowRouter.getParam("id"), "#general-tab");
    const products = Products.findOne({_id: FlowRouter.getParam("id")});
    console.log(products)
    if(this.subscriptionsReady()){
      Session.set("Products", products);
      console.log(products)
    }
  });
});

Template.desktop_products_edit.onRendered(function(){
  initSelect2();
});

Template.desktop_products_edit.helpers({
  productCategories(){
    console.log(ProductCategories.find({}))
    return ProductCategories.find({});
  },
  product(){
    return Session.get("Products");
  }
});

Template.desktop_products_edit.events({
  "submit #editProduct"(event){
    event.preventDefault();

    const tipo = event.target.tipo.value;
    const marca = event.target.marca.value;
    const talla = event.target.talla.value;
    const color = event.target.color.value;
    const cantidad = event.target.cantidad.value;
    const ciudad = event.target.ciudad.value;

    disableBtn("form", true);

    Meteor.call("edit.product", FlowRouter.getParam("id"),  tipo, marca, talla, color, cantidad, ciudad,
      function(error, result){
      if(error){
        console.log(error);
        disableBtn("form", false, "Editar");
        if(error.error === "product-exists"){
          yoloAlert("error", error.reason);
        }
        else {
          yoloAlert("error");
        }
      }
      else {
        disableBtn("form", false, "Edit");
        yoloAlert("success", "Edited product!");
        FlowRouter.go(`/admin/products/`);
      }
    });
  }
});
