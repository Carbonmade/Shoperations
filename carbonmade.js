var carbonmade = module.exports = {};
var rest = require('restler'),
    SITE = "http://platform.carbonmade.net";

function show_url(model, id) {
  return [index_url(model), id].join("/");
}

function index_url(model) {
  return [SITE, model].join("/");
};

carbonmade.get = function(model, id, callback) {
  var url = id ? show_url(model, id) : index_url(model);
  rest.get(url).addListener('complete', callback);
};
