import mongoose from "mongoose"

const sellerSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: [true, 'username must be required!'],
        unique: true,
        match: [/^[a-z]+$/, 'Incorrect username!']
    },
    image: {
        type: mongoose.Schema.Types.String,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Name must be required!'],
        match: [/^[a-z ]+$/, 'Incorrect firstname!']
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
        match: [
            /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
            'Incorrect phone no!'
        ]
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
    }
})

export default mongoose.model('seller', sellerSchema)