import User from './user.model.js'
import argon from 'argon2'

import { encrypt } from '../../utils.js/encrypt.js'

export const gerUsers = async(req,res)=>{
    try{
        const{limit = 20, skip = 0} = req.query
        let users=await User.find()
            .skip(skip)
            .limit(limit)

        if(!users.length===0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message:'User found',
                users
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error',e})
    }
}

export const getUserById = async(req,res)=>{
    try{
        let {id} = req.params
        let user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success:true,
                message: 'User found',
                user
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updateUser = async(req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let updatedUser = await User.findByIdAndUpdated(id,data,{new:true})
        if(!updatedUser){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'User updated successfully',
                updatedUser
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}

export const updatePassword = async(req,res)=>{
    try{
        let {id} = req.params
        let {newPassword,oldPassword} = req.body
        let user = await User.findById(id)
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found',
            }
        )
        let compare = await argon.verify(user.password, oldPassword)
        if(!compare) return res.status(401).send(
            {
                success:false,
                message: 'Old password is incorrect'
            }
        )
        user.password = await encrypt(newPassword)
        await user.save()

        return res.send(
            {
                success:true,
                message: 'Password updated successfully'
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false,message: 'General error',e})
    }
}

export const deleteUser = async(req,res)=>{
    try{
        let{id} = req.params
        let deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser) return res.status(404).send(
            {
                success:false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'User deleted successfully',
                deleteUser
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({success:false, message:'General error',e})
    }
}