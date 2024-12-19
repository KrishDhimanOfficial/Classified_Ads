import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
        match: /[a-z]/
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: true
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true,
        unique: true
    }
})

export default mongoose.model('parent_category', categorySchema)