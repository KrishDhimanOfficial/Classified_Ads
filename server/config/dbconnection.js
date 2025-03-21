import mongoose from 'mongoose'
import config from './config.js'

const options = { serverSelectionTimeoutMS: 15000, dbName: 'classified_Ads' }

const connectDB = async () => {
    try {
        mongoose.connect(config.mongodb_LINK, options)
        console.log('mongodb conntected!')
        return;
    } catch (error) {
        console.log(`mongodb not conntected : ${error.message}`)
    }
}

export default connectDB