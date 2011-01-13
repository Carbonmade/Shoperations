var cm = require('../carbonmade');

app.get('/orders/:id', function(req, res){
  cm.get('orders', 1, function(order) {
    res.render('orders/show', {
      title: 'Order Details',
      order: order
    });
  });
});