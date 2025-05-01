import { Schema, model } from "mongoose"

const typeOfEventSchema = Schema({
    typeOfEvent: {
        type: String,
        required:true
    }
},
    {versionKey: false}
)

export default model ('typeOfEvent', typeOfEventSchema)