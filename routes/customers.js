var Finder = require('../finder'),
    Customers = new Finder('customers');

// List customers
app.get('/customers', function(req, res){
  Customers.find(function(results) {
    res.render('customers/index', {
      title: 'Customers',
      results: results
    });
  });
});

// Customer details
app.get('/customers/:id', function(req, res){
  cm.get('customers', req.params.id, function(customer) {
    res.render('customers/show', {
      title: "Customer Details",
      customer: customer
    });
  });
});