var Finder = require('../finder'),
    Orders = new Finder('orders');

function renderOrderList(response, title, orders) {
  response.render('orders/index', {
    title: title,
    orders: orders
  });
};

// All orders
app.get('/orders', function(req, res){
  Orders.find(function(orders) {
    renderOrderList(res, 'All Orders', orders);
  });
});

// Open orders
app.get('/orders/open', function(req, res){
  Orders.find({status: "Open"}, function(orders) {
    renderOrderList(res, 'Open Orders', orders);
  });
});

// Processing orders
app.get('/orders/processing', function(req, res){
  Orders.find({status: "Processing"}, function(orders) {
    renderOrderList(res, 'Processing Orders', orders);
  });
});

// Order details
app.get('/orders/:id', function(req, res){
  Orders.find(req.params.id, function(order) {
    res.render('orders/show', {title: 'Order Details', order: order});
  });
});