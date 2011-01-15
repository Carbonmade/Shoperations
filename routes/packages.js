var cm = require('../carbonmade');

app.get('/packages', function(req, res){
  cm.get('packages', 1, function(_package) {
    res.render('packages/index', {
      title: 'Packages',
      packages: [_package]
    });
  });
});

app.get('/packages/:id', function(req, res){
  cm.get('packages', req.params.id, function(_package) {
    res.render('packages/show', {
      title: 'Package Details',
      _package: _package
    });
  });
});