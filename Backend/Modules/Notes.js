const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  User:
  {
    type :mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
});

module.exports=mongoose.model('notes',NotesSchema)