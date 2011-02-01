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

var Collection = exports = module.exports = function(model) {
  this.model = model;
  this.url = "http://store.carbonmade.net/" + this.model.name.toLowerCase() + 's';
  this.api = require('restler');
};

Collection.prototype.urlFor = function(object) {
  return [this.url, object.id].join('/');
};

Collection.prototype.find = function() {
  var collection = this, params, callback, url;
  
  if(arguments.length === 2) {
    params = arguments[0];
    callback = arguments[1];
  } else {
    params = {};
    callback = arguments[0];
  }
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

Collection.prototype.update = function(object, attributes, callbacks) {
  this.api.put(this.urlFor(object), {data:attributes})
    .addListener('success', callbacks.success)
    .addListener('error', callbacks.error);
};