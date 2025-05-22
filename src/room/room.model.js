import { Schema, model } from "mongoose"

const roomSchema = Schema({
    type: {
        type: String,
        enum:['SUITE','NORMAL','FAMILIAR'],
        required: true
    },
    description:{
        type: String,
        required:true,
        minlegth:[30,'The description needs at least 30 characters'],
        maxlength:[200,`Can't overcome 200 characters`]
    },
    amount:{
        type:Number,
        required:[true,'Amount is required']
    },
    hotel:{
        type:Schema.Types.ObjectId,
        ref:'hotel',
        required:[true,'Hotel is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required']
    }
},
    {versionKey: false}
)

export default model ('room', roomSchema)