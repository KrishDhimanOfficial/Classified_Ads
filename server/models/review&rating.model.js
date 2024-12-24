import mongoose from 'mongoose'

const reviewRatingSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true
    },
    review: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Review is required!'],
        trim: true,
        min: [10, 'Review is too short!'],
        max: [150, 'Review is too long!'],
    },
    rating: {
        type: mongoose.Schema.Types.Number,
        default: 0,
    }
})

export default mongoose.model('review_rating', reviewRatingSchema)