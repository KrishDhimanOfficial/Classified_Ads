import mongoose from "mongoose"

const brandSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
        match: /[a-z]/
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
        match: /[a-z]/
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
})

export default mongoose.model('brand', brandSchema)