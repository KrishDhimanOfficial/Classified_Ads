import { getUser } from "../services/createToken.js";
import productModel from "../models/product.model.js";
import deleteImage from "../services/deleteImg.js";
import mongoose from "mongoose";
import handleAggregatePagination from "../services/handlepagination.js";

const product_controller = {
    createProduct: async (req, res) => {
        try {
            // console.log(JSON.parse(req.body.data));
            // console.log(req.body);
            if (!req.files['featured_img']) return res.json({ error: 'please select featured image' })
            if (!req.files['images']) return res.json({ error: 'please select images' })
            const seller = getUser(req.headers['authorization'].split(' ')[1])

            const { slug, status } = req.body;
            const { title, description, parentcategoryId, subcategoryId, brandId,
                price, negotiable, condition, attributes } = JSON.parse(req.body.data)

            const response = await productModel.create({
                title, description, slug, price, negotiable,
                condition, features: attributes, status,
                featured_img: req.files['featured_img'][0].filename,
                images: req.files['images'].map(file => file.filename),
                parentcategoryId: new Object(parentcategoryId.value),
                sellerId: new Object(seller.id),
                subcategoryId: new Object(subcategoryId.value),
                brandId: new Object(brandId.value)
            })

            if (!response) return res.json({ error: 'failed!' })
            return res.json({ message: 'Created Succesfully!' })
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            await deleteImage(`product_images/${req.files['featured_img'][0].filename}`)
            req.files['images'].map(async file => await deleteImage(`product_images/${file.filename}`))
            console.log('createProduct : ' + error.message)
        }
    },
    getlistingDetails: async (req, res) => {
        try {
            const seller = getUser(req.headers['authorization'].split(' ')[1])
            const response = await productModel.aggregate([
                {
                    $match: {
                        sellerId: new mongoose.Types.ObjectId(seller.id)
                    }
                },
                {
                    $project: { _id: 1, status: 1 }
                },
                {
                    $group: {
                        _id: null, // Group all documents together
                        totalActive: {
                            $sum: {
                                $cond: [{ $eq: ["$status", true] }, 1, 0] // Count documents where status is true
                            }
                        },
                        totalDeActive: {
                            $sum: {
                                $cond: [{ $eq: ["$status", false] }, 1, 0] // Count documents where status is false
                            }
                        },
                        ad_status: {
                            $sum: {
                                $cond: [{ $eq: ["$ad_status", false] }, 1, 0] // Count documents where status is false
                            }
                        }
                    }
                }
            ])
            return res.status(200).json(response)
        } catch (error) {
            console.log('getlistingDetails : ' + error.message)
        }
    },
    allListings: async (req, res) => {
        try {
            const seller = getUser(req.headers['authorization'].split(' ')[1])
            const projection = [
                {
                    $match: { sellerId: new mongoose.Types.ObjectId(seller.id) }
                },
                {
                    $project: {
                        featured_img: 1, title: 1, price: 1,
                        publishing_status: 1
                    }
                }
            ]
            const response = await handleAggregatePagination(productModel, projection, req.query)
            return res.status(200).json(response)
        } catch (error) {
            console.log('alllistings :' + error.message)
        }
    }
}

export default product_controller