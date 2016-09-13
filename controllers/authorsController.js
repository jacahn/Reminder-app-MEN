// requires our model definitions
var AuthorModel = require('../models/author')
var ReminderModel = require('../models/reminder')

// instantiates an authorsController which will contain all of our controller actions
var authorsController = {
  // the index will make a DB query to find all author documents in our
  // authors collection, when it does it will render the authors/index view and
  // pass the author objects to the template
  index: function(req, res){
    AuthorModel.find({}, function(err, docs){
      res.render("authors/index", {authors: docs})
    })
  },
  // in this action, just rendering a view and don't need to query the DB
  new: function(req, res){
    res.render("authors/new")
  },
  // view and pass the author object to the template
  show: function(req, res){
    AuthorModel.findById(req.params.id, function(err, doc){
      res.render("authors/show", {author: doc})
    })
  }
}

// exports the controller so we can use the file as the controller
// re: index.js: var authorsController=require("./controllers/authorsController")
module.exports=authorsController;
