import sellerModel from "../models/seller.model.js"
import transaction_historyModel from "../models/transaction_history.model.js"
import { getUser } from "../services/createToken.js"
import deleteImg from '../services/deleteImg.js'
import validations from "../services/validateData.js"
import handleAggregatePagination from '../services/handlepagination.js'
import mongoose from "mongoose"

const seller_controllers = {
    renderAllSellers: async (req, res) => {
        try {
            const sellers = await sellerModel.find({}, { password: 0, username: 0 })
            return res.render('seller/allSellers', { sellers })
        } catch (error) {
            console.log('renderAllSellers : ' + error.message)
        }

    },
    renderAllDeactivated_Sellers: async (req, res) => {
        try {
            const sellers = await sellerModel.find({ status: false }, { password: 0 })
            return res.render('seller/dSellers', { sellers })
        } catch (error) {
            console.log('renderAllDeactivated_Sellers : ' + error.message)
        }
    },
    updateSellerStatus: async (req, res) => {
        try {
            const { status } = req.body;

            const response = await sellerModel.findByIdAndUpdate(
                { _id: req.params.id }, { status }
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('updateSellerStatus : ' + error.message)
        }
    },
    getProfile: async (req, res) => {
        try {
            const seller = getUser(req.body.token)
            const sellerprofile = await sellerModel.findById({ _id: seller.id }, { password: 0, status: 0,   })
            if (!sellerprofile) res.json({ error: 'Account Not Found!' })
            return res.status(200).json(sellerprofile)
        } catch (error) {
            console.log('getProfile : ' + error.message)
        }
    },
    updateProfile: async (req, res) => {
        try {
            const seller = getUser(req.headers['authorization'].split(' ')[1])
            const { username, name, phone, email } = req.body;

            const response = await sellerModel.findByIdAndUpdate(
                { _id: seller.id },
                {
                    username, name, phone, email,
                    image: req.file?.filename
                },
                { runValidators: true }
            )

            if (req.file?.filename) await deleteImg(`seller_profile_images/${response.image}`)
            if (!response) return res.json({ error: 'Unable to update profile!' })
            return res.status(200).json({ message: 'Updated Profile!' })
        } catch (error) {
            // Extract custom error messages                        
            if (error.name === 'ValidationError') validations(res, error.errors)
            if (req.file.filename) await deleteImg(`seller_profile_images/${req.file?.filename}`)
            console.log('updateProfile : ' + error.message)
        }
    },
    updateWallet: async (req, res) => {
        try {
            const seller = getUser(req.headers['authorization'].split(' ')[1])
            const { amount, status } = req.body;

            if (status) { // update the wallet when payment is successfull
                const response = await sellerModel.findByIdAndUpdate(
                    { _id: seller.id },
                    { $inc: { wallet_amount: amount } },
                    { new: true }
                )
                if (!response) return res.json({ error: 'Unable to update wallet!' })
            }

            await transaction_historyModel.create({ sellerId: seller.id, amount, status })
            return res.json({ message: 'Amount Added to Wallet!' })
        } catch (error) {
            console.log('updateWallet : ' + error.message)
        }
    },
    getpaymentTransactions: async (req, res) => {
        try {
            const seller = getUser(req.headers['authorization'].split(' ')[1])
            const projection = [
                { $match: { sellerId: new mongoose.Types.ObjectId(seller.id) } },
                {
                    $addFields: {
                        formattedDate: {
                            $dateToString: {
                                date: "$date",
                                format: "%Y-%m-%d"
                            }
                        },
                        formattedtime: {
                            $dateToString: {
                                date: "$date",
                                format: "%H:%M:%S"
                            }
                        }
                    }
                },
                { $sort: { date: -1 } }
            ]
            const response = await handleAggregatePagination(transaction_historyModel, projection, req.query)
            return res.json(response)
        } catch (error) {
            console.log('getpaymentTransactions : ' + error.message)
        }
    }
}

export default seller_controllers