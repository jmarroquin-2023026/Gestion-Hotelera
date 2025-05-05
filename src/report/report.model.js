import { Schema, model } from "mongoose"

const reportSchema = Schema({
    user:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    hotel:{
        type: Schema.Types.ObjectId,
        ref: 'hotel'
    },
    room:{
        type: Schema.Types.ObjectId,
        ref: 'room'
    },
    entranceDate:{
        type:Date,
        required:[true,'Date is required']
    },
    exitDate:{
        type:Date,
        required:[true,'Date is required']
    },
    totalPrice:{
        type:Number,
        required:[true,'Total price is required']
    }
    
},
    {versionKey: false}
)

export default model ('report', reportSchema)