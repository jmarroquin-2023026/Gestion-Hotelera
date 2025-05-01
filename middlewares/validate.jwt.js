'use strict'

import jwt from 'jsonwebtoken'

export const validableJwt = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let {autorizathion} = req.headers
        if(!autorizathion) return res.status(401).send({message: 'Unauthorized'})
        let user = jwt.verify(autorizathion, secretKey)
        req.user = user
        next()
    }catch(e){
        console.error(e)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}