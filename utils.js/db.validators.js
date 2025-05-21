import User from '../src/user/user.model.js'
import Hotel from '../src/hotel/hotel.model.js'
import Room from '../src/room/room.model.js'

export const existUsername = async (username, user, id)=>{
    const alreadyUsername =  await User.findOne({username})
    if(alreadyUsername && !alreadyUsername._id != user._id){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}
 
export const existEmail = async (email, user)=>{
    const alreadyEmail =  await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id !=user._id){
        console.error(`Username ${email} is already taken`)
        throw new Error(`Username ${email} is already taken`)
    }
}

export const existUser = async (user)=>{
    const existUSer =  await User.findById(user)
    if(!existUSer){
        console.error(`The User id is not valid`)
        throw new Error(`The User id is not valid`)
    }
}
export const existHotel = async (hotel)=>{
    const existHotel =  await Hotel.findById(hotel)
    if(!existHotel){
        console.error(`The Hotel id is not valid`)
        throw new Error(`The Hotel id is not valid`)
    }
}
export const existRoom = async (room)=>{
    const existRoom =  await Room.findById(room)
    if(!existRoom){
        console.error(`The Room id is not valid`)
        throw new Error(`The Room id is not valid`)
    }
}

export const isHotelOwner =async(id)=>{
    try {
        const user = await User.findById(id)
        if(!user|| user.role !== 'HOTELOWNER') return res.status(403).send({success:false,message:`You dont have access ${user.username}`})
    } catch (error) {
        console.error(error);
        throw Error('This user is not a hotel owner')
    }
}
export const notRequiredField = (field)=>{
    if(field){
        throw Error(`${field} is not required`)
    }
}