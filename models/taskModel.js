const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  deadline:{
    type: Date,
  },
  type:{
    type: String,
    enum:['project', 'homework'],
    required: true
  },
  user:{
    type:String,
    ref:'user'
  }
})

const taskModel = mongoose.model('task', taskSchema);
module.exports = taskModel;