import "./add.html";

Template.desktop_sede_add.onCreated(function(){
  document.title = "ACME - Add Sede";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
  });
});

Template.desktop_sede_add.onRendered(function(){
  initFormatName();
  
});

Template.desktop_sede_add.events({
  "submit #addProductCategory"(event){
    event.preventDefault();

    const codPostal = event.target.codPostal.value;
    const ciudad = event.target.ciudad.value;
    const direccion = event.target.direccion.value;
    const telefono = event.target.telefono.value;

    disableBtn("form", true);

    Meteor.call("add.product-category", codPostal, ciudad, direccion, telefono, function(error, result){
      if(error){
        console.log(error);
        disableBtn("form", false, "Confirmar");
        if(error.error === "Product-category-exists"){
          yoloAlert("error", error.reason);
        }
        else {
          yoloAlert("error");
        }
      }
      else {
        document.getElementById("addProductCategory").reset();
        disableBtn("form", false, "Add");
        yoloAlert("success", "Sede Agregada!");
        FlowRouter.go(`/admin/sede/${result}`);
      }
    });
  }
});
