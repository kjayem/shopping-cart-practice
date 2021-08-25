var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

// Tells passport how to store the user in the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
        //allows passport to store user into the session and lets us retrieve the info whenever we need it
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({'email': email}, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            // by using false, its not saying passport this was successful, its saying there was a error and the reason was the message
            return done(null, false, {message: 'Email is already in use.'});
        }
    
        // if it passes both test cases above, then create a new user.
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
        
    });
}));


