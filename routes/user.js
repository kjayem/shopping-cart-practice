var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf({cookie: true});
router.use(csrfProtection);

// Making sure if user is logged in to allow them to access the login page.
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
  });

// logout
router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
  })

//filter for checking if user is not logged in. all routes after this middleware is also reachable by users not logged in.
router.use('/', notLoggedIn, function(req, res, next) {
    next();
})

router.get('/signup', csrfProtection, function(req, res) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile', 
    failureRedirect: '/user/signup',
    //will flash 'Email is already in use'
    failureFlash: true
  }));
  
  router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
  });
  
  router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile', 
    failureRedirect: '/user/signin',
    //will flash 'Email is already in use'
    failureFlash: true
  }));



  module.exports = router;

  // checks if user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
  }

  // allows only unauthenticated users are able to reach certain routes
  function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
  }
