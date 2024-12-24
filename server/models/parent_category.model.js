import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Title is required!'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z &]+$/, 'Invalid Title!']
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Slug is required'],
        trim: true,
        unique: true,
        match: [/^[a-z-]+$/, 'Invalid Slug']
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: true
    },
})

export default mongoose.model('parent_category', categorySchema)