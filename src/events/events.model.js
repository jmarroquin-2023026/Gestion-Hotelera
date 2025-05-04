import { Schema, model } from "mongoose"

const eventsSchema = Schema({
    typeOfEvent: {
        type:String,
        enum:['CONFERENCE','WEDDING','MEETING']
    },
    date:{
        type: Date,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    room:{
        type: Schema.Types.ObjectId,
        ref: 'rooms'
    },
    extraServices:[{
        type: Schema.Types.ObjectId,
        required:[false,'Extra Services are required']
    }],
    totalPrice:{
        type:Number,
        required:[true,'Total price is required']
    }
},
    {versionKey: false}
)

export default model ('event', eventsSchema)