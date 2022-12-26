const express = require('express');
const router = express.Router();

const passport = require('passport');

const homeController = require('../controllers/homeController');


router.get('/', homeController.home);
router.post('/', homeController.post);

router.post('/create', homeController.loginPost);

router.get('/login', homeController.login);

router.get('/land', homeController.landHome);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), homeController.allowGoogleUser);

router.get('/land/logout', homeController.logout);


router.post('/land/reset', homeController.resetPassword);



module.exports = router;