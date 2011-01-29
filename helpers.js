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
  for(prop in object) {
    if(object.hasOwnProperty(prop)) {
      values.push(object[prop]); 
    } 
  }
  return values;
};

helpers.status_label = function(object) {
  var state = object.state || "Unknown";
  return '<span class="status ' + state.toLowerCase() + '">' + state + '</span>';
};

// Tests if a value is blank.
helpers.isBlank = function(value) {
  if(value === null || typeof value === 'undefined') return true;
  
  // If value is an Object, check for "blankness" by
  // seeing if it has any properties.
  if(typeof value === 'object') {
    value = Object.keys(value);
  }
  
  // Strings & Arrays
  if(typeof value.length !== 'undefined') {
    if(typeof value === 'string') {
      return value.trim().length === 0;
    } else {
      return value.length === 0;
    }
  }
    
};

helpers.isPresent = function(value) {
  return !helpers.isBlank(value);
};