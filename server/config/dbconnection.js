import mongoose from 'mongoose'
import config from './config.js'

const options = {
    serverSelectionTimeoutMS: 5000,
    dbName: 'classified_Ads',
}

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb_LINK, options)
        mongoose.set('bufferCommands', false)
        console.log('mongodb conntected!')
        return;
    } catch (error) {
        console.log(`mongodb not conntected : ${error.message}`)
    }
}

export default connectDB