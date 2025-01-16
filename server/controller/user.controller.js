import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req, res)=>{
    try {
        const{username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:"Somethig missing !",
                success:false
            });
        }
        
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exists, try different email",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password:hashedPassword
        });

        return res.status(201).json({
            message:"Account Created Successfully!"
        })


    } catch (error) {
        console.log(error);
    }
}

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Error occured! Please fill required details",
                success:false
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"User doesn't exists",
                success:false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Incorrect Password",
                success:false
            })
        }

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:'1d'});

        user = {
            _id:user._id,
            username:user.username,
            email:user.email,
            name:user.name,
            bio:user.bio,
            profilePicture:user.profilePicture,
            gender:user.gender
        }

        return res.cookie('token',token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000})
        .json({
            message:`Welcome back ${user.username}`,
            success:true,
            user
        });


    } catch (error) {
        console.log(error);
    }
}

export const logout = async(req, res)=>{
    try {
        return res.cookie('token',"", {maxAge:0}).json({
            message:"Logged out successfully! ",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}