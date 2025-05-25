import {User} from "../models/user.model.js"
import { Group } from "../models/group.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/getDaraUri.js"
import cloudinary from "../utils/cloudinary.js"
import mongoose from "mongoose"

export const register = async(req, res)=>{
    try {
        const{username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:"Please fill all details!",
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

        return res.status(200).json({
            message:"Account Created Successfully!",
            success:true
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
                message:"Please fill required details",
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
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                coverPicture: user.coverPicture,
                name: user.name,
                bio: user.bio,
                gender: user.gender,
                dob: user.dob,
                followers: user.followers,
                following: user.following,
                workEducation: user.workEducation,
                locations: user.locations,
                contactInfo: user.contactInfo,
                familyRelationships: user.familyRelationships,
        }

        return res.cookie('token', token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000})
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

export const editProfile = async(req, res)=>{
    try {
        const userId = req.id;

        let {name, bio, gender, workEducation, locations, contactInfo, familyRelationships} = req.body;
        let {dob} = req.body;

        const profilePicture = req.files?.profilePicture?.[0];
        const coverPicture = req.files?.coverPicture?.[0];

        if (workEducation && typeof workEducation === "string") {
            workEducation = JSON.parse(workEducation);
        }
  
        if (locations && typeof locations === "string") {
            locations = JSON.parse(locations);
        }
    
        if (contactInfo && typeof contactInfo === "string") {
            contactInfo = JSON.parse(contactInfo);
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({
                message:"error in fetching user details",
                success:false,
            })
        }
        
        let cloudResponse1
        if(profilePicture){
            const fileUri = await getDataUri(profilePicture);
            cloudResponse1 = await cloudinary.uploader.upload(fileUri);
        }

        let cloudResponse2
        if(coverPicture){
            const fileUri = await getDataUri(coverPicture);
            cloudResponse2 = await cloudinary.uploader.upload(fileUri);
        }

        if(profilePicture)  user.profilePicture = await cloudResponse1.secure_url;
        if(coverPicture)  user.coverPicture = await cloudResponse2.secure_url;
        if(name) user.name = name;
        if(bio) user.bio = bio;
        if(gender) user.gender = gender;
        if(dob) user.dob = new Date(dob);
        if(workEducation) user.workEducation = workEducation;
        if(locations) user.locations = locations;
        if(contactInfo) user.contactInfo = contactInfo;
        if(familyRelationships) user.familyRelationships = familyRelationships;

        await user.save()

        return res.status(200).json({
            message:"Account updated Successfully",
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
    }
}


export const followUnfollow = async (req, res) =>{
    try {
        const followKrneWalaKiId = req.id;
        const jiskoFollowKarungaUskaId = req.params.id;

        if(followKrneWalaKiId === jiskoFollowKarungaUskaId){
            return res.status(401).json({
                success: false,
                message: "You can't follow or unfollow yourself"
            })
        }

        const followKrneWalaUSer = await User.findById(followKrneWalaKiId);
        const jiskoFollowKarungaWoUser = await User.findById(jiskoFollowKarungaUskaId);
        if(!followKrneWalaUSer || !jiskoFollowKarungaWoUser){
            return res.status(400).json({
                success: false,
                message: " Something went wrong while getting user !"
            })
        }

        const isFollowing = followKrneWalaUSer.includes(jiskoFollowKarungaWoUser); // following: mtlb mai kisko-kisko follow kiya hu
        if(isFollowing){
            // hmare following me wo user present hai mtlb hm us user ko already follow kr chuka hu. Mtlb ab hme unfollow krna chahiye
            await Promise.all([
                User.updateOne( { _id: followKrneWalaKiId}, {$pull: {followings: jiskoFollowKarungaUskaId}}),
                User.updateOne( { _id: jiskoFollowKarungaUskaId}, {$pull: {followings: followKrneWalaKiId}})
            ])
            return res.status(200).json({
                success: true,
                message: 'Unfollow successfully !'
            })
        } else {
            // Agar following array me wo user nhi present hai to follow krunga
            await Promise.all([
                User.updateOne( { _id: followKrneWalaKiId}, {$push: {followings: jiskoFollowKarungaUskaId}}),
                User.updateOne( { _id: jiskoFollowKarungaUskaId}, {$push: {followings: followKrneWalaKiId}})
            ])
            return res.status(200).json({
                success: true,
                message: 'followed successfully !'
            })
        }

    } catch (error) {
        console.error("fails to follow or unfollow!", error);
    }
}

export const getfollowers = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        if (!searchTerm) {
            return res.status(400).json({
                message: "Search term is required",
                success: false
            });
        }

        const followers = await User.find({
            $and: [
                { _id: { $ne: req.id } },
                {
                    $or: [
                        { name: { $regex: searchTerm, $options: 'i' } },
                        { username: { $regex: searchTerm, $options: 'i' } } 
                    ]
                }
            ]
        }).select("-password"); 

        return res.status(200).json({
            followers: followers,
            message: "Searched successfully!",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllMembers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.id } }, "name username email");

        const members = users.map((user) => ({
            label: user.name || user.email,
            value: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        }));
        
        return res.status(200).json({ members });

    } catch (error) {
        return res.status(500).json({ success: false, message: "fails to load members" });
    }
};
export const getUserGroups = async (req, res) => {
    try {
        
        const userId = req.id;

        const groups = await Group.find({
            $or: [
                { admin: userId },
                { members: userId }
            ]
        })
        .sort({ createdAt: -1 })
        
        return res.status(200).json({ groups });

    } catch (error) {
        return res.status(500).json({ success: false, message: "fails to load user groups" });
    }
};