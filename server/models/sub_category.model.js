import mongoose from 'mongoose'

const sub_category = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Title is required!'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z ]+$/, 'Invalid Title!']
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'parent_category',
        match: [/^[a-z0-9]+$/, 'Invalid parent category']
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Slug is required'],
        trim: true,
        unique: true,
        match: [/^[a-z-]+$/, 'Invalid Slug!']
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
})

export default mongoose.model('sub_category', sub_category)