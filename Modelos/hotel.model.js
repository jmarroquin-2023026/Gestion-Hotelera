import { Schema, model } from "mongoose"

const hotelSchema = Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required:true
    },
    category:[{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    rooms:[{
        type: Schema.Types.ObjectId,
        ref: 'rooms'
    }],
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
    }
},
    {versionKey: false}
)

export default model ('hotel', hotelSchema)