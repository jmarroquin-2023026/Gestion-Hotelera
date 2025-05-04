import {Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true,'Name is required']
    },
    surname:{
        type: String,
        required: [true,'Surname is required']
    },
    email:{
        type: String,
        required: [true,'Email is required'],
    },
    username:{
        type: String,
        unique: true,
        lowecase: true,
        required: [true,'Username is required']
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        minlegth: [5]
    },
    role:{
        type: String,
        upparcase: true,
        enum: ['CLIENT','ADMIN','HOTELOWNER'],
        required: [true,'Role is required'],
        default: 'CLIENT',
    },
    profilePicture:{
        type: String
    }//NO PONER REQUIRED
},
    {versionKey: false}
)

export default model('user', userSchema)
