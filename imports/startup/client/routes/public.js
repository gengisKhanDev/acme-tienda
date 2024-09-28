// import { FlowRouter } from "meteor/kadira:flow-router";
// import { BlazeLayout } from "meteor/kadira:blaze-layout";

// /*Layout*/
// import "../../../ui/layouts/body/public.js";

// /*Components*/
// import "../../../ui/components/public/navbar/navbar.js";
// import "../../../ui/components/public/footer/footer.js";
// import "../../../ui/components/public/cookies-banner/cookies-banner.js";

// /*Pages*/
// //Home
// import "../../../ui/pages/public/home/home.js";
// //Games
// import "../../../ui/pages/public/games/games.js";
// import "../../../ui/pages/public/games/view.js";
// //Events
// import "../../../ui/pages/public/events/events.js";
// import "../../../ui/pages/public/events/view.js";
// ///Birthdays
// // import "../../../ui/pages/public/birthdays/birthdays.js";
// //Refueling Station
// import "../../../ui/pages/public/refueling-station/refueling-station.js";
// //Contact Us
// import "../../../ui/pages/public/contact-us/contact-us.js";
// //Contact Us
// import "../../../ui/pages/public/about-us/about-us.js";
// //Book
// import "../../../ui/pages/public/book/book.js";
// //Gift Cards
// import "../../../ui/pages/shared/gift-cards/check-balance.js";
// import "../../../ui/pages/shared/gift-cards/buy.js";
// //Privacy Policy
// import "../../../ui/pages/public/privacy-policy/privacy-policy.js";
// //Terms and Conditions
// import "../../../ui/pages/public/terms-and-conditions/terms-and-conditions.js";
// //Cookies Policy
// import "../../../ui/pages/public/cookies-policy/cookies-policy.js";
// //Waiver
// import "../../../ui/pages/public/waiver/waiver.js";

// //Home
// FlowRouter.route("/home", {
//   name: "public.home",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_home",
//       footer: "public_footer"
//     });
//   }]
// });

// //Games
// FlowRouter.route("/games", {
//   name: "public.games",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_games",
//       footer: "public_footer"
//     });
//   }]
// });
// FlowRouter.route("/games/:id", {
//   name: "public.games.view",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_games_view",
//       footer: "public_footer"
//     });
//   }]
// });

// //Events
// FlowRouter.route("/events", {
//   name: "public.events",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_events",
//       footer: "public_footer"
//     });
//   }]
// });
// FlowRouter.route("/events/:id", {
//   name: "public.events.view",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_events_view",
//       footer: "public_footer"
//     });
//   }]
// });

// //Birthdays
// FlowRouter.route("/birthdays", {
//   name: "public.birthdays",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_birthdays",
//       footer: "public_footer"
//     });
//   }]
// });

// //Book
// FlowRouter.route("/book", {
//   name: "public.book",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_book",
//       footer: "public_footer"
//     });
//   }]
// });

// //Refueling Station
// FlowRouter.route("/refueling-station", {
//   name: "public.refueling-station",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_refueling_station",
//       footer: "public_footer"
//     });
//   }]
// });

// //Contact Us
// FlowRouter.route("/contact-us", {
//   name: "public.contact-us",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_contact_us",
//       footer: "public_footer"
//     });
//   }]
// });

// //About Us
// FlowRouter.route("/about-us", {
//   name: "public.about-us",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_about_us",
//       footer: "public_footer"
//     });
//   }]
// });

// //Gift Cards
// FlowRouter.route("/gift-cards/check-balance", {
//   name: "user.gift-card-check-balance",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_about_us",
//       main: "shared_gift_cards_check_balance"
//     });
//   }]
// });
// FlowRouter.route("/gift-cards/buy", {
//   name: "user.gift-card-buy",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_about_us",
//       main: "shared_gift_cards_buy"
//     });
//   }]
// });

// //Privacy Policy
// FlowRouter.route("/privacy-policy", {
//   name: "public.privacy-policy",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_privacy_policy",
//       footer: "public_footer"
//     });
//   }]
// });

// //Terms and Conditions
// FlowRouter.route("/terms-and-conditions", {
//   name: "public.terms-and-conditions",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_terms_and_conditions",
//       footer: "public_footer"
//     });
//   }]
// });

// //Cookies Policy
// FlowRouter.route("/cookies-policy", {
//   name: "public.cookies-policy",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_cookies_policy",
//       footer: "public_footer"
//     });
//   }]
// });

// //Waiver
// FlowRouter.route("/waiver", {
//   name: "public.waiver",
//   triggersEnter: [(context) => {
//     BlazeLayout.render("public_body", {
//       navbar: "public_navbar",
//       main: "public_waiver",
//       footer: "public_footer"
//     });
//   }]
// });
