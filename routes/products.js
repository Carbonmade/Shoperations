var Product = require('../models/product');

// All Products
app.get('/products', function(req, res){
  Product.objects.find(req.query, function(results) {
    res.render('products/index', {
      title: "Products",
      results: results
    });
  });
});

// Order details
// app.get('/orders/:id', function(req, res){
//   Orders.find(req.params.id, function(order) {
//     res.render('orders/show', {title: 'Order Details', order: order});
//   });
// });