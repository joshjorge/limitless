// dependecies
const config = require('config');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
require('mongoose-type-email');

// routes declaration
const indexPage = require('./routes/index');
const itemDetails = require('./routes/itemDetails');
const admin = require('./routes/admin');
const user = require('./routes/user');
const help = require('./routes/help');
const about = require('./routes/about');
const logIn = require('./routes/logIn');
const logOut = require('./routes/logOut');
const updateItems = require('./routes/updateItems');
const reserved = require('./routes/reserved');

const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
// dataBase connnexion
mongoose
  .connect('mongodb://127.0.0.1/limitless')
  .then(() => console.log('💻 Mondodb Connected'))
  .catch(err => console.error('Could not connected', err));

//Engine & meddleware
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// using routes
app.use('/', indexPage);
app.use('/itemDetails', itemDetails);
app.use('/admin', admin);
app.use('/user', user);
app.use('/help', help);
app.use('/about', about);
app.use('/logIn', logIn);
app.use('/logOut', logOut);
app.use('/updateItem', updateItems);
app.use('/reserved', reserved);

// server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
