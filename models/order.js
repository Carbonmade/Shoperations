var Order = exports = module.exports = function Order(attributes) {
  for(attr in attributes) {
    this[attr] = attributes[attr];
  }
};

Order.prototype.link = function(text) {
  text = text || this.id;
  return '<a href="/orders/' + this.id + '">' + text + '</a>';
};

/********************************************************/

Object.toQueryString = function(object) {
  if(Object.keys(object).length > 0) {
    var qs = [];
    for(attr in object) {
      qs.push(attr + "=" + object[attr]);
    }
    return "?" + qs.join("&");
  }
  return '';
};

var Collection = function(model) {
  this.model = model;
  this.url = "http://store.carbonmade.net/" + this.model.name.toLowerCase() + 's';
  this.api = require('restler');
};

Collection.prototype.find = function(params, callback) {
  params = params || {};
  var collection = this,
      url = this.url + '/' + Object.toQueryString(params);
  console.log("GET: " + url);
  this.api.get(url).addListener('complete', function(data, response) {
    var results = {records:[], params:params};
    data.forEach(function(record) {
      results.records.push(new collection.model(record));
    });
    results.totalRecords = response.headers['x-total'] || 0;
    callback(results);
  });
};

Collection.prototype.get = function(id, callback) {
  var collection = this;
  this.api.get(this.url + '/' + id).addListener('complete', function(record, response) {
    callback(new collection.model(record));
  });
};

/********************************************************/

Order.objects = new Collection(Order);