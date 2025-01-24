import { getUser } from "../services/createToken.js";
import productModel from "../models/product.model.js";
import deleteImage from "../services/deleteImg.js";
import sellerModel from "../models/seller.model.js";
import mongoose from "mongoose";
import handleAggregatePagination from "../services/handlepagination.js";
import config from "../config/config.js";
const ObjectId = mongoose.Types.ObjectId;

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
                        featured_img: 1, title: 1, price: 1, ad_status: 1,
                        publishing_status: 1, status: 1, slug: 1, click_count: 1,
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
    getSingleListingtoUpdate: async (req, res) => {
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
    },
    renderSellersListingOnAdminPanel: async (req, res) => {
        try {
            const response = await productModel.aggregate([
                {
                    $lookup: {
                        from: 'parent_categories',
                        localField: 'parentcategoryId',
                        foreignField: '_id',
                        as: 'parentcategory'
                    }
                },
                { $unwind: '$parentcategory' },
                {
                    $lookup: {
                        from: 'sellers',
                        localField: 'sellerId',
                        foreignField: '_id',
                        as: 'sellerInfo'
                    }
                },
                { $unwind: '$sellerInfo' },
                {
                    $project: {
                        title: 1,
                        featured_img: 1,
                        'parentcategory.title': 1,
                        'sellerInfo.username': 1,
                        publishing_status: 1,
                        status: 1,
                        price: 1,
                        createdAt: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: "$created_At"
                            }
                        },
                        img_path: {
                            $concat: [`${config.product_img_path}`, '/', '$featured_img']
                        }
                    }
                },
            ])
            return res.render('listing/listings', { response })
        } catch (error) {
            console.log('renderSellersListingOnAdminPanel : ' + error.message)
        }
    },
    handleupdatePusblishStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const response = await productModel.findByIdAndUpdate(
                { _id: req.params.id }, { publishing_status: status }, { new: true }
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('handleupdatePusblishStatus : ' + error.message)
        }
    },
    renderAllDeActiveListingOnAdminPanel: async (req, res) => {
        try {
            const response = await productModel.aggregate([
                {
                    $match: {
                        publishing_status: false
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
                { $unwind: '$parentcategory' },
                {
                    $lookup: {
                        from: 'sellers',
                        localField: 'sellerId',
                        foreignField: '_id',
                        as: 'sellerInfo'
                    }
                },
                { $unwind: '$sellerInfo' },
                {
                    $project: {
                        title: 1,
                        featured_img: 1,
                        'parentcategory.title': 1,
                        'sellerInfo.username': 1,
                        publishing_status: 1,
                        status: 1,
                        price: 1,
                        createdAt: {
                            $dateToString: {
                                format: "%d-%m-%Y",
                                date: "$created_At"
                            }
                        },
                        img_path: {
                            $concat: [`${config.product_img_path}`, '/', '$featured_img']
                        }
                    }
                },
            ])
            return res.render('listing/listings', { response })
        } catch (error) {
            console.log('renderAllDeActiveListingOnAdminPanel : ' + error.message)
        }
    },
    browseListings: async (req, res) => {
        try {
            const projection = [
                {
                    $match: { status: true, publishing_status: true }
                },
                {
                    $lookup: {
                        from: 'parent_categories',
                        localField: 'parentcategoryId',
                        foreignField: '_id',
                        as: 'parentcategory'
                    }
                },
                { $unwind: '$parentcategory' },
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
                    $match: { 'seller.status': true }
                },
                {
                    $addFields: {
                        sellerImage: {
                            $concat: [`${config.sellerImage}`, '/', '$seller.image']
                        },
                        sellerusername: '$seller.username'
                    }
                },
                { $sort: { created_At: -1 } },
                {
                    $project: {
                        'parentcategory.image': 0,
                        'parentcategory.slug': 0,
                        seller: 0,
                        images: 0,
                        brandId: 0,
                        parentcategoryId: 0,
                        subcategoryId: 0,
                        sellerId: 0,
                        publishing_status: 0,
                        click_count: 0,
                        condition: 0,
                        description: 0,
                        negotiable: 0,
                        features: 0,
                        created_At: 0,
                    }
                },
            ]
            const response = await handleAggregatePagination(productModel, projection, req.query)
            if (response.collectionData.length === 0) return res.json({ error: 'No Results' })
            if (response.collectionData.length > 0) {
                setTimeout(() => res.status(200).json(response), 1500)
            }
        } catch (error) {
            console.log('browseListings : ' + error.message)
        }
    },
    handleFilteringListing: async (req, res) => {
        try {
            const { brandId, condition, parentcategoryId, subcategoryId, featured, listed } = req.query;
            const query = []

            if (condition) query.push({ condition: condition })
            if (brandId) query.push({ brandId: new ObjectId(brandId) })
            if (parentcategoryId) query.push({ parentcategoryId: new ObjectId(parentcategoryId) })
            if (subcategoryId) query.push({ subcategoryId: new ObjectId(subcategoryId) })
            if (featured && listed) {
                query.push({ $or: [{ ad_status: true }, { ad_status: false }] })
            } else {
                if (featured) query.push({ ad_status: true })
                if (listed) query.push({ ad_status: false })
            }

            const projection = [
                {
                    $match: { $and: query },
                },
                {
                    $lookup: {
                        from: 'parent_categories',
                        localField: 'parentcategoryId',
                        foreignField: '_id',
                        as: 'parentcategory'
                    }
                },
                { $unwind: '$parentcategory' },
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
                    $match: { 'seller.status': true }
                },
                {
                    $addFields: {
                        sellerImage: {
                            $concat: [`${config.sellerImage}`, '/', '$seller.image']
                        },
                        sellerusername: '$seller.username'
                    }
                },
                { $sort: { created_At: -1 } },
                {
                    $project: {
                        'parentcategory.image': 0,
                        'parentcategory.slug': 0,
                        seller: 0,
                        images: 0,
                        sellerId: 0,
                        click_count: 0,
                        description: 0,
                        negotiable: 0,
                        features: 0,
                        created_At: 0,
                    }
                },
                {
                    $match: { status: true, publishing_status: true }
                },
            ]
            const response = await handleAggregatePagination(productModel, projection, req.query)
            if (response.collectionData.length === 0) return res.json({ error: 'No Results' })
            setTimeout(() => res.status(200).json(response), 1500)
        } catch (error) {
            console.log('handleFilteringListing : ' + error.message)
        }
    },
    getSingleListing: async (req, res) => {
        try {
            const response = await productModel.aggregate([
                {
                    $match: { slug: req.params.listing_slug, status: true, publishing_status: true }
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
                    $lookup: {
                        from: 'brands',
                        localField: 'brandId',
                        foreignField: '_id',
                        as: 'brand'
                    }
                },
                { $unwind: '$brand' },
                {
                    $addFields: {
                        createdAt: {
                            $dateToString: {
                                format: "%d/%m/%Y",
                                date: "$created_At"
                            }
                        },
                        sellerImg: {
                            $concat: [`${config.sellerImage}`, '/', '$seller.image']
                        }
                    }
                },
                {
                    $project: {
                        'seller.name': 0, 'seller.status': 0, 'seller.email': 0,
                        'seller.password': 0, 'seller.wallet_amount': 0,
                        'brand.slug': 0, 'brand.status': 0, 'brand.image': 0,
                        ad_status: 0, click_count: 0, publishing_status: 0,
                        sellerId: 0, brandId: 0, created_At: 0,
                    }
                }
            ])
            if (response.length === 0) return res.json({ error: 'Not Found' })
            return res.status(200).json(response)
        } catch (error) {
            console.log('getSingleListing : ' + error.message)
        }
    },
    getPopularListings: async (req, res) => {
        try {
            const response = await productModel.aggregate([
                {
                    $match: { ad_status: false, status: true, publishing_status: true }
                },
                { $sort: { created_At: -1 } },
                { $limit: 8 },
                {
                    $lookup: {
                        from: 'parent_categories',
                        localField: 'parentcategoryId',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' },
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
                        listing_img: {
                            $concat: [config.product_img_path, '/', '$featured_img']
                        },
                        sellerImg: {
                            $concat: [config.sellerImage, '/', '$seller.image']
                        }
                    }
                },
                {
                    $project: {
                        listing_img: 1, sellerImg: 1,
                        title: 1, slug: 1,
                        price: 1,
                        ad_status: 1,
                        'seller.username': 1,
                        'category.title': 1,
                    }
                }
            ])
            return res.status(200).json(response)
        } catch (error) {
            console.log('getPopularListings : ' + error.message)
        }
    },
    getFeaturedListings: async (req, res) => {
        try {
            const response = await productModel.aggregate([
                {
                    $match: { ad_status: true, status: true, publishing_status: true }
                },
                { $sort: { created_At: -1 } },
                { $limit: 8 },
                {
                    $lookup: {
                        from: 'parent_categories',
                        localField: 'parentcategoryId',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' },
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
                        listing_img: {
                            $concat: [config.product_img_path, '/', '$featured_img']
                        },
                        sellerImg: {
                            $concat: [config.sellerImage, '/', '$seller.image']
                        }
                    }
                },
                {
                    $project: {
                        listing_img: 1, sellerImg: 1,
                        title: 1, slug: 1,
                        price: 1,
                        ad_status: 1,
                        'seller.username': 1,
                        'category.title': 1,
                    }
                }
            ])
            return res.status(200).json(response)
        } catch (error) {
            console.log('getFeaturedListings : ' + error.message)
        }
    },
    promoteListing: async (req, res) => {
        try {
            const { status } = req.body;
            const response = await productModel.findByIdAndUpdate(
                { _id: req.params.id },
                { ad_status: status },
                { new: true }
            )
            if (!response) return res.json({ error: 'unable to update!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('promoteListing : ' + error.message)
        }
    },
    updateAdClick: async (req, res) => {
        const controller = new AbortController()
        try {
            const { token } = req.body;
            const seller = getUser(token)
            
            const response = await productModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $inc: { click_count: 1 } },
                { signal: controller.signal }
            )
            
            if (seller?.id === response.sellerId.toString()) {
                await productModel.findByIdAndUpdate(
                    { _id: req.params.id },
                    { $inc: { click_count: -1 } },
                    { signal: controller.signal }
                )
            } else {
                await sellerModel.findByIdAndUpdate(
                    { _id: response.sellerId },
                    { $inc: { wallet_amount: -0.40 } }
                )
            } 

        } catch (error) {
            console.log('updateAdClick : ' + error.message)
            if (controller.signal.aborted) console.log('Request was cancelled')
            controller.abort()
        }
    }
}

export default product_controller