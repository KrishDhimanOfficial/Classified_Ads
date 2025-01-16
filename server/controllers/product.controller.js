import { getUser } from "../services/createToken.js";
import productModel from "../models/product.model.js";
import deleteImage from "../services/deleteImg.js";
import mongoose from "mongoose";
import handleAggregatePagination from "../services/handlepagination.js";
import { response } from "express";

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
                                $cond: [{ $eq: ["$ad_status", true] }, 1, 0] // Count documents where status is false
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
                        publishing_status: 1, status: 1, slug: 1,
                        formattedDate: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: "$created_At"
                            }
                        }
                    }
                }
            ]
            const response = await handleAggregatePagination(productModel, projection, req.query)
            return res.status(200).json(response)
        } catch (error) {
            console.log('alllistings :' + error.message)
        }
    },
    handleupdateStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const response = await productModel.findByIdAndUpdate(
                { _id: req.params.id }, { status }, { new: true }
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('handleupdateStatus : ' + error.message)
        }
    },
    updateListingImages: async (req, res) => {
        try {
            const seller = getUser(req.headers['authorization'].split(' ')[1])
            const { images, image } = req.body;
            const listedImages = images.map(img => img.split('/')[5])
            const newimages = listedImages.filter(img => img != image.split('/')[5])

            const response = await productModel.findOneAndUpdate(
                { sellerId: new mongoose.Types.ObjectId(seller.id) },
                { images: listedImages.filter(img => img != image.split('/')[5]) },
                { new: true }
            )

            if (!response) return res.json({ error: 'unable to update!' })
            await deleteImage(`product_images/${image.split('/')[5]}`)
            return res.json({ message: 'Image Deleted' })
        } catch (error) {
            console.log('updateListingImages : ' + error.message)
        }
    },
    getSingleListing: async (req, res) => {
        try {
            const seller = getUser(req.headers['authorization'].split(' ')[1])
            const response = await productModel.aggregate([
                {
                    $match: {
                        sellerId: new mongoose.Types.ObjectId(seller.id),
                        slug: req.params.listing_slug
                    }
                },
                {
                    $lookup: {
                        from: 'brands',
                        localField: 'brandId',
                        foreignField: '_id',
                        as: 'brand'
                    }
                }, { $unwind: '$brand' },
                {
                    $lookup: {
                        from: 'parent_categories',
                        localField: 'parentcategoryId',
                        foreignField: '_id',
                        as: 'parent_category'
                    }
                }, { $unwind: '$parent_category' },
                {
                    $lookup: {
                        from: 'sub_categories',
                        localField: 'subcategoryId',
                        foreignField: '_id',
                        as: 'sub_category'
                    }
                }, { $unwind: '$sub_category' },
                {
                    $project: {
                        ad_status: 0,
                        created_At: 0,
                        click_count: 0,
                        sellerId: 0,
                        brandId: 0,
                        parentcategoryId: 0,
                        subcategoryId: 0,
                        publishing_status: 0,
                        'brand.slug': 0,
                        'brand.status': 0,
                        'brand.image': 0,
                        'parent_category.slug': 0,
                        'parent_category.status': 0,
                        'parent_category.image': 0,
                        'sub_category.slug': 0,
                        'sub_category.status': 0,
                        'sub_category.image': 0,
                    }
                }
            ])
            if (response.length === 0) return res.json({ error: 'Not Found!' })
            return res.json(response[0])
        } catch (error) {
            console.log('getSingleListing : ' + error.message)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const existingRecored = await productModel.findById({ _id: req.params.id })
            if (g) return res.json({ error: 'Please select aleast one image!' })

            const { slug, status } = req.body;
            const { title, description, parentcategoryId, subcategoryId, brandId,
                price, negotiable, condition, attributes } = JSON.parse(req.body.data)

            const seller = getUser(req.headers['authorization'].split(' ')[1])

            const response = await productModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    title, description, slug, price, negotiable,
                    condition, features: attributes, status,
                    sellerId: new Object(seller.id),
                    parentcategoryId: parentcategoryId
                        ? new Object(parentcategoryId.value)
                        : existingRecored.parentcategoryId,
                    subcategoryId: subcategoryId
                        ? new Object(subcategoryId.value)
                        : existingRecored.subcategoryId,
                    brandId: brandId
                        ? new Object(brandId.value)
                        : existingRecored.brandId,
                    featured_img: req.files['featured_img']
                        ? req.files['featured_img'][0].filename
                        : existingRecored.featured_img,
                    images: req.files['images']
                        ? [
                            ...existingRecored.images,
                            ...req.files['images']?.map(file => file.filename)
                        ]
                        : existingRecored.images
                },
                { runValidators: true }
            )
            if (!response) return res.json({ error: 'unable to update!' })
            if (req.files['featured_img']) deleteImage(`product_images/${response.featured_img}`)
            return res.json({ message: 'updated successfully!' })
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            if (req.files['featured_img']) await deleteImage(`product_images/${req.files['featured_img'][0].filename}`)
            if (req.files['images']) req.files['images']?.map(async file => await deleteImage(`product_images/${file.filename}`))
            console.log('updateProduct : ' + error.message)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const response = await productModel.findByIdAndDelete({ _id: req.params.id }, { new: true })
            if (!response) return res.json({ error: 'Not Found!' })

            await deleteImage(`product_images/${response.featured_img}`)
            response.images.map(async img => await deleteImage(`product_images/${img}`))
            return res.status(200).json({ message: 'delete successfully!' })
        } catch (error) {
            console.log('deleteProduct : ' + error.message)
        }
    }
}

export default product_controller