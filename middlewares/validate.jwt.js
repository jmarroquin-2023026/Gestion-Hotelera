'use strict'

import jwt from 'jsonwebtoken'
//Es middleware si lleva el next()
export const validateJwt = async(req,res,next)=>{
    try {
        let secretKey = process.env.SECRET_KEY
        let { authorization } =   req.headers
        if(!authorization) return res.status(401).send({message: 'Unautorized'})
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}

//Funcion que valide si es Hotel owner