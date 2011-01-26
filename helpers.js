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

// Formats lines of an address using a join character.
helpers.address = function(address, joiner) {
  return address.lines.join(joiner || '\n');
};

// Format a dimensions object
helpers.dimensions = function(dimensions) {
  var dims = [],
      bits,
      units = {inches: "″", feet: "′"};
  ['length', 'width', 'height'].forEach(function(dim) {
    bits = dimensions[dim].split(' ');
    dims.push(bits[0] + units[bits[1]]);
  });
  return dims.join(' x ');
};