import mongoose from "mongoose"

const general_settingSchema = mongoose.Schema({
    logo: {
        type: mongoose.Schema.Types.String
    },
    name: {
        type: mongoose.Schema.Types.String,
        match: [/^[a-zA-Z ]+$/, 'Name must contain only characters and spaces!']
    },
    desc: {
        type: mongoose.Schema.Types.String,
        max: [150, 'Description must be 150 characters!']
    },
    companyemail: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Email is required!'],
        unique: true,
        match: [/^[a-z0-9]+@gmail\.com$/, 'Incorrect email!']
    }
})

export default mongoose.model('general_setting', general_settingSchema)