import mongoose from 'mongoose'

const sub_category = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
        match: /[a-z]/
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'parent_category'
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
})

export default mongoose.model('sub_category', sub_category)