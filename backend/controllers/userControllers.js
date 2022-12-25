import { validationResult } from "express-validator"
import UserModel from "../models/UserModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import PostModel from "../models/PostModel.js"
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { generateOTP } from "../services/mail.js"
import VerificationTokenModel from "../models/VerificationToken.js"
import resetTokenModel from "../models/ResetToken.js"
import crypto from 'crypto'
dotenv.config()

export const createUser = async (req,res) => {
    try {
        const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    } 
    const {email,password,username,phonenumber,profile} = req.body
    let user = await UserModel.findOne({email})
    if(user){
        return res.status(200).json("User already exist")
    }
    const hashedPass = await bcrypt.hash(password,10)
    const isProfileAvailable = profile ? profile : ``
    user = await UserModel.create({username,email,password:hashedPass,phonenumber,profile:isProfileAvailable})
    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET)
    const OTP = generateOTP()
    const verificationToken = await VerificationTokenModel.create({
        seller:user._id,
        token:OTP,
    })
    await verificationToken.save()
    await user.save()
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.NODEMAIL_USER,
          pass:  process.env.NODEMAIL_PASS
        }
      });
      transport.sendMail({
        from:"socialmedia@gmail.com",
        to:user.email,
        subject:"Verify your email using OTP",
        html:`<h1>Your OTP CODE ${OTP}</h1>`
      })
    return res.status(200).json({status:"Pending",message:"Please check your email",user:user._id})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const verifyEmail = async(req,res) => {
   try {
    const {user,OTP} = req.body
    const mainUser = await UserModel.findById(user)
    if(!mainUser){
        return res.status(400).json("User not found")
    }
    if(mainUser.verified === true){
        return res.status(400).json("User already verified")
    }
    const tokenAvail = await VerificationTokenModel.findOne({seller:mainUser._id})
    if(!tokenAvail){
        return res.status(400).json("Sorry token not found")
    }
    const isMatch = await bcrypt.compare(OTP,tokenAvail.token)
    if(!isMatch){
        return res.status(400).json("Token is not valid")
    }
    mainUser.verified = true
    await VerificationTokenModel.findByIdAndDelete(tokenAvail._id)
    await mainUser.save()
    const token = jwt.sign({
        id:mainUser._id,
        username:mainUser.username
    },process.env.JWT_SECRET);
    const {password,...other} = mainUser._doc
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.NODEMAIL_USER,
          pass:  process.env.NODEMAIL_PASS
        }
      });
      transport.sendMail({
        from:"socialmedia@gmail.com",
        to:mainUser.email,
        subject:"Successfully verified your email",
        html:`Now you can login in social app`
      })
      return res.status(200).json({other,token})
   } catch (error) {
    console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
   }
}

export const loginUser = async(req,res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {email} = req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json("User not found")
        }
        const comparePass = await bcrypt.compare(req.body.password,user.password)
        if(!comparePass){
            return res.status(400).json("Password not match")
        }
        const token = jwt.sign({
            id:user._id,
            username:user.username
        },process.env.JWT_SECRET)
        const {password,...other} = user._doc
        return res.status(200).json({other,token})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const forgetPassword = async(req,res) => {
   try {
    const {email} = req.body
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(400).json("User not found")
    }
    const token = await resetTokenModel.findOne({seller:user._id})
    if(token){
        return res.status(400).json("After one hour you can request for another token")
    }
    const RandomTxt = crypto.randomBytes(20).toString("hex")
    const resetToken = new resetTokenModel({
        seller:user._id,
        token:RandomTxt
    })
    await resetToken.save()
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.NODEMAIL_USER,
          pass:  process.env.NODEMAIL_PASS
        }
      });
      transport.sendMail({
        from:"socialmedia@gmail.com",
        to:user.email,
        subject:"Reset Token",
        html:`http://localhost:3000/reset-password/?token=${RandomTxt}&_id=${user._id}`
      })
      return res.status(200).json("Check your email to reset password")
   } catch (error) {
    console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
   }
}

