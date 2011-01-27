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
  Orders.find(function(results) {
    renderOrderList(res, 'All Orders', results);
  });
});

// Open orders
app.get('/orders/open', function(req, res){
  Orders.find({status: "Open"}, function(results) {
    renderOrderList(res, 'Open Orders', results);
  });
});

// Processing orders
app.get('/orders/processing', function(req, res){
  Orders.find({status: "Processing"}, function(results) {
    renderOrderList(res, 'Processing Orders', results);
  });
});

// Completed orders
app.get('/orders/completed', function(req, res){
  Orders.find({status: "Completed"}, function(results) {
    renderOrderList(res, 'Completed Orders', results);
  });
});

// Order details
app.get('/orders/:id', function(req, res){
  Orders.find(req.params.id, function(order) {
    res.render('orders/show', {title: 'Order Details', order: order});
  });
});