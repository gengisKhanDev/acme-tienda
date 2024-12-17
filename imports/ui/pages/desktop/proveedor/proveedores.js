import "./proveedores.html";

Template.desktop_proveedores.onCreated(function(){
  document.title = "ACME - Product Categories";
  this.isSubscriptionReady = new ReactiveVar(false);
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
  });
});

Template.desktop_proveedores.helpers({
  isSubscriptionReady(){
    return Template.instance().isSubscriptionReady.get();
  },
  proveedores(){
    return {
      collection: "proveedor",
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
          key: "informacion_contacto.telefono",
          label: "Telefono"
        },{
          key: "informacion_contacto.email",
          label: "Email"
        },{
          key: "direccion.formatted_address",
          label: "Dirección"
        },{
          key: "_id",
          label: "",
          fn: function(id){
            return new Spacebars.SafeString(`
              <div class="btn-group">
                <button type="button" class="btn btn-danger delete-product-category"
                  data-id="${id}">
                  <i class="fas fa-trash-alt" data-id="${id}"></i>
                </button>
                <a href="/admin/sede/${id}" role="button" class="btn btn-primary">
                <i class="fas fa-pencil-alt"></i>
              </a>
              </div>
            `);
          }
        }]
    };
  }
});

Template.desktop_proveedores.events({
  "click .delete-product-category"(event){
    sourAlert({
      type: "question",
      title: "Delete Product Category?",
      okButtonText: "Yes, Delete Product Category"
    }, function(result){
      if(result){
        const id = $(event.target).data("id");
        disableBtn(`.delete-product-category[data-id=${id}]`, true);

        Meteor.call("delete.product-category", id,
          function(error, result){
          if(error){
            console.log(error);
            disableBtn(`.delete-product-category[data-id=${id}]`, false, `<i class="fas fa-trash-alt"></i> Delete`);
            if(error.error){
              yoloAlert("error", error.reason);
            }
            else {
              yoloAlert("error");
            }
          }
          else {
            yoloAlert("success", "Deleted Product Category!");
            disableBtn(`.delete-product-category[data-id=${id}]`, false, `<i class="fas fa-trash-alt"></i> Delete`);
            FlowRouter.go("/admin/sede");
          }
        });
      }
    });
  }
});
