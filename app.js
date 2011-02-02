
/**
 * Module dependencies.
 */

var path = require('path'),
    express = require('express'),
    helpers = require('./helpers'),
    nav = require('./nav');

app = module.exports = express.createServer();

// Make all the modules in vendor/ loadable.
require.paths.unshift(path.join(__dirname, "vendor"));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.cookieDecoder());
  app.use(express.session({secret:"that's some tasty jambalaya, sir!"}));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
  app.helpers(helpers);
  app.helpers(nav);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/', function(req, res) {
  res.render('dashboard', {title: "Dashboard"});
});

// Routes
require('./routes/products');
require('./routes/orders');
require('./routes/customers');
require('./routes/packages');

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
