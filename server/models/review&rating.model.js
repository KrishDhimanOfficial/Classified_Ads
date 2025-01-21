import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
const reviewRatingSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Name is required!'],
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Email is required!'],
        match: [/^[a-z0-9]+@gmail.com$/, 'Incorrect Email']
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
    },
    created_At: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    }
})

reviewRatingSchema.plugin(aggregatePaginate)
export default mongoose.model('review_rating', reviewRatingSchema)