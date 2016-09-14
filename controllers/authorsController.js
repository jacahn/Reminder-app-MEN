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
  create: function(req, res){
    var author = new AuthorModel({name: req.body.name})
    author.save(function(err){
      if(!err){
        res.redirect("authors")
      }
    })
  },

  // view and pass the author object to the template
  show: function(req, res){
    AuthorModel.findById(req.params.id, function(err, doc){
      res.render("authors/show", {author: doc})
    })
  },
  edit: function(req, res){
    AuthorModel.findById(req.params.id, function(err, doc){
      res.render("authors/edit", {author: doc})
    })
  },
  update: function(req, res){
    // the update action will make a DB query to find an author document by ID in our
    // author's collection, when it does it will set the name of the author to the
    // value specified in the form. If it saves without error, it will redirect to the
    // author's show page
    AuthorModel.findById(req.params.id, function(err, docs){
      docs.name = req.body.name
      docs.save(function(err){
        if(!err){
          res.redirect("/authors/"+req.params.id)
        }
      })
    })
  },
  delete: function(req, res){
    // delete action will remove an author documents by ID. If there's no
    // error, it will redirect to the authors' index page.
    AuthorModel.remove({_id: req.params.id}, function(err){
      if(!err){
        res.redirect("/authors")
      }
    })
  },
  addReminder: function(req, res){
    // the addReminder action will make a DB query to find an author document by ID in our
    // author's collection, when it does, it will create a new reminder and push it to the
    // reminders subdocuments. If it saves without error, it will redirect to the author's show page
    AuthorModel.findById(req.params.id, function(err, docs){
      docs.reminders.push(new ReminderModel({body: req.body.body}))
      docs.save(function(err){
        if(!err){
          res.redirect("/authors/"+req.params.id)
        }
      })
    })
  },
  // this is an alternate syntax, this action will find and author by it's id and,
  // update it based on the object passed in as the second argument. In this case,
  // the object being passed in pulls a reminder based on the id from the url and
  // removes it from the subdocuments. In the callback, if there's no errors, it
  // will redirect to the author's show page.
  removeReminder: function(req, res){
    AuthorModel.findByIdAndUpdate(req.params.authorId, {

      $pull:{
        reminders: {_id: req.params.id}

      }
    }, function(err, docs){
      if(!err){
        console.log(req.params.authorId);
        res.redirect("/authors/" + req.params.authorId)

      }
    })
  }
}

// exports the controller so we can use the file as the controller
// re: index.js: var authorsController=require("./controllers/authorsController")
module.exports=authorsController;
