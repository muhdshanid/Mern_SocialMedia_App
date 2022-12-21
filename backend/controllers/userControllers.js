import { validationResult } from "express-validator"
import UserModel from "../models/UserModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import PostModel from "../models/PostModel.js"
import dotenv from 'dotenv'
dotenv.config()

export const createUser = async (req,res) => {
    try {
        const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password,username,phonenumber} = req.body
    let user = await UserModel.findOne({email})
    if(user){
        return res.status(200).json("User already exist")
    }
    const hashedPass = await bcrypt.hash(password,10)
    user = await UserModel.create({username,email,password:hashedPass,phonenumber})
    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET)
    await user.save()
    return res.status(200).json({user,token})
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
            return res.status(400).json("You already follow this user")
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
                return PostModel.find({user:item})
            })
        )
        return res.status(200).json(followersPost)
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