import mongoose from "mongoose";

const stateSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: [true, 'State Name Are Required!'],
        unique: true,
        match: [/^[A-Za-z]+$/, 'Incorrect State!']
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
})

const citySchema = mongoose.Schema({
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: [true, 'City Name Are Required!'],
        unique: true,
        match: [/^[a-zA-Z]+$/, 'Incorrect City!']
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
})

export const stateModel = mongoose.model('state', stateSchema)
export const cityModel = mongoose.model('city', citySchema)