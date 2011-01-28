var helpers = module.exports = {};

Number.prototype.pad = function() {
  if(this < 10) 
    return "0" + this;
  return this.toString();
};

helpers.currency = function(amount) {
  return "$" + amount.toFixed(2);
};

helpers.date = function(datetime, fmt) {
  if(typeof datetime !== 'object') datetime = new Date(datetime);
  
  if(typeof fmt === 'undefined')
    return datetime.toLocaleDateString() + " at " + datetime.toLocaleTimeString();
  else if(fmt === 'short')
    return [(datetime.getMonth()+1).pad(), datetime.getDate().pad(), datetime.getFullYear()].join('-');
};

// Adds a .toCurrency() method to numbers.
// Example: (5.2).toCurrency() => "$5.20"
Number.prototype.toCurrency = function() {
  return helpers.currency(this);
};

String.prototype.toCurrency = function() {
  return "$" + this;
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

Object.values = function(object) {
  var values = [];
  for(prop in object)
    if(object.hasOwnProperty(prop))
      values.push(object[prop]);
  return values;
};

helpers.status_label = function(object, attr) {
  attr = attr || 'status';
  return '<span class="status ' + object[attr].toLowerCase() + '">' + object[attr] + '</span>';
};