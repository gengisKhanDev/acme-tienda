import "./sign-up.html";

Session.set("checked", true);

Template.global_sign_up.onCreated(function () {
  document.title = "Galaxy VR  - Sign Up";
});

Template.global_sign_up.onRendered(function () {
  initFormatName();
  initFlatpickr({
    selector: "#dob",
    maxDate: "today"
  });
});

Template.global_sign_up.events({
  "click #signature"(event) {
    const checkedBool = $(event.currentTarget).is(":checked")
    Session.set("checked", checkedBool);
  },
  "click #addUserBtn"() {
    if(Session.get("checked") === false){
      yoloAlert("error", "please accept the conditions to continue!")
    }
    else {
      return
    }
  },
  "submit #addUser"(event) {
    event.preventDefault();

    Session.get("checked");

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const dob = new Date(event.target.dob.value);
    const email = event.target.email.value;
    const subscribedToCampaigns = Session.get("checked");

    disableBtn("#addUserBtn", true);

    Meteor.call("public.invite.user", firstName, lastName, dob, email,
      subscribedToCampaigns, function (error, result) {
        if(error){
          console.log(error);
          if(error.error){
            yoloAlert("error", error.reason.message);
          }
          else {
            yoloAlert("error");
          }
          disableBtn("#addUserBtn", false, "<i class='fas fa-plus-square'></i> Add");
        }
        else {
          setTimeout(function(){
            document.getElementById("addUser").reset();
            disableBtn("#addUserBtn", false, "<i class='fas fa-plus-square'></i> Add");
            yoloAlert("success", "Please check your email!");
          }, 300);
        }
      });
  }
});
