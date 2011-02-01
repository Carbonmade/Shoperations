var Collection = require('./collection'),
    Model = require('./model');

var Order = exports = module.exports = function Order(attributes) {
  Model.call(this, attributes);
};

Order.prototype = new Model;

Order.prototype.modelName = 'Orders';

Order.objects = new Collection(Order);