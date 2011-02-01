var Package = require('../models/package');

app.get('/packages', function(req, res){
  Package.objects.find(req.query, function(results) {
    res.render('packages/index', {
      title: 'Packages',
      results: results
    });
  });
});

app.get('/packages/:id', function(req, res){
  Package.objects.get(req.params.id, function(result) {
    res.render('packages/show', {
      title: 'Package Details',
      "package": result
    });
  });
});