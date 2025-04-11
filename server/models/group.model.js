import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    name : {type:String, required:true, trim:true},
    members : [{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}],
    admin : {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    messages : [{type:mongoose.Schema.Types.ObjectId, ref:'Message', required:false}],
    createdAt : {type:Date, default:Date.now},
    updatedAt : {type:Date, default:Date.now},
});

GroupSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

GroupSchema.pre("findOneAndUpdate", function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

export const Group = mongoose.model('Group', GroupSchema);
