import cloudinary from '../utils/cloudinary.js'
import {Post} from '../models/post.models.js'
import {User} from '../models/user.model.js'
import sharp from 'sharp'

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
            .populate({path:'author', select:'name profilePicture bio'});

        return res.status(200).json({
            posts,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}