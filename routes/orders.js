var cm = require('../carbonmade');

// List orders
app.get('/orders', function(req, res){
  cm.get('orders', function(orders) {
    res.render('orders/index', {
      title: 'Orders',
      orders: orders
    });
  });
});

// Order details
app.get('/orders/:id', function(req, res){
  cm.get('orders', req.params.id, function(order) {
    res.render('orders/show', {
      title: 'Order Details',
      order: order
    });
  });
});