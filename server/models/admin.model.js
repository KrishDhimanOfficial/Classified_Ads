import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        default: 'Admin'
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Email is required!'],
        match: [/^[a-z0-9]+@gmail\.com$/, 'Incorrect email!']
    },
    role: {
        type: mongoose.Schema.Types.String,
        default: 'superadmin'
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Password must be required!'],
        match: [/(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}/, 'Incorrect password!']
    }
})

export default mongoose.model('admin', adminSchema)