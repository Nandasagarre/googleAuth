const express = require('express');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const db = require('./config/db');
const googleAuth = require('./config/google_auth')
const app = express();
const session = require('express-session');
const passport = require('passport');

const flash = require('connect-flash');
const flashmw = require('./config/flashmw');



const port = 8000;

// parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieparser());

app.use(express.static('assests'));

app.set('view engine', 'ejs');
app.set('views', './views');



app.use(session({
    name: 'auther',
    secret: 'auther',
    saveUninitialized: false,
    resave: false,
    cookie: {

        maxAge: (2000 * 60 * 100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(flashmw.setFlash);

app.use('/', require('./routes/index'));


app.listen(port, () => {
    console.log(`port ${port} active`);
})