import "./login.html";

Template.global_login.onCreated(function(){
  document.title = "ACME - Login";
});

Template.global_login.events({
  "click .field-icon"(){
    if($(`#showHidePassword #password`).attr("type") == "text"){
      $(`#showHidePassword #password`).attr("type", "password");
      $(`#showHidePassword .far`).addClass("fa-eye-slash");
      $(`#showHidePassword .far`).removeClass( "fa-eye" );
    }
    else if($(`#showHidePassword #password`).attr("type") == "password"){
      $(`#showHidePassword #password`).attr("type", "text");
      $(`#showHidePassword .far`).removeClass("fa-eye-slash");
      $(`#showHidePassword .far`).addClass( "fa-eye" );
    }
  },
  "submit #login"(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    disableBtn("form", true);

    Meteor.call("check.userRole", email, function(error, result){
      if(error){
        console.log(error);
        disableBtn('button[type="submit"]', false, "Login");
        if(error.error){
          yoloAlert("error", error.reason);
        }
        else {
          yoloAlert("error");
        }
      }
      else {
        Meteor.loginWithPassword(email, password, (error) => {
          if(error){
            console.log(error);
            disableBtn("form", false, `Login`);
            yoloAlert("error", error.reason);
            $("#loginErrorDiv").fadeIn(750);
            $("#loginError").html(error.reason);
          }
          else {
            disableBtn("form", false, `Login`);
            $("#loginErrorDiv").hide();
            window.location.href = Meteor.absoluteUrl() + result;
          }
        });
      }
    });
  }
});
