import { Schema, model } from "mongoose"

const extraServicesSchema = Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required:true
    }
},
    {versionKey: false}
)

export default model ('extraServices', extraServicesSchema)