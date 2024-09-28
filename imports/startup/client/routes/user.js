// import { FlowRouter } from "meteor/kadira:flow-router";
// import { BlazeLayout } from "meteor/kadira:blaze-layout";

// /*Layout*/
// //User
// import "../../../ui/layouts/body/user.js";
// //Global
// import "../../../ui/layouts/body/global.js";

// /*Components*/
// //User
// import "../../../ui/components/user/sidebar/sidebar.js";

// //Global
// import "../../../ui/components/global/loader/loader.js";
// import "../../../ui/components/global/offline-alert/offline-alert.js";
// import "../../../ui/components/user/happy-birthday/happy-birthday.js";
// //shared
// import "../../../ui/components/shared/reserve-game-modal.js";


// /*Pages*/
// //My Account
// import "../../../ui/pages/user/my-account/my-account.js";
// //Gift Cards
// import "../../../ui/pages/shared/gift-cards/check-balance.js";
// import "../../../ui/pages/shared/gift-cards/buy.js";
// //Reservations
// import "../../../ui/pages/user/reservations/new.js";
// import "../../../ui/pages/user/reservations/view.js";
// import "../../../ui/pages/user/reservations/reservations.js";

// BlazeLayout.setRoot("body");

// FlowRouter.route("/user/dashboard", {
//   name: "user.my-account",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/login");
//     }
//     else {
//       BlazeLayout.render("user_body", {
//         sidebar: "user_sidebar",
//         main: "user_my_account"
//       });
//     }
//   }]
// });

// //My Account
// FlowRouter.route("/user/my-account", {
//   name: "user.my-account",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/login");
//     }
//     else {
//       BlazeLayout.render("user_body", {
//         sidebar: "user_sidebar",
//         main: "user_my_account"
//       });
//     }
//   }]
// });

// //Reservations
// FlowRouter.route("/user/reservations", {
//   name: "user.reserved-games",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/login");
//     }
//     else {
//       BlazeLayout.render("user_body", {
//         sidebar: "user_sidebar",
//         main: "user_reservations"
//       });
//     }
//   }]
// });
// FlowRouter.route("/user/reservations/new", {
//   name: "user.new-reservation",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/login");
//     }
//     else {
//       BlazeLayout.render("user_body", {
//         sidebar: "user_sidebar",
//         main: "shared_reserve_game_modal"
//       });
//     }
//   }]
// });
// FlowRouter.route("/user/reservations/:id", {
//   name: "user.view-reserve-game",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("user_body", {
//         sidebar: "user_sidebar",
//         main: "user_reservations_view"
//       });
//     }
//   }]
// });

// //Gift Cards
// FlowRouter.route("/user/gift-cards/check-balance", {
//   name: "user.gift-card-check-balance",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/login");
//     }
//     else {
//       BlazeLayout.render("user_body", {
//         sidebar: "user_sidebar",
//         main: "shared_gift_cards_check_balance"
//       });
//     }
//   }]
// });
// FlowRouter.route("/user/gift-cards/buy", {
//   name: "user.gift-card-buy",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/login");
//     }
//     else {
//       BlazeLayout.render("user_body", {
//         sidebar: "user_sidebar",
//         main: "shared_gift_cards_buy"
//       });
//     }
//   }]
// });
