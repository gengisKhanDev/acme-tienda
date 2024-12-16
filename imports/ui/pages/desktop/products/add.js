import "./add.html";

import { Sede } from "../../../../api/sede/sede.js";
import { ReactiveVar } from 'meteor/reactive-var';

Template.desktop_products_add.onCreated(function(){
  document.title = "ACME - Add Product";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
    this.subscribe("get.sede");
  });
  this.selectedCategory = new ReactiveVar('');

});

Template.desktop_products_add.onRendered(function(){
  initFormatName();
  initSelect2();
});

Template.desktop_products_add.helpers({
  isCategory(category) {
    const instance = Template.instance();
    return instance.selectedCategory.get() === category;
  }
});

Template.desktop_products_add.events({
  'change #categoria'(event, instance) {
    // Actualiza la categoría seleccionada en la variable reactiva
    const category = event.target.value;
    instance.selectedCategory.set(category);
  },
  // "submit #addProduct"(event){
  //   event.preventDefault();

  //   const tipo = event.target.tipo.value;
  //   const marca = event.target.marca.value;
  //   const color = event.target.color.value;
  //   const descripcion = event.target.descripcion.value;
 

  //   disableBtn("form", true);

  //   Meteor.call("add.product", tipo, marca, color, descripcion,
  //    function(error, result){
  //     if(error){
  //       console.log(error);
  //       disableBtn("form", false, "Confirmar");
  //       if(error.error === "food-exists"){
  //         yoloAlert("error", error.reason);
  //       }
  //       else {
  //         yoloAlert("error");
  //       }
  //     }
  //     else {
  //       document.getElementById("addProduct").reset();
  //       disableBtn("form", false, "Add");
  //       yoloAlert("success", "Added Product!");
  //       FlowRouter.go(`/admin/products/agregar-sede/${result}`);
  //     }
  //   });
  // },
  'submit #addProduct'(event, instance) {
    event.preventDefault();

    // Recopila los datos comunes
    const categoria = instance.selectedCategory.get();
    const nombre = event.target.nombre.value.trim();
    const nserie = event.target.nserie.value.trim();
    const descripcion = event.target.descripcion.value.trim();
    const precio = parseFloat(event.target.precio.value);
    const stock = parseInt(event.target.stock.value, 10);

    // Objeto para almacenar detalles específicos
    let detalles_categoria = {};

    // Recopila los datos específicos según la categoría
    switch(categoria) {
      case "Electrónicos":
        detalles_categoria.electronicos = {
          marca: event.target.marca_electronico.value.trim(),
          modelo: event.target.modelo_electronico.value.trim(),
          garantia: event.target.garantia_electronico.value.trim(),
          // Puedes agregar más campos si es necesario
        };
        break;

      case "Ropa":
        detalles_categoria.ropa = {
          marca: event.target.marca_ropa.value.trim(),
          talla: event.target.talla_ropa.value.trim(),
          material: event.target.material_ropa.value.trim(),
          genero: event.target.genero_ropa.value.trim(),
        };
        break;

      case "Alimentos Perecederos":
        detalles_categoria.alimentos_perecederos = {
          fecha_vencimiento: new Date(event.target.fecha_vencimiento.value),
          condiciones_almacenamiento: event.target.condiciones_almacenamiento.value.trim(),
          peso: parseFloat(event.target.peso_alimento.value),
        };
        break;

      case "Artículos de Temporada":
        detalles_categoria.articulos_de_temporada = {
          temporada: event.target.temporada_articulo.value.trim(),
          año: parseInt(event.target.anio_articulo.value, 10),
          material: event.target.material_articulo.value.trim(),
        };
        break;

      default:
        alert("Por favor, selecciona una categoría válida.");
        return;
    }

    // Validaciones adicionales (opcional)
    // Por ejemplo, verificar que los campos específicos no estén vacíos

    // Construye el objeto del producto
    const producto = {
      nombre,
      nserie,
      descripcion,
      precio,
      stock,
      categoria,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      detalles_categoria
    };

    console.log(producto)

    // Inserta el producto en la colección
    // Productos.insert(producto, (error, result) => {
    //   if (error) {
    //     alert(`Error al agregar el producto: ${error.message}`);
    //   } else {
    //     alert("Producto agregado exitosamente.");
    //     // Limpia el formulario y resetea la categoría seleccionada
    //     event.target.reset();
    //     instance.selectedCategory.set('');
    //   }
    // });
  }
});
