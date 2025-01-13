import mongoose from 'mongoose'

const transaction_history = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    date: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    },
    amount: {
        type: mongoose.Schema.Types.Number,
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
    }
})

export default mongoose.model('transaction_history', transaction_history)