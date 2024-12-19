import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    firstname: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    lastname: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        match: /^[a-z0-9]+@gmail\.com$/
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
})

export default mongoose.model('user', userSchema)