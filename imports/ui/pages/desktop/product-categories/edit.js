import "./edit.html";

import { ProductCategories } from "../../../../api/product-categories/product-categories";

Template.desktop_product_categories_edit.onCreated(function () {
  document.title = "ACME - Edit Product Category";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
    this.subscribe("get.product-category", FlowRouter.getParam("id"), "#general-tab");
    const productCategory = ProductCategories.findOne({_id: FlowRouter.getParam("id")});
    if(this.subscriptionsReady()){
      Session.set("productCategory", productCategory);
    }
  });
});

Template.desktop_product_categories_edit.onRendered(function () {
  initFormatName();
});

Template.desktop_product_categories_edit.onDestroyed(function () {
  Session.set("productCategory", {});
});

Template.desktop_product_categories_edit.helpers({
  productCategory(){
    return Session.get("productCategory");
  }
});

Template.desktop_product_categories_edit.events({
  "submit #editproductCategory"(event){
    event.preventDefault();

    const codPostal = event.target.codPostal.value;
    const ciudad = event.target.ciudad.value;
    const direccion = event.target.direccion.value;
    const telefono = event.target.telefono.value;

    disableBtn("form", true);

    Meteor.call("edit.product-category", FlowRouter.getParam("id"), codPostal, ciudad, direccion, telefono,
      function(error, result){
      if(error){
        console.log(error);
        disableBtn("form", false, "Editar");
        yoloAlert("error");
      }
      else {
        disableBtn("form", false, "Edit");
        yoloAlert("success", "Edited Product Category!");
        FlowRouter.go(`/admin/Product-categories`);
      }
    });
  },
  "click #deleteProductCategory"(event){
    sourAlert({
      type: "question",
      title: "Delete Product Category?",
      okButtonText: "Yes, Delete Product Category"
    }, function(result){
      if(result){
        const id = $(event.target).data("id");
        disableBtn(`#deleteProductCategory`, true);

        Meteor.call("delete.product-category", FlowRouter.getParam("id"),
          function(error, result){
          if(error){
            console.log(error);
            disableBtn(`#deleteProductCategory`, false, `<i class="fas fa-trash-alt"></i> Delete`);
            if(error.error){
              yoloAlert("error", error.reason);
            }
            else {
              yoloAlert("error");
            }
          }
          else {
            yoloAlert("success", "Deleted Product Category!");
            disableBtn(`#deleteProductCategory`, false, `<i class="fas fa-trash-alt"></i> Delete`);
            FlowRouter.go("/admin/product-categories");
          }
        });
      }
    });
  }
});
