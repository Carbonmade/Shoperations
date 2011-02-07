var Collection = require('./collection'),
    Model = require('./model');

var Package = exports = module.exports = function Package(attributes) {
  Model.call(this, attributes);
};

Package.prototype = new Model;

Package.prototype.modelName = 'Package';

Package.objects = new Collection(Package);

Package.prototype.shipped = function() {
  return this.state === 'Shipped';
};

Package.STATES = {
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered'
};

Package.stateFilters = function() {
  var filters = {};
  for(state in Package.STATES)
    if(Package.STATES.hasOwnProperty(state))
      filters[Package.STATES[state]] = '/packages/' + state.toLowerCase();
  return filters;
};