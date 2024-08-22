import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
        
    },
    status: {
        type: Boolean,
        default: false // Set default value to true
    }
   
});

export const Collection = mongoose.model("Collection", todoSchema);
