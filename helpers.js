var helpers = module.exports = {};

helpers.currency = function(amount) {
  return "$" + amount.toFixed(2);
};

helpers.date = function(datetime) {
  if(typeof datetime !== 'object') datetime = new Date(datetime);
  return datetime.toLocaleDateString() + " at " + datetime.toLocaleTimeString();
};