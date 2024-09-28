import "./my-account.html";

import { Settings } from "../../../../api/settings/settings";

Template.desktop_my_account.onCreated(function(){
  document.title = "Galaxy VR - My Account";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
    this.subscribe("settings.all");
    Session.set("user", Meteor.user());
  });
});

Template.desktop_my_account.onRendered(function(){
  initSelect2();
});

Template.desktop_my_account.helpers({
  roles(){
    if(Settings.findOne({_id: "roles"})){
      return Settings.findOne({_id: "roles"}).roles;
    }
  },
  user(){
    console.log(Session.get("user").profile.role.name);
    return Session.get("user");
  }
});

Template.desktop_my_account.events({
  "submit #myAccount"(event){
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const roleId = event.target.roleId.value;

    disableBtn("#editUserBtn", true);

    Meteor.call("edit.user", Meteor.userId(), firstName, lastName,
    roleId, function(error, result){
      if(error){
        console.log(error);
        disableBtn("#editUserBtn", false, `<i class="fas fa-plus-square"></i> Edit`);
        if(error.error === "invalid-action"){
          yoloAlert("error", error.reason);
        }
        else {
          yoloAlert("error");
        }
      }
      else {
        disableBtn("#editUserBtn", false, `<i class="fas fa-plus-square"></i> Edit`);
        yoloAlert("success", "Updated!");
      }
    });
  }
});
