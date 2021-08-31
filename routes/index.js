var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(Product.length);
  Product.find(function(err, docs) {
    // console.log(docs);
    // returns items
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  }).lean();
});

// add to cart 
router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  // check if this cart property exists, then pass that. if not, pass a empty object. 
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/'); 
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

module.exports = router;
