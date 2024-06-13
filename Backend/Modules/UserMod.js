const mongoose = require('mongoose');
const { Schema } = mongoose;

// creating the  schema for the user 
const UserSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  }
});
const User=mongoose.model('user',UserSchema)
module.exports=User