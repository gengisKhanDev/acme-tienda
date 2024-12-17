import "./add.html";

Template.desktop_sede_add.onCreated(function(){
  document.title = "ACME - Agregar Sede";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
  });
});

Template.desktop_sede_add.onRendered(function(){
  initFormatName();
  initPlacesAutocomplete("address", function(result){
    if(result){
      Session.set("address", Session.get("placesAutocomplete"));
    }
  });
});

Template.desktop_sede_add.events({
  "submit #addProductCategory"(event, instance){
    event.preventDefault();

    // Extraer datos generales
    const nombre = event.target.nombre.value.trim();
    const direccion = Session.get("address");
    const capacidad = parseInt(event.target.capacidad.value, 10);

    // Extraer Horario de Atención
    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    let horario_atencion = {};

    dias.forEach(dia => {
      const abierto = event.target[`${dia}_abierto`].value;
      const cerrado = event.target[`${dia}_cerrado`].value;
      const cerrado_dia = event.target[`${dia}_cerrado_dia`].checked;

      if(cerrado_dia){
        horario_atencion[dia] = {
          abierto: null,
          cerrado: null,
          cerrado_dia: true
        };
      } else {
        horario_atencion[dia] = {
          abierto: abierto ? abierto : null,
          cerrado: cerrado ? cerrado : null,
          cerrado_dia: false
        };
      }
    });

    const sede = {
      nombre,
      direccion,
      capacidad,
      horario_atencion
    };

    disableBtn("form", true);
    Meteor.call("add.sede", sede, function(error, result){
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
        disableBtn("form", false, "Confirmar");
        yoloAlert("success", "Sede Agregada!");
      }
    });
  }
});

// Manejo de la interactividad de los checkboxes para días cerrados
$(document).ready(function(){
  $('.cerrado-dia').change(function(){
    var day = $(this).attr('id').split('_')[0];
    if($(this).is(':checked')){
      $('#' + day + '_abierto').prop('disabled', true).val('');
      $('#' + day + '_cerrado').prop('disabled', true).val('');
    } else {
      $('#' + day + '_abierto').prop('disabled', false);
      $('#' + day + '_cerrado').prop('disabled', false);
    }
  });
});
