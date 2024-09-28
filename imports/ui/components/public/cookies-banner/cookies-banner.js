import "./cookies-banner.html";

import "./manage-cookies-modal.js";

Template.public_cookies_banner.helpers({
  cookiesBanner(){
    if(!localStorage.getItem("cookies")){
      return true;
    }
  }
});

Template.public_cookies_banner.events({
  "click #manageCookies"(){
    $("#manageCookiesModal").modal("show");
  },
  "click .accept"(){
    localStorage.setItem("cookies", true);
    $(".cookies-banner").fadeOut(750);
  }
});

//localStorage.setItem("cookies", false);
