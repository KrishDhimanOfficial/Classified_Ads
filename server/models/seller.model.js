import mongoose from "mongoose"

const sellerSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: [true, 'username must be required!'],
        unique: true,
        match: [/^[a-z0-9]+$/, 'Incorrect username!']
    },
    image: {
        type: mongoose.Schema.Types.String,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Name must be required!'],
        match: [/^[A-Za-z]+( [A-Za-z]+)*$/, 'Incorrect Name!']
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Email is required!'],
        unique: true,
        match: [/^[a-z0-9]+@gmail\.com$/, 'Incorrect email!']
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Phone No is required!'],
        unique: true,
        validate: {
            validator: (v) => /^\d{10}$/.test(v),
            message: `Not a valid phone number!`
        },
        match: [/^[0-9]+$/, 'Incorrect phone no!']
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        min: [6, 'Password is too short!'],
    },
    wallet_amount: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    }
})

export default mongoose.model('seller', sellerSchema)