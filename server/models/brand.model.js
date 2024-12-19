import mongoose from "mongoose"

const brandSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Title Are Required!'],
        unique: true,
        trim: true,
        match: [/^[a-z]$/, 'Title must be in character']
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Slug Are Required!'],
        unique: true,
        trim: true,
        match: [/^[a-z]$/, 'Slug must be in character']
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
})

export default mongoose.model('brand', brandSchema)