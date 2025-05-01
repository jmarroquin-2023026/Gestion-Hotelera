import { Schema, model } from "mongoose"

const eventsSchema = Schema({
    typeOfEvent: {
        type: Schema.Types.ObjectId,
        ref: 'typeOfEvent'
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
    extraServices:{
        type: Schema.Types.ObjectId,
        ref: 'extraServices'
    }
},
    {versionKey: false}
)

export default model ('event', eventsSchema)