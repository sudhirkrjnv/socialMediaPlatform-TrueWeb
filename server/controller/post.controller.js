import cloudinary from '../utils/cloudinary.js'
import {Post} from '../models/post.models.js'
import {User} from '../models/user.model.js'
import sharp from 'sharp'
import { Comment } from '../models/comment.model.js'
import { Notification } from '../models/notification.model.js'
import { io, userSocketsMap } from "../socket.js"

export const addPost = async(req, res)=>{
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;

        let cloudResponse
        if(image){
            const optimizedImageBuffer = await sharp(image.buffer)
                .resize({width:800, height:800, fit:'inside'})
                .toFormat('jpeg', {quality:80})
                .toBuffer();
    
            const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const post = await Post.create({
            caption, 
            image:cloudResponse.secure_url,
            author:authorId
        })

        const user = await User.findById(authorId);
        if(user){
            user.post.push(post._id);
            await user.save();
        }

        await post.populate({path:'author', select:'-password'});

        return res.status(200).json({
            message:"New Post Added Successfully !",
            post,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllPost = async(req, res)=>{
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'name profilePicture bio' })
            .populate({
                path: 'comments',
                options: { sort: { createdAt: -1 } },
                populate: { path: 'author', select: 'name profilePicture' }
            });

        return res.status(200).json({
            posts,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async(req, res)=>{
    try {
        const likeKrneWalaUserKiId = req.id;
        const postKiId = req.params.id;

        const post = await Post.findById(postKiId);
        if(!post){
            return res.json({
                message:"Post not found",
                success:false
            })
        }
        await post.updateOne({$addToSet:{likes:likeKrneWalaUserKiId}});
        await post.save();

        if (post.author.toString() !== likeKrneWalaUserKiId.toString()) {
            const notification = await Notification.create({
                recipientId: post.author,
                senderId: likeKrneWalaUserKiId,
                postId: postKiId,
                content: "liked your post",
                type: "like"
            });

            const populatedNotification = await notification.populate("senderId", "name username profilePicture");

            const recipientSocketIds = userSocketsMap.get(post.author.toString());
            if (recipientSocketIds) {
                recipientSocketIds.forEach(sid => {
                    io.to(sid).emit("getNotification", populatedNotification);
                });
            }
        }

        
        return res.status(200).json({
            message:"Post Liked !",
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = async(req, res)=>{
    try {
        const dislikeKrneWalaUserKiId = req.id;
        const postKiId = req.params.id;
        
        const post = await Post.findById(postKiId);
        if(!post){
            return res.json({
                message:"Post not found",
                success:false
            })
        }
        await post.updateOne({$pull:{likes:dislikeKrneWalaUserKiId}});
        await post.save();
        console.log(post);

        if (post.author.toString() !== dislikeKrneWalaUserKiId.toString()) {
            await Notification.deleteOne({
                recipientId: post.author._id,
                senderId: dislikeKrneWalaUserKiId,
                postId: postKiId,
                type: "like"
            });

            const recipientSocketIds = userSocketsMap.get(post.author.toString());
            if (recipientSocketIds) {
                recipientSocketIds.forEach(sid => {
                    io.to(sid).emit("refreshNotification");
                });
            }
        }
        
        return res.status(200).json({
            message:"Post Disliked !",
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const addComment = async(req, res)=>{
    try {
        const commentKrneWalaUserKiId = req.id;
        const postKiId = req.params.id;
        const {commented_text} = req.body;
        
        const post = await Post.findById(postKiId);
        if(!post){
            return res.json({
                message:"Post not found",
                success:false
            })
        }

        const comment = await Comment.create({
            commented_text,
            author:commentKrneWalaUserKiId,
            post:postKiId
        })

        await comment.populate({path:'author', select:'profilePicture name bio'});

        post.comments.push(comment._id);

        await post.save();

        if (post.author.toString() !== commentKrneWalaUserKiId.toString()) {
            const notification = await Notification.create({
                recipientId: post.author._id,
                senderId: commentKrneWalaUserKiId,
                postId: postKiId,
                content: "commented on your post",
                type: "comment"
            });

            const populatedNotification = await notification.populate("senderId", "name username profilePicture");

            const recipientSocketIds = userSocketsMap.get(post.author.toString());
            if (recipientSocketIds) {
                recipientSocketIds.forEach(sid => {
                    io.to(sid).emit("getNotification", populatedNotification);
                });
            }
        }

        return res.status(200).json({
            message:"Comment Added",
            comment,
            success:true
        })


    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async(req, res)=>{
    try {
        const postKiId = req.params.id;
        const authorKiId = req.id;

        const post = await Post.findById(postKiId);
        if(!post){
            return res.status(401).json({
                message:"Post not found",
                success:false
            })
        }
        if(post.author.toString() !== authorKiId){
            return res.status(401).json({
                message:'Unauthorized !',
                success:'false'
            })
        }

        await Post.findByIdAndDelete(postKiId);

        let user = await User.findById(authorKiId);
        user.post = user.post.filter(id =>id.toString()!== postKiId)

        await Comment.deleteMany({post:postKiId})

        return res.status(200).json({
            message:"Post Deleted",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}