import { Schema, model } from "mongoose"

const hotelSchema = Schema({
    owner:{
        type:Schema.Types.ObjectId,
        required:[true,'A Hotel owner is required'],
        ref:'user'
    },
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required:true
    },
    category:{
        type: String,
        enum:['1 STAR','2 STARS','3 STARS','4 STARS','5 STARS'],//Piensen ahi que categorias le ponen
        required:[true,'A category is required'],
        default:''
    },
    amenities:{
        type: String,
        required: true
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'reviews'
    }],
    reservations:{
        type: Number,
        required: true
    },
    photos:[{
        type:String,
        required:[true,'Hotel photos are required'],
    }]
},
    {versionKey: false}
)

export default model ('hotel', hotelSchema)