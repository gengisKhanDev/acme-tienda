import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

/*Layout*/
//Desktop
import "../../../ui/layouts/body/desktop.js";
//Global
import "../../../ui/layouts/body/global.js";

/*Components*/
//Desktop
import "../../../ui/components/desktop/sidebar/sidebar.js";

//Global
import "../../../ui/components/global/loader/loader.js";
import "../../../ui/components/global/offline-alert/offline-alert.js";

/*Pages*/
///My Account
// import "../../../ui/pages/desktop/my-account/my-account.js";
///System Settings
// import "../../../ui/pages/desktop/system-settings/system-settings.js";
///Contact Us
// import "../../../ui/pages/desktop/contact-us/contact-us.js";

///product Categories
import "../../../ui/pages/desktop/sede/sede.js";
import "../../../ui/pages/desktop/sede/add.js";
import "../../../ui/pages/desktop/sede/edit.js";
import "../../../ui/pages/desktop/users/users.js";
///products
import "../../../ui/pages/desktop/products/products.js";
import "../../../ui/pages/desktop/products/add.js";
import "../../../ui/pages/desktop/products/edit.js";
import "../../../ui/pages/desktop/products/agregar-sede.js";
import "../../../ui/pages/desktop/products/mas-sedes.js";


BlazeLayout.setRoot("body");

//My Account
// FlowRouter.route("/admin/my-account", {
//   name: "desktop.my-account",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("desktop_body", {
//         sidebar: "desktop_sidebar",
//         main: "desktop_my_account"
//       });
//     }
//   }]
// });

//System Settings
// FlowRouter.route("/admin/system-settings", {
//   name: "desktop.system-settings",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("desktop_body", {
//         sidebar: "desktop_sidebar",
//         main: "desktop_system_settings"
//       });
//     }
//   }]
// });


//Users
// FlowRouter.route("/admin/users", {
//   name: "desktop.users",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("desktop_body", {
//         sidebar: "desktop_sidebar",
//         main: "desktop_users"
//       });
//     }
//   }]
// });
// FlowRouter.route("/admin/users/:id", {
//   name: "desktop.users-edit",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("desktop_body", {
//         sidebar: "desktop_sidebar",
//         main: "desktop_users_edit"
//       });
//     }
//   }]
// });


//product Categories
FlowRouter.route("/admin/sede", {
  name: "desktop.sede",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_sede"
      });
    }
  }]
});
FlowRouter.route("/admin/sede/add", {
  name: "desktop.sede-add",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_sede_add"
      });
    }
  }]
});
FlowRouter.route("/admin/sede/:id", {
  name: "desktop.product.categories-edit",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_sede_edit"
      });
    }
  }]
});


//Reservations
// FlowRouter.route("/admin/reservations", {
//   name: "desktop.reservations",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("desktop_body", {
//         sidebar: "desktop_sidebar",
//         main: "desktop_reservations"
//       });
//     }
//   }]
// });
// FlowRouter.route("/admin/games/add", {
//   name: "desktop.reservations-add",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("desktop_body", {
//         sidebar: "desktop_sidebar",
//         main: "desktop_reservations_add"
//       });
//     }
//   }]
// });
// FlowRouter.route("/admin/reservations/:id", {
//   name: "desktop.reservations-edit",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("desktop_body", {
//         sidebar: "desktop_sidebar",
//         main: "desktop_reservations_edit"
//       });
//     }
//   }]
// });

//products
FlowRouter.route("/admin/products", {
  name: "desktop.products",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_products"
      });
    }
  }]
});
FlowRouter.route("/admin/products/add", {
  name: "desktop.products-add",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_products_add"
      });
    }
  }]
});
FlowRouter.route("/admin/products/:id", {
  name: "desktop.products-edit",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_products_edit"
      });
    }
  }]
});
FlowRouter.route("/admin/products/agregar-sede/:id", {
  name: "desktop.agregar-sede",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_agregar_sede"
      });
    }
  }]
});
FlowRouter.route("/admin/products/mas-sedes/:id", {
  name: "desktop.mas-sedes",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_mas_sedes"
      });
    }
  }]
});

FlowRouter.route("/admin/usuarios", {
  name: "desktop.usuarios",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("desktop_body", {
        sidebar: "desktop_sidebar",
        main: "desktop_users"
      });
    }
  }]
});
