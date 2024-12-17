import { Proveedor } from "./proveedor.js";

const createdBy = require("../../startup/server/created-by.js");
const toCents = require("../../startup/server/to-cents.js");

Meteor.methods({
  "add.proveedor"(nombre, direccion, phone, email){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    return Proveedor.insert({
      nombre: nombre,
      direccion: direccion,
      informacion_contacto: {
        telefono: phone,
        email: email
      },
      createdBy: createdBy.getUser(Meteor.userId()),
      createdAt: new Date()
    });
  }
});
