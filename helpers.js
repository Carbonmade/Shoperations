var helpers = module.exports = {};

helpers.currency = function(amount) {
  return "$" + amount.toFixed(2);
};

helpers.date = function(datetime) {
  if(typeof datetime !== 'object') datetime = new Date(datetime);
  return datetime.toLocaleDateString() + " at " + datetime.toLocaleTimeString();
};

// Adds a .toCurrency() method to numbers.
// Example: (5.2).toCurrency() => "$5.20"
Number.prototype.toCurrency = function() {
  return helpers.currency(this);
};