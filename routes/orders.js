var Order = require('../models/order');
    
function renderOrderList(response, title, results) {
  response.render('orders/index', {
    title: title,
    results: results
  });
};


// All orders
app.get('/orders', function(req, res){
  Order.objects.find(req.query, function(results) {
    renderOrderList(res, 'All orders', results);
  });
});

// Open orders
app.get('/orders/open', function(req, res){
  var params = req.query;
  params.state = "Open";
  Order.objects.find(params, function(results) {
    renderOrderList(res, 'Open orders', results);
  });
});

// Processing orders
app.get('/orders/processing', function(req, res){
  var params = req.query;
  params.state = "Processing";
  Order.objects.find(params, function(results) {
    renderOrderList(res, 'Processing orders', results);
  });
});

// Completed orders
app.get('/orders/completed', function(req, res){
  var params = req.query;
  params.state = "Completed";
  Order.objects.find(params, function(results) {
    renderOrderList(res, 'Completed orders', results);
  });
});

// Order details
app.get('/orders/:id', function(req, res){
  Order.objects.get(req.params.id, function(order) {
    res.render('orders/show', {title: 'Order Details', order: order});
  });
});

// Cancel an order details
app.post('/orders/:id', function(req, res){
  Order.objects.get(req.params.id, function(order) {
    var action, message;
    if(req.body.action === 'Cancel Order') {
      action = order.cancel;
      message = "Order was canceled!";
    } else if(req.body.action === 'Accept Order') {
      action = order.accept;
      message = "Order was accepted!";
    } else if(req.body.action === 'Complete Order') {
      action = order.complete;
      message = "Order was completed!";
    }
    action.call(order, {
      success: function(data, response) {
        req.flash('success', message);
        res.redirect('/orders/' + order.id);
      },
      error: function(data, response) {
        res.send("Error!");
      }
    });
  });
});

// Refund order lines
app.post('/orders/:id/refund', function(req, res){
  Order.objects.get(req.params.id, function(order) {
    order.refund(req.body.lines.split('-'), {
      success: function() {
        res.send("Ok!");
      },
      error: function() {
        res.send("It didn't work. /refunds isn't implemented yet.");
      }
    });
  });
});