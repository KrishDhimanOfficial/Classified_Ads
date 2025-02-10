import mongoose from "mongoose"

const adPlanSchema = mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String
    },
    plan_duration: {
        type: mongoose.Schema.Types.Number,
        default: 0,
        match: [/^[0-9]$/, 'Required!']
    },
    discount: {
        type: mongoose.Schema.Types.Number,
        default: 0,
        match: [/^[0-9]$/, 'Required!']
    },
    price: {
        type: mongoose.Schema.Types.Number,
        match: [/^[0-9]$/, 'Required!']
    }
})

export default mongoose.model('adplans', adPlanSchema)