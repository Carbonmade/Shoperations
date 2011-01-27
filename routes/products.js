var Finder = require('../finder'),
    Products = new Finder('products');

// All Products
app.get('/products', function(req, res){
  // TODO: Product list currently doesn't send x-total headers,
  // which means `results` is simply the list of orders, NOT
  // an actual results object.
  Products.find(function(results) {
    var results = {products: results, totalRecords: results.length};
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