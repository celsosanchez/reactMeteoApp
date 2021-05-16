
//defining the modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var session = require('express-session');
const routes = require('./controllers/routes');
MongoStore = require('connect-mongo')(session);
var MongoDBStore = require('connect-mongodb-session')(session);

//Connetion to the DB
mongoose
  .connect("mongodb+srv://meteo:meteo123@cluster0-aflzu.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//Create an express object named app
const app = express();

// session store definiton onto mongo
var store = new MongoDBStore({
  uri: "mongodb+srv://meteo:meteo123@cluster0-aflzu.mongodb.net/test?retryWrites=true&w=majority",
  collection: 'mySessions'
});

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
   resave: false,
  saveUninitialized: false
}));

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Routing
routes(app)

//Port definition
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));