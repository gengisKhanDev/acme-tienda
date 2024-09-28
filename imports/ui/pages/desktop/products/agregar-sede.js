import "./agregar-sede.html";
import { ProductCategories } from "../../../../api/product-categories/product-categories.js";
import { Products } from "../../../../api/products/products.js";


Template.desktop_agregar_sede.onCreated(function(){
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

Template.desktop_agregar_sede.onRendered(function(){
  initSelect2();
});

Template.desktop_agregar_sede.helpers({
  productCategories(){
    console.log(ProductCategories.find({}))
    return ProductCategories.find({});
  },
  product(){
    return Session.get("Products");
  }
});

Template.desktop_agregar_sede.events({
  "submit #agregarSede"(event){
    event.preventDefault();

    const cantidad = event.target.cantidad.value;
    const ciudad = event.target.ciudad.value;
    const talla = event.target.talla.value;

    disableBtn("form", true);

    Meteor.call("agregar-sede.product", FlowRouter.getParam("id"),cantidad, talla, ciudad,
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
        document.getElementById("agregarSede").reset();
        disableBtn("form", false, "Edit");
        yoloAlert("success", "Edited product!");
        FlowRouter.go(`/admin/products`);
      }
    });
  }
});
