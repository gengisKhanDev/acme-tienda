import "./desktop.html";

// Select2
require("select2")($);
// import "select2/dist/css/select2.min.css";
import "select2-bootstrap4-theme/dist/select2-bootstrap4.min.css";

// Flatpickr
require("flatpickr");
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/confetti.css";

Template.desktop_body.events({
  // "keyup #phone"(event) {
  //   event.preventDefault();
  //   let x = event.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  //   event.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  // }
});
