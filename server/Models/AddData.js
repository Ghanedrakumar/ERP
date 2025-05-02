import mongoose from "mongoose";
const  NoteSchema  =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    grade:{
        type:String,
        required :true,
    },
    course:{
        type:String,
        required:true,
    },  
    contact:{
        type:String,
        required:true,
    }
})
const Note = mongoose.model('Note',NoteSchema);
export default Note;
