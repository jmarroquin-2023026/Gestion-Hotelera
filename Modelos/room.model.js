import { Schema, model } from "mongoose"

const roomSchema = Schema({
    type: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    state:{
        type: String,
        upparcase: true,
        enum: ['AVAILABLE','NOT AVAILABLE'],
        required: true,
        default: 'AVAILABLE',
    }
},
    {versionKey: false}
)

export default model ('room', roomSchema)