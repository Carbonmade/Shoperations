var Customer = require('../models/customer');

// List customers
app.get('/customers', function(req, res){
  Customer.objects.find(function(results) {
    res.render('customers/index', {
      title: 'Customers',
      results: results
    });
  });
});

// Customer details
app.get('/customers/:id', function(req, res){
  Customer.objects.get(req.params.id, function(customer) {
    res.render('customers/show', {
      title: "Customer Details",
      customer: customer
    });
  });
});