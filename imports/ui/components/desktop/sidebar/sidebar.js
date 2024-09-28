import "./sidebar.html";

import { Settings } from "../../../../api/settings/settings";

Template.desktop_sidebar.onCreated(function(){
  this.subscribe("get.setting", "companyInfo");
});

Template.desktop_sidebar.helpers({
  isActiveRoute(routeName) {
    if(routeName === FlowRouter.getRouteName()){
      return "active";
    }
  }
});

Template.desktop_sidebar.events({
  "click .dropdown-toggle"(event){
    let arrowParent = $(event.target.parentElement);
    if(typeof arrowParent !== "undefined"){
      $(arrowParent).toggleClass("show");
    }
  },
  "click #showSidebar"(){
    if($(".sidebar").hasClass("show")){
      $(".sidebar").removeClass("show");
      $("#showSidebar").removeClass("toggled");
      $("#showSidebar").html(`<i class="fas fa-chevron-right"></i>`);
    }
    else {
      $(".sidebar").addClass("show");
      $("#showSidebar").addClass("toggled");
      $("#showSidebar").html(`<i class="fas fa-chevron-left"></i>`);
    }
  },
  "click #logout"(){
    sourAlert({
      type: "question",
      title: "Log Out?",
      okButtonText: "Yes, Log Me Out"
    }, function(result){
      if(result){
        Meteor.logout(() => {
          location.reload();
        });
      }
    });
  }
});
