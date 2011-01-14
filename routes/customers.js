var cm = require('../carbonmade');

// List customers
app.get('/customers', function(req, res){
  cm.get('customers', 1, function(customer) {
    res.render('customers/index', {
      title: 'Customers',
      customers: [customer]
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