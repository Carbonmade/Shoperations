var Finder = require('../finder'),
    Orders = new Finder('orders');

function renderOrderList(response, title, results) {
  response.render('orders/index', {
    title: title,
    results: results
  });
};

// All orders
app.get('/orders', function(req, res){
  Orders.find(req.query, function(results) {
    renderOrderList(res, 'All orders', results);
  });
});

// Open orders
app.get('/orders/open', function(req, res){
  var params = req.query;
  params.state = "Open";
  Orders.find(params, function(results) {
    renderOrderList(res, 'Open orders', results);
  });
});

// Processing orders
app.get('/orders/processing', function(req, res){
  var params = req.query;
  params.state = "Processing";
  Orders.find(params, function(results) {
    renderOrderList(res, 'Processing orders', results);
  });
});

// Completed orders
app.get('/orders/completed', function(req, res){
  var params = req.query;
  params.state = "Completed";
  Orders.find(params, function(results) {
    renderOrderList(res, 'Completed orders', results);
  });
});

// Order details
app.get('/orders/:id', function(req, res){
  Orders.find(req.params.id, function(order) {
    res.render('orders/show', {title: 'Order Details', order: order});
  });
});