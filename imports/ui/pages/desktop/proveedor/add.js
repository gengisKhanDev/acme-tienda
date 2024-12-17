import "./add.html";

import { Sede } from "../../../../api/sede/sede.js";
import { ReactiveVar } from 'meteor/reactive-var';

Template.desktop_proveedor_add.onCreated(function(){
  document.title = "ACME - Add Product";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
    this.subscribe("get.sede");
  });
  this.selectedCategory = new ReactiveVar('');
});

Template.desktop_proveedor_add.onRendered(function(){
  initFormatName();
  initSelect2();
  initPlacesAutocomplete("address", function(result){
    if(result){
      Session.set("address", Session.get("placesAutocomplete"));
    }
  });
});

Template.desktop_proveedor_add.helpers({
  isCategory(category) {
    const instance = Template.instance();
    return instance.selectedCategory.get() === category;
  }
});

Template.desktop_proveedor_add.events({
  'change #categoria'(event, instance) {
    // Actualiza la categoría seleccionada en la variable reactiva
    const category = event.target.value;
    instance.selectedCategory.set(category);
  },
  "submit #addProveedor"(event){
    event.preventDefault();

    const nombre = event.target.nombre.value;
    const direccion = Session.get("address");
    const phone = event.target.phone.value;
    const email = event.target.email.value;

    disableBtn("form", true);

    Meteor.call("add.proveedor", nombre, direccion, phone, email,
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
        document.getElementById("addProveedor").reset();
        disableBtn("form", false, "Add");
        yoloAlert("success", "Proveedor Agregado!");
      }
    });
  }
});
