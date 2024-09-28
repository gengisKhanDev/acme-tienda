import { Products } from "../api/products/products.js";
//
showOnMenu = (id) => {
  return new Spacebars.SafeString(`<label class="checkmark-container">
    <input type="checkbox" class="check show-on-menu">
    <span class="checkmark"></span>
  </label>`);
};
