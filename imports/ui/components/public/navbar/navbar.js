import "./navbar.html";

Template.public_navbar.events({
  "click #myAccount"(){
    Meteor.call("user.get", Meteor.userId(), function(error, result){
      if(error){
        console.log(error);
        yoloAlert("error");
      }
      else {
        console.log(result.profile.role.name);
        if(result.profile.role.name === "User"){
          FlowRouter.go("/user/my-account");
        }
        else {
          FlowRouter.go("/admin/products");
        }
      }
    });
  },
  "click a"(event){
    if($(".navbar-collapse").hasClass("collapse show")){
      $(".navbar-collapse").removeClass("show");
    }
  },
  "click #logout"(){
    sourAlert({
      type: "question",
      title: "Log Out?",
      okButtonText: "Yes, Log Me Out"
    }, function(result) {
      if(result){
        Meteor.logout(() => {
          location.reload();
        });
      }
    });
  }
});
