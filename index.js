// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialise the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes");


// console.log(process.env.PORT);

require('./database/db');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Testing on port " + port);
});