import User from "../../src/user/user.model.js"
import { encrypt } from "../encrypt.js"

export const alreadyExistUser = async()=>{
    let admin = await User.findOne({
      email:'parmas@gmail.com',
      username:'parmas',
      role:'ADMIN'  
    })
    let hotelOwner = await User.findOne({
        email:'armas@gmail.com',
        username:'armas',
        role:'HOTELOWNER'  
      })
    if(!admin) crearAdmin()
    if(!hotelOwner) crearHotelOwner()
}

const crearAdmin=async()=>{
    const admin = new User({
        name:'Pedro',
        surname:'Armas',
        username:'parmas',
        email:'parmas@gmail.com',
        password: await encrypt('ParmasGoat123@'),
        role:'ADMIN',
        profilePicture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVM4CxYFLglzgIB0StD_ikZUCTec-DXIhX8EyBO2rQA&s'
    })
    await admin.save()
}
const crearHotelOwner=async()=>{
    const hotelOwner = new User({
        name:'Pedro',
        surname:'Armas',
        username:'armas',
        email:'armas@gmail.com',
        password: await encrypt('ParmasGoat123@'),
        role:'HOTELOWNER',
        profilePicture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVM4CxYFLglzgIB0StD_ikZUCTec-DXIhX8EyBO2rQA&s'
    })
    await hotelOwner.save()
}
