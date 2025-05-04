import User from '../user/user.model.js'
import { encrypt, checkPassword } from '../../utils.js/encrypt.js'
import {generateJwt} from '../../utils.js/jwt.js'
export const register = async(req,res)=>{
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'CLIENT'
        user.profilePicture = req.file.filename ?? null
        await user.save()
        return res.send({message : `Registered succesfully, can be logged with username: ${user.username}`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'General error with user registration',error})
    }
}
export const login = async(req,res)=>{
    try{
        let {userLogin, password} = req.body
        let user = await User.findOne(
            {
                $or:  [
                    {email: userLogin},
                    {username: userLogin}

                ]
            }
        )
        if (!user)return res.status(404).send({message: 'User not found'})
        if(user && await checkPassword(user.password,password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role,
                profilePicture:user.profilePicture
            }
            
            let token = await generateJwt(loggedUser)
            return res.send({message: `Welcome ${user.name}`,
                loggedUser,
                token
            }
            )
        }
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error whit login'})
    }
}