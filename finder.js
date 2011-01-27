var rest = require('restler'),
    Finder = module.exports = function(model) { this.model = model; };

Finder.prototype.buildURL = function(id, params) {
  var url = "http://store.carbonmade.net/" + this.model;
  if(id) url += "/" + id;
  if(Object.keys(params).length > 0) {
    var qs = [];
    for(key in params) {
      qs.push(key + "=" + params[key]);
    }
    url += "?" + qs.join("&");
  }
  return url;
};

Finder.prototype.find = function() {
  var self = this, url, id = null, params = {}, callback, query;
  if(arguments.length === 1) {
    // Single argument is the callback.
    callback = arguments[0];
  } else {
    // Callback is the last argument.
    callback = arguments[1];
    if(typeof arguments[0] === 'object') {
      params = arguments[0]; 
    }
    else {
      id = arguments[0];
    }
  }
  url = this.buildURL(id, params);
  console.log("GET: " + url);
  query = rest.get(url);
  query.addListener('complete', function(data, response){
    if(response.headers['x-total']) {
      var results = {};
      results[self.model] = data;
      results.totalRecords = response.headers['x-total'];
      results.params = params;
      data = results;
    }
    callback(data, response);
  });
};