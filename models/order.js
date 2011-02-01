var Collection = require('./collection'),
    Model = require('./model');

var Order = exports = module.exports = function Order(attributes) {
  Model.call(this, attributes);
};

Order.prototype = new Model;

Order.prototype.modelName = 'Order';

Order.objects = new Collection(Order);

Order.prototype.refund = function(lines, callbacks) {
  var refundURL = [Order.objects.urlFor(this), 'refunds'].join('/');
  console.log('PUT: ' + refundURL);
  Order.objects.api.post(refundURL, {data: {lines:lines}})
    .addListener('success', callbacks.success)
    .addListener('error', callbacks.error);
};

Order.prototype.canCancel = function() {
  return this.state !== "Completed";
};

Order.prototype.cancel = function(callbacks) {
  if(!this.canCancel()) {
    throw "This order can't be canceled.";
  }
  Order.objects.update(this, {state:'Canceled'}, callbacks);
};