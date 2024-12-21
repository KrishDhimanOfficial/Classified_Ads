import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: [true, 'username must be required!'],
        unique: true,
        match: [/^[a-z]+$/, 'Incorrect username!']
    },
    firstname: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Firstname must be required!'],
        match: [/^[a-z]+$/, 'Incorrect firstname!']
    },
    lastname: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Lastname must be required!'],
        match: [/^[a-z]+$/, 'Incorrect lastname!']
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
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        min: 6
    },
})

export default mongoose.model('user', userSchema)