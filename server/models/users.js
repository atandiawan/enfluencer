let mongoose = require('mongoose')
mongoose.connect('localhost:27017/testing-project-13')
let Schema = mongoose.Schema

let usersSchema = new Schema({
  username: String,
  bio:String,
  profile_picture: String,
  full_name: String,
  instagram_id: String,
  // email: String,
  // phone: String,
  media: Number,
  follows: Number,
  followed_by: Number,
  // first_tag: String,
  // second_tag: String,
  // third_tag: String,
  first_photo: String,
  second_photo: String,
  third_photo: String,
  fourth_photo: String
})

//considers adding database per media where likes and comment can be displayed

let Users = mongoose.model('users', usersSchema)
module.exports = Users
