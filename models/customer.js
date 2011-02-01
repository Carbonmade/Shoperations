var Collection = require('./collection'),
    Model = require('./model'),
    Order = require('./order');

var Customer = exports = module.exports = function Customer(attributes) {
  Model.call(this, attributes);
  
  // Cast `orders` objects into an Array of actual Order instances.
  var orders = [];
  attributes.orders.forEach(function(orderAttrs) {
    orders.push( new Order(orderAttrs) );
  });
  this.orders = orders;
};

Customer.prototype = new Model;

Customer.prototype.modelName = 'Customer';

Customer.objects = new Collection(Customer);