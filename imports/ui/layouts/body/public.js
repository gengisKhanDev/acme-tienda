import "./public.html";

//Animate CSS
import "animate.css";

// Select2
require("select2")($);
// import "select2/dist/css/select2.min.css";
import "select2-bootstrap4-theme/dist/select2-bootstrap4.min.css";

// Flatpickr
require("flatpickr");
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/confetti.css";

Template.public_body.events({
  "click .scroll-top"(){
    window.scrollTo({
      top: 0, behavior: "smooth"
    });
  }
});
