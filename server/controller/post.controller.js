import cloudinary from '../utils/cloudinary.js'
import {Post} from '../models/post.models.js'
import {User} from '../models/user.model.js'
import sharp from 'sharp'
import { Comment } from '../models/comment.model.js'

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

        return res.status(200).json({
            message:"Comment Added",
            comment,
            success:true
        })


    } catch (error) {
        console.log(error);
    }
}

export const getPostComment = async (req, res)=>{
    try {
        const postKiId = req.params.id;

        const comments = await Comment.find({post:postKiId})
            .populate({path:'author', select:'profilePicture name bio'});
        
        if(!comments){
            return res.json({
                message:"Comments not found or May be not exists",
                success:false,
            })
        }

        return res.status(200).json({
            success:true,
            comments
        })

    } catch (error) {
        console.log(error);
    }
}