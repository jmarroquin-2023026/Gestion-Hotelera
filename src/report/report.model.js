import { Schema, model } from "mongoose"

const reportSchema = Schema({
    user:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    hotel:[{
        type: Schema.Types.ObjectId,
        ref: 'hotel'
    }],
    room:{
        type: Schema.Types.ObjectId,
        ref: 'room'
    }
},
    {versionKey: false}
)

export default model ('report', reportSchema)