// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialise the app
let cookieParser = require('cookie-parser');
// Initialise the app

let app = express();
require('dotenv').config()


const auth = require('./Middleware/auth');
// Import routes
let apiRoutes = require("./api-routes");
const contactsRouter = require('./routes/contact');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/product');
const customersRouter = require('./routes/customer');




require('./database/db');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
app.get('/api/home', (req, res) => res.json({message:'pizda'}));

// Use Api routes in the App
// app.use('/api', apiRoutes);
app.use('/contacts', auth, contactsRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/products', auth, productsRouter);
app.use('/customers', auth, customersRouter);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Testing on port " + port);
});