//req mongoose dependency
var mongoose = require('mongoose')

//instantiate a name space for our Schema constructor defined by mongoose
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

//defining schema for reminders
var ReminderSchema = new Schema({
  body: String
})

//defining schema for authors
var AuthorSchema = new Schema({
  name: String,
  reminders: [ReminderSchema]
})

// setting models in mongoose using schemas defined above
// we'll be using these a lot in app
mongoose.model("Author", AuthorSchema)
mongoose.model("Reminder", ReminderSchema)
