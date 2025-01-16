import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption:{type:string, default:''},
    postImage:{type:string, required:'true'},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:'true'},
    likes:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    Comments:{type:mongoose.Schema.Types.ObjectId, ref:'Comment'},
})

export const Post = mongoose.model('Post', postSchema);