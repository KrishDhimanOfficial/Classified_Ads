import sellerModel from "../models/seller.model.js"
import transaction_historyModel from "../models/transaction_history.model.js"
import { getUser } from "../services/createToken.js"
import deleteImg from '../services/deleteImg.js'
import validations from "../services/validateData.js"
import handleAggregatePagination from '../services/handlepagination.js'
import mongoose from "mongoose"
import config from "../config/config.js"
import reviewRatingModel from "../models/review&rating.model.js"

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
            const sellerprofile = await sellerModel.findById({ _id: seller.id }, { password: 0, status: 0, })
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
    },
    getSeller: async (req, res) => {
        try {
            const projection = [
                {
                    $match: { username: req.params.seller_username }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'sellerId',
                        as: 'products'
                    }
                },
                { $unwind: '$products' },
                { $replaceRoot: { newRoot: '$products' } },
                {
                    $match: {
                        status: true,
                        publishing_status: true,
                    }
                },
                {
                    $lookup: {
                        from: 'parent_categories',
                        localField: 'parentcategoryId',
                        foreignField: '_id',
                        as: 'parentcategory'
                    }
                },
                {
                    $unwind: '$parentcategory'
                },
                {
                    $lookup: {
                        from: 'sellers',
                        localField: 'sellerId',
                        foreignField: '_id',
                        as: 'seller'
                    }
                },
                { $unwind: '$seller' },
                {
                    $addFields: {
                        sellerImage: {
                            $concat: [`${config.sellerImage}`, '/', '$seller.image']
                        },
                        sellerusername: '$seller.username'
                    }
                },
                {
                    $project: {
                        'parentcategory.image': 0, 'parentcategory.slug': 0, 'parentcategory.status': 0,
                        sellerId: 0, 'seller.wallet_amount': 0, 'seller.password': 0, publishing_status: 0,
                        status: 0, ad_status: 0, click_count: 0, condition: 0,
                        description: 0, brandId: 0, parentcategoryId: 0,
                        subcategoryId: 0, images: 0, negotiable: 0, features: 0
                    }
                }
            ]
            const response = await handleAggregatePagination(sellerModel, projection, req.query)
            if (response.collectionData.length === 0) return res.json({ error: 'not found' })
            return res.status(200).json(response)
        } catch (error) {
            console.log('getSeller : ' + error.message)
        }
    },
    writeSellerReview: async (req, res) => {
        try {
            const { formData, rating, id } = req.body;
            const { name, review, email } = formData;

            const response = await reviewRatingModel.create({
                name, review, email, rating,
                sellerId: new mongoose.Types.ObjectId(id),
            })
            if (!response) return res.json({ error: 'Failed to write review!' })
            if (response) {
                const totalRating = await reviewRatingModel.find({ sellerId: id }, { rating: 1 })
                const total = totalRating.reduce((acc, curr) => acc + curr.rating, 0)
                await sellerModel.findByIdAndUpdate({ _id: id }, { avg_rating: total / totalRating.length })
            }
            return res.json({ message: 'Review written under Approval!' })
        } catch (error) {
            // Extract custom error messages                        
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('writeSellerReview : ' + error.message)
        }
    },
    getSellerReviews: async (req, res) => {
        try {
            const projection = [
                {
                    $match: { sellerId: new mongoose.Types.ObjectId(req.params.id) }
                },
                {
                    $lookup: {
                        from: 'sellers',
                        localField: 'sellerId',
                        foreignField: '_id',
                        as: 'seller'
                    }
                },
                { $unwind: '$seller' },
                {
                    $addFields: {
                        sellerImg: { $concat: [`${config.sellerImage}`, '/', '$seller.image'] },
                    }
                },
                {
                    $sort: { created_At: -1 }
                }
            ]
            const response = await handleAggregatePagination(reviewRatingModel, projection, req.query)
            if (response.collectionData.length == 0) return res.json({ error: 'No reviews found!' })
            if (response.collectionData.length > 0) return res.json(response)
        } catch (error) {
            console.log('getSellerReviews : ' + error.message)
        }
    }
}

export default seller_controllers