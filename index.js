// express dependency
var express = require('express')
// mongoose dependency
var mongoose = require("mongoose")
// dependency for middleware for parameters
var bodyParser = require('body-parser')
// dependency that allows put and delete where not supported
var methodOverride = require("method-override")
// loads module containing all author controller actions. not defined yet
var authorsController = require("./controllers/authorsController")
// connect mongoose interfaces to reminders mongo db
mongoose.connect('mongodb://localhost/reminders')
// invokes express dependency and sets namespace to app
var app = express()
// sets view engine to handlebars
app.set("view engine", "hbs")
// allows for parameters in JSON and html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// allows for put/delete request in html form
app.use(methodOverride('_method'))
// connects assets like stylesheets
app.use(express.static(__dirname + '/public'))

// app server located on port 4000
app.listen(4000, function(){
  console.log("app listening on port 4000");
})

// routes for all requests to this express app that map to
// an action/function in out authorsController
app.get('/authors', authorsController.index)
app.get('/authors/new', authorsController.new)
app.get('/authors/:id', authorsController.show)