export const resetPassword = async (req,res) => {
    try {
        const {token,_id} = req.query
    if(!token || !_id){
        return res.status(400).json("Invalid request")
    }
    const user = await UserModel.findOne({_id})
    if(!user){
        return res.status(400).json("User not found")
    }
    const resetToken = await resetTokenModel.findOne({seller:user._id})
    if(!resetToken){
        return res.status(400).json("Reset token is not found")
    }
    const matchToken = await bcrypt.compare(token,resetToken.token)
    if(!matchToken){
        return res.status(400).json("Token is not valid")
    }
    const {password} = req.body
    const hashPass  = await bcrypt.hash(password,10)
    user.password = hashPass
    await user.save()
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.NODEMAIL_USER,
          pass:  process.env.NODEMAIL_PASS
        }
      });
      transport.sendMail({
        from:"socialmedia@gmail.com",
        to:user.email,
        subject:"Your password reset successfully",
        html:`Now you can login with new password`
      })
      return res.status(200).json("Email has been send")
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const followUser = async(req,res) => {
    try {
        const {id} = req.params
    if(id !== req.body.user){ 
        const user = await UserModel.findById(id)
        const otherUser = await UserModel.findById(req.body.user)
        if(!user.followers.includes(req.body.user)){
            await user.updateOne({$push:{followers:req.body.user}})
            await otherUser.updateOne({$push:{following:id}})
            return res.status(200).json("User has followed ")
        }else{
            await user.updateOne({$pull:{followers:req.body.user}})
            await otherUser.updateOne({$pull:{following:id}})
            return res.status(200).json("User has unfollowed ")
        }
    }else{
        return res.status(400).json("You cannot follow your self")
    }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getPosts = async (req,res) => {
    try {
        const {id} = req.params
        const user = await UserModel.findById(id)
        const followersPost = await Promise.all(
            user.following.map(item => {
                return PostModel.find({user:item}).sort({title:-1})
            })
        )
        const userPosts = await PostModel.find({user:user._id}).sort({title:-1})
        return res.status(200).json(userPosts.concat(...followersPost))
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateUser = async (req,res) => {
    try {
        const {id} = req.params
        if(req.params.id === req.user.id){
            if(req.body.password){
                let hashPass = await bcrypt.hash(req.body.password,10)
                req.body.password = hashPass
            }
            const updateUser = await UserModel.findByIdAndUpdate(id,{
                $set:req.body
            })
            await updateUser.save()
            return res.status(200).json(updateUser)
        }else{
            return res.status(400).json("You are not allow to update this user")
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const deleteUser = async (req,res) => {
    try {
        if(req.params.id !== req.user.id){
            return res.status(400).json("Account does not match")
        }else{
            await UserModel.findByIdAndDelete(req.params.id)
            return res.status(200).json("Account has been deleted")
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getPostedUser = async (req,res) => {
    try {
        const {id} = req.params 
        const user = await UserModel.findById(id) 
        if(!user){  
            return res.status(400).json("User not found")
        }
        const {email,password,phonenumber,...others} = user._doc
        return res.status(200).json(others)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getSuggestionUsers = async (req,res) => {
    try {
        const allUser = await UserModel.find({})
        const {id} = req.params
        const user = await UserModel.findById(id)
        const followingUser = await Promise.all(
            user.following.map(item => item)
        )
        let userToFollow = allUser.filter(val => {
            return !followingUser.find(item =>{
                return  val.id.toString() === item 
            })
        })
        let filtered = userToFollow.filter(item => {
            return item._id != id
        })
        let filterUser = await Promise.all(
            filtered.map(item => {
                const {email,phonenumber,followers,following,password,...other} = item._doc
                return other
            })
        )
        return res.status(200).json(filterUser)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getFollowingUsers = async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const followingUser = await Promise.all(
            user.following.map(usr => {
                return UserModel.findById(usr)
            })
        )
        let followingList = []
         followingUser.map(person => {
            const {email,phonenumber,followers,following,password,...other} = person._doc
            followingList.push(other)
        })
        return res.status(200).json(followingList)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}
export const getFollowers = async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const followers = await Promise.all(
            user.followers.map(usr => {
                return UserModel.findById(usr)
            })
        )
        let followersList = []
        followers.map(person => {
            const {email,phonenumber,followers,following,password,...other} = person._doc
            followersList.push(other)
        })
        return res.status(200).json(followersList)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const allUsers = async(req,res) => {
   try {
    const allUsers = await UserModel.find({})
    return res.status(200).json(allUsers)
   } catch (error) {
    console.log(error.message);
        return res.status(500).json({message:"Internal server error"})
   }

}