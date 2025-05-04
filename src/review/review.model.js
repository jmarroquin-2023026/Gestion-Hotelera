import { Schema, model } from "mongoose"

const reviewSchema = Schema({
    user:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    review:[{
        type: String,
        required: true
    }],
    date:{
        type: Date,
        required: true
    }
},
    {versionKey: false}
)

export default model ('review', reviewSchema)