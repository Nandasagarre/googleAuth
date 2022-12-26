const User = require('../models/auths');

const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;
console.log("hi from pas")
passport.use(new LocalStrategy(
    
    function () {
        return done(null, 1);
    }
));