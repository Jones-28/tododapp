import mongoose from 'mongoose';

const todoSchema =new mongoose.Schema({
  text:{
    type: String,
    require: true
  },
  //completed or not 
  completed :{
    type :Boolean,
    default:false

  }
},{timestamps:true})

const Todo =mongoose.model("Todo",todoSchema);

export default Todo;