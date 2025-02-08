import mongoose from "mongoose"

const adPlanSchema = mongoose.Schema({
    subtitle: {
        type: mongoose.Schema.Types.String
    },
    plan_duration: {
        type: mongoose.Schema.Types.String
    },
    discount: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    price: {
        type: mongoose.Schema.Types.Number,
    }
})