import express from "express";
import { Collection } from "./todo.models.js";
import mongoose from "mongoose";



const router = new express.Router();

const { ObjectId } = mongoose.Types;
// Get / Todos
router.get("/todos", async (req, res) => {
    try {
        const todo = await Collection.find({});
        res.status(200).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Post / Todos

router.post("/todos", async (req, res) => {
    try {
        const { todo, status } = req.body;
        // If status is not provided in the request, set it to true
        const newStatus = status !== undefined ? status : false;
        
        if (!todo) {
            return res.status(400).json({msg: "error no todo found"});
        }
        
        const newTodo = await Collection.create({ todo, status: newStatus });
        res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// Put / Todos/id
router.put("/todos/:id", async(req, res) => {
    if (typeof updatedData !== "boolean"){
        return res.status(400).json({msg:"invalid Status"})
    }
    try {
        const _id = new ObjectId(req.params.id)
        const updatedData = req.body;
        const updateTodo = await Collection.updateOne({ _id },{$set:updatedData});
        res.status(201).json(updateTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }

});

// Delete / Todos/id
router.delete("/todos/:id", async(req, res) => {
    try {
        const _id = new ObjectId(req.params.id)

        const deleteTodo = await Collection.deleteOne({ _id }, { $set: { status: "completed" } });

        res.status(201).json(deleteTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
  
});

export default router;
