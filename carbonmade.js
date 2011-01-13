var carbonmade = module.exports = {};
var rest = require('restler'),
    SITE = "http://platform.carbonmade.net";

function show_url(model, id) {
  return [index_url(model), id].join("/");
}

function index_url(model) {
  return [SITE, model].join("/");
};

carbonmade.get = function() {
  var args = Array.prototype.slice.call(arguments),
      model = args[0],
      id, callback;
  if(args.length === 2) {
    callback = args[1];
  } else {
    id = args[1];
    callback = args[2];
  }
  var url = id ? show_url(model, id) : index_url(model);

  rest.get(url).addListener('complete', callback);
};
