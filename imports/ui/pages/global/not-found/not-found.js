import "./not-found.html";

Template.not_found.onCreated(function(){
  document.title = "Galaxy VR - 404";
});

Template.not_found.events({
  "click #home"(){
    if(Meteor.userId()){
      FlowRouter.go("/admin/products");
    }
    else {
      FlowRouter.go("/");
    }
  }
});
