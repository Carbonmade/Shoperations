var Package = require('../models/package');

function _packageList(req, res, state) {
  var params = req.query;
  if(state) {
    params.state = state;
  }
  Package.objects.find(params, function(results) {
    res.render('packages/index', {
      title: 'Packages',
      results: results
    });
  });
};

app.get('/packages', function(req, res){
  _packageList(req, res);
});

app.get('/packages/processing', function(req, res){
  _packageList(req, res, Package.STATES.PROCESSING);
});

app.get('/packages/shipped', function(req, res){
  _packageList(req, res, Package.STATES.SHIPPED);
});

app.get('/packages/delivered', function(req, res){
  _packageList(req, res, Package.STATES.DELIVERED);
});

app.get('/packages/:id', function(req, res){
  Package.objects.get(req.params.id, function(result) {
    res.render('packages/show', {
      title: 'Package Details',
      "package": result
    });
  });
});