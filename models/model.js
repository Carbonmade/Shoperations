var Model = exports = module.exports = function Model(attributes) {
  if(attributes) {
    this.setAttributes(attributes); 
  }
};

Model.prototype.setAttributes = function(attributes) {
  for(attr in attributes) {
    this[attr] = attributes[attr];
  }
};

Model.prototype.link = function(text) {
  text = text || this.id;
  return '<a href="/' + this.modelName.toLowerCase() + 's/' + this.id + '">' + text + '</a>';
};