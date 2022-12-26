//database connection
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/auth';

//connect
mongoose.connect(uri);

const db = mongoose.connection;

// if errror
db.on('error', console.error.bind('console', 'error conecting DB'));

//connected
db.once('open', () => console.log('Connected to DB!'));



