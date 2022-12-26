
const auths = require('../models/auths');
var key = '1234123412341234';
var encryptor = require('simple-encryptor')(key);



module.exports.home = function (req, res) {
    
    res.render('index');
}

module.exports.post = async function (req, res) {
    console.log(req.body);
    await auths.create({
        mail: req.body.mail,
        pwd: encryptor.encrypt(req.body.pwd)
    }, (err) => {
        if (err) {
            console.log(`error in inserting record ${err}`);
            req.flash('error', 'we already have your mail! try new or click login');
            res.redirect('/');
        } else {
            console.log("inserted");
            req.flash('success', 'taken into db');
            res.redirect('/login');
        }
        
    });
    
}


module.exports.login = function (req, res) {
    console.log('log page get');
    res.render('login');
}

module.exports.loginPost = function (req, res) {
    auths.findOne({ mail: req.body.mail }, function (err, user) {
       
        if (err) {
            console.log(`err in login details ${err}`);
            req.flash('error', '505 internal error');
            return res.redirect('/');
        }
        else if (!user) {
            console.log(`user not found`);
            req.flash('error', 'user not found');
            return res.redirect('/');
        }


      
       
        if (encryptor.decrypt(user.pwd) != req.body.pwd) {
            console.log("decryted as: ", encryptor.decrypt(user.pwd));
            req.flash('error', 'Credentials dint work');
            return res.redirect('/login');
        }
        req.flash('success', `Hii ${user.mail}`);

        req.session.name = user.mail;

        return res.redirect('/land');
    })
}

module.exports.landHome = function (req, res) {
    res.render('land');
}

module.exports.allowGoogleUser = function (req, res) {
    req.flash('success', 'Autgenticated via google');
    res.redirect('/land');
}

module.exports.logout = function (req, res, next) {
    req.logout((err) =>{
        if (err) return next(err);
        req.flash('success', 'logged out :(');
        res.redirect('/');
    })
}

module.exports.resetPassword = function (req, res) {

    console.log("sessopnr", req.session);
    var pwd = req.session.name;
    if (typeof pwd == 'undefined') {
        pwd = req.session.passport.user.mail;
    }
    console.log("final take away", pwd);
    auths.findOneAndUpdate({ mail: pwd }, { pwd: encryptor.encrypt(req.body.repwd) }, null, function (err, doc) {
        if (err) {
            req.flash('error', 'something went wrong');
        }
        req.flash('success', 'Reseted you password');
         return res.redirect('/land');
       // console.log('this is doc', doc);
    }).clone().catch(function (err) { console.log(err) });
    
}
   

exports = auths;