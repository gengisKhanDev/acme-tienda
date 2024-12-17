import "./products.html";
import { Products } from "../../../../api/products/products.js";

Template.desktop_products.onCreated(function(){
  document.title = "ACME - Products";
  Session.set("selectedRuns", []);
  Session.set("selectedRunsType", []);
  this.isSubscriptionReady = new ReactiveVar(false);
  Tracker.autorun(() => {
    Session.set("isSubscriptionReady", this.subscriptionsReady());
    this.subscribe("get.product", Meteor.userId());
    this.subscribe("get.products");
    checkUserRole(["Super Admin", "Admin", "Employee"]);
    Session.set("products", Products.findOne({}));
    //ADD subscriptn
  });
});
Template.desktop_products.onDestroyed(function(){
  Session.set("selectedRuns", []);
  Session.set("selectedRunsType", []);
});

Template.desktop_products.helpers({
  isSubscriptionReady() {
    return Template.instance().isSubscriptionReady.get();
  },

  showOnMenu(){
    // <label class="checkmark-container">
    //   <input type="checkbox" class="check show-on-menu">
    //   <span class="checkmark"></span>
    // </label>
  },
  products() {
    return {
      collection: "products",
      rowsPerPage: 25,
      showFilter: true,
      ready: Template.instance().isSubscriptionReady,
      fields: [{
        key: "_id",
        label: "id",
        hidden: true
      },{
        key: "nombre",
        label: "Nombre"
      },{
        key: "nserie",
        label: "Número de serie"
      },{
        key: "descripcion",
        label: "Descripcion"
      },{
        key: "precio",
        label: "Precio"
      },{
      },{
        key: "stock",
        label: "Stok"
      },{
        key: "proveedor.nombre",
        label: "Proveedor"
      },{
        key: "sede.nombre",
        label: "Sede"
      },{
      },{
        key: "categoria",
        label: "Categoria"
      },{
        key: "_id",
        label: "",
        fn: function (id) {
          return new Spacebars.SafeString(`
              <div class="btn-group">
                <a href="/admin/products/${id}" role="button" class="btn btn-primary">
                  <i class="fas fa-pencil-alt"></i>
                </a>
                <a href="/admin/products/mas-sedes/${id}" role="button" class="btn btn-primary">
                <i class="fas fa-plus-square"></i>
                </a>
                <button type="button" class="btn btn-danger delete-product"
                  data-id="${id}">
                  <i class="fas fa-trash-alt" data-id="${id}"></i>
                </button>
              </div>
            `);
        }
      }]
    };
  }
});
//FlowRouter.go(`/admin/products/mas-sedes/${FlowRouter.getParam("id")}`);
Template.desktop_products.events({
  "click .show-on-menu"(event) {
    console.log(Session.get("products")._id)
    const checkedBool = $(event.currentTarget).is(":checked");
    console.log(checkedBool)
    const id = $(event.target).data("id");
    console.log(id)
    Meteor.call("showOnMenu", id, checkedBool,
      function (error, result){
        if(error){
          console.log(error);
          yoloAlert("error");
        }
        else {
          if(checkedBool){
            yoloAlert("success", "Subscribed!");
          }
          else {
            yoloAlert("success", "Unsubscribed!");
          }
        }
      });
  },
  "click .delete-product"(event) {
    sourAlert({
      type: "question",
      title: "Delete Product?",
      okButtonText: "Yes, Delete Product"
    }, function (result) {
      if (result) {
        const id = $(event.target).data("id");
        console.log(id)
        console.log(result)
        // disableBtn(`.delete-product[data-id=${id}]`, true);
        Meteor.call("delete.product", id, function (error, result) {
          if (error) {
            console.log(error);
            yoloAlert("error");
            // disableBtn(`.delete-product[data-id=${id}]`, false, `<i class="fas fa-trash-alt"></i> Delete`);
          }
          else {
            yoloAlert("success", "Deleted Product!");
            // disableBtn(`.delete-product[data-id=${id}]`, false, `<i class="fas fa-trash-alt"></i> Delete`);
            FlowRouter.go("/admin/products");
          }
        });
      }
    });
  }
});
