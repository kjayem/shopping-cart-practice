var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf({cookie: true});
router.use(csrfProtection);

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

router.get('/user/signup', csrfProtection, function(req, res) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile', 
  failureRedirect: '/user/signup',
  //will flash 'Email is already in use'
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
  res.render('user/profile');
});

module.exports = router;
