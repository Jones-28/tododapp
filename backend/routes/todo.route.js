//function for create, updation,delation

import express, { text } from 'express';
import Todo from '../models/todo.model.js';

const router=express.Router();


//get all todos
router.get('/',async(req,res)=>{
  try{
    const todos= await Todo.find();
    res.json(todos);

  }catch(error){
    res.status(500).json({message:error.message})

  }
})

//Add a new todos

router.post("/",async(req,res)=>{
  consttodo =new Todo({
    text: req.body.text

  })
  try{
    const newTodo =await todod.save();
    res.status(201).json(newTodo)

  }catch(error){
    res.status(400).json({message:err.message})
  }
})

//update

router.patch("/:id" ,async(req,res)=>{
  try{
    const todo=await Todo.findById(req.params.id);
    if (!todo)return res.status(404).json({message:"Todo not found 🙁☹️"});

    if (req.body.text !==undefined){
      todo.text=req.body.text;
    }
    if (req.body.completed !==undefined){
      todo.completed=req.body.completedxt;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  }catch(error){
    res.status(400).json({message:err.message});
  }
})
//delete
router.delete("/id",async (req,res)=>{
  try{
    await Todo.findByIdAndDelete(req.params.id)
    res.json({message:"Todo delated"})
  }catch(error){
    res.status(500).json({message:err.message});

  }
});

export default router;
