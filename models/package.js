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