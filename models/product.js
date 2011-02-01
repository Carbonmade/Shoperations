var Collection = require('./collection'),
    Model = require('./model');

var Product = exports = module.exports = function Product(attributes) {
  Model.call(this, attributes);
};

Product.prototype = new Model;

Product.prototype.modelName = 'Product';

Product.objects = new Collection(Product);
