import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
        recipient: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:false },
        groupId: { type:mongoose.Schema.Types.ObjectId, ref:'Group', required:false },
        messageType: { type:String, enum:["text", "file"], required:true },
        content: { type:String, required:function(){return this.messageType === "text"} },
        fileUrl: { type:String, required:function(){return this.messageType === "file"} },
        isSystemMessage: { type: Boolean, default: false },
        timestamp: { type:Date, default:Date.now }
    }
)

export const Message = mongoose.model('Message', messageSchema);