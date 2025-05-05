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
        enum:['5 STARS','4 STARS','3 STARS','2 STARS','1 STAR'],
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
        type:String
    }]
},
    {versionKey: false}
)

export default model ('hotel', hotelSchema)