import mongoose from "mongoose"

const brandSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Title Are Required!'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z ]+$/, 'Invalid Title!'],
    },
    image: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Image Are Required!'],
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Slug Are Required!'],
        unique: true,
        trim: true,
        match: [/^[a-z-]+$/, 'Invalid Slug!']
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
})

export default mongoose.model('brand', brandSchema)