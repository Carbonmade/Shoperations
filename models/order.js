var Collection = require('./collection'),
    Model = require('./model');

var Order = exports = module.exports = function Order(attributes) {
  Model.call(this, attributes);
};

Order.prototype = new Model;

Order.prototype.modelName = 'Order';

Order.objects = new Collection(Order);

Order.objects.refundLines = function(lines, callbacks) {
  // var refundURL = [this.url, 'refunds'].join('/');
  var refundURL = 'http://store.carbonmade.net/refunds',
      data = [],
      dataString;
  lines.forEach(function(lineID) {
    data.push({id: Number(lineID)});
  });
  dataString = JSON.stringify({lines:data});
  console.log('POST: ' + refundURL);
  console.log('\tdata: ' + dataString);
  Order.objects.api.post(refundURL, {data: dataString})
    .addListener('success', callbacks.success)
    .addListener('error', callbacks.error);
};

Order.prototype.canAccept = function() {
  return this.state === 'Open';
};

Order.prototype.canCancel = function() {
  return this.state === "Open" || this.state === "Processing";
};

Order.prototype.canComplete = function() {
  return this.state === "Processing";
};

Order.prototype.cancel = function(callbacks) {
  if(!this.canCancel()) {
    throw "This order can't be canceled.";
  }
  Order.objects.update(this, {state:'Canceled'}, callbacks);
};

Order.prototype.accept = function(callbacks) {
  if(!this.canAccept()) {
    throw "This order can't be accepted.";
  }
  Order.objects.update(this, {state:'Processing'}, callbacks);
};

Order.prototype.complete = function(callbacks) {
  if(!this.canComplete()) {
    throw "This order can't be completed.";
  }
  Order.objects.update(this, {state:'Completed'}, callbacks);
};