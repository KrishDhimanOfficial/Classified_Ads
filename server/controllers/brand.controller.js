import config from '../config/config.js';
import brandModel from '../models/brand.model.js'
import validations from '../services/validateData.js'
import deleteImg from '../services/deleteImg.js'
import parent_categoryModel from '../models/parent_category.model.js';
import mongoose from 'mongoose';

const brandController = {
    renderAddBrand: async (req, res) => {
        try {
            const parentCategories = await parent_categoryModel.find({ status: true }, { _id: 1, title: 1 })
            return res.render('brands/Addbrand', { parentCategories })
        } catch (error) {
            console.log('renderAddBrand : ' + error.message)
        }
    },
    createBrand: async (req, res) => {
        try {
            const { title, slug, status, parent_categoryId, sub_categoryId } = req.body;
            if (!title || !slug || !status) return res.json({ error: 'All Fields Are Required!' })

            const existingBrand = await brandModel.findOne({ title, slug })
            if (existingBrand) return res.json({ warning: 'Value Already Exists' })

            const response = await brandModel.create({ title, slug, status, parent_categoryId, sub_categoryId, image: req.file?.filename })
            if (!response) return res.json({ error: 'Failed to create brand' })

            return res.json({ message: 'successfully created' })
        } catch (error) {
            await deleteImg(`brands_images/${req.file?.filename}`)
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('createBrand : ' + error.message)
        }
    },
    renderBrands: async (req, res) => {
        try {
            const brands = await brandModel.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'brandId',
                        as: 'products'
                    }
                },
                {
                    $project: {
                        title: 1,
                        slug: 1,
                        image: 1,
                        status: 1,
                        'products.__v': 1,
                    }
                },
                {
                    $sort: { title: -1 }
                }
            ])
            return res.render('brands/brands', {
                brand_img_path: config.brand_img_path,
                brands
            })
        } catch (error) {
            console.log('renderBrands : ' + error.message)
        }
    },
    getSingleBrand: async (req, res) => {
        try {
            const parentCategories = await parent_categoryModel.find({ status: true }, { _id: 1, title: 1 })
            const response = await brandModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(req.params.id),
                        status: true
                    }
                },
                {
                    $lookup: {
                        from: 'parent_categories',
                        localField: 'parent_categoryId',
                        foreignField: '_id',
                        as: 'parent_category'
                    }
                },
                {
                    $unwind: '$parent_category',
                },
                {
                    $lookup: {
                        from: 'sub_categories',
                        localField: 'sub_categoryId',
                        foreignField: '_id',
                        as: 'sub_category'
                    }
                },
                {
                    $unwind: '$sub_category',
                },
                {
                    $match: {
                        'sub_category.status': true,
                        'parent_category.status': true
                    }
                },
                {
                    $project: {
                        'sub_category.status': 0,
                        'sub_category.slug': 0,
                        'sub_category.parentId': 0,
                        'parent_category.status': 0,
                        'parent_category.slug': 0,
                        'parent_category.image': 0
                    }
                },
            ])
            return res.render('brands/updateBrand', {
                parentCategories,
                brand_img_path: config.brand_img_path,
                brand: response[0]
            })
        } catch (error) {
            console.log('getSingleBrand : ' + error.message)
        }
    },
    updateBrand: async (req, res) => {
        try {
            const { title, slug, status, parent_categoryId, sub_categoryId } = req.body;
            const response = await brandModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    title, slug, status,
                    image: req.file?.filename,
                    parent_categoryId, sub_categoryId
                },
                { runValidators: true }
            )

            if (req.file?.filename) await deleteImg(`brands_images/${response.image}`)
            if (!response) return res.json({ error: 'Failed to update brand' })
            return res.json({ message: 'update successfully' })
        } catch (error) {
            await deleteImg(`brands_images/${req.file?.filename}`)
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('updateBrand : ' + error.message)
        }
    },
    updateBrandStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const response = await brandModel.findByIdAndUpdate(
                { _id: req.params.id }, { status },
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('updateBrandStatus : ' + error.message)
        }
    },
    deleteBrand: async (req, res) => {
        try {
            const response = await brandModel.findByIdAndDelete({ _id: req.params.id })
            await deleteImg(`brands_images/${response.image}`)
            if (!response) return res.json({ error: 'Not Found' })
            return res.json({ message: 'Deleted successfully' })
        } catch (error) {
            console.log('deleteBrand : ' + error.message)
        }
    },
    getbrands: async (req, res) => {
        const response = await brandModel.find({ status: true }, { image: 0, slug: 0, status: 0 })
        return res.status(200).json(response)
    }
}

export default brandController