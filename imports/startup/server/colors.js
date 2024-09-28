if(Meteor.isServer){
  var methods = {};
  methods.getRandom = function(){
    const colors = ["#2C2C54", "#B33939", "#CD6133", "#227093", "#CC8E35",
      "#474787", "#218C74", "#84817A"];
    return colors[Math.floor((Math.random() * colors.length))];
  };
  module.exports = methods;
}
