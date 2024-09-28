if(Meteor.isServer){
  var methods = {};
  methods.convert = function(amount){
    return (amount * 100).toFixed(0);
  };
  module.exports = methods;
}
