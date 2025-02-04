import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    commented_text:{type:String, required:true, trim:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:'true'},
    post:{type:mongoose.Schema.Types.ObjectId, ref:'Post', required:'true'}
}, {timestamps:true});

export const Comment = mongoose.model('Comment', CommentSchema);
