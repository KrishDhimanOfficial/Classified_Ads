import parent_categoryModel from '../models/parent_category.model.js'
import sub_categoryModel from '../models/sub_category.model.js';
import brandModel from '../models/brand.model.js'
import validations from '../services/validateData.js'
import deleteImg from '../services/deleteImg.js';
import config from '../config/config.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId
const category_controllers = {
    createParentCategory: async (req, res) => {
        try {
            const { title, slug, status } = req.body;
            if (!title || !slug || !status) return res.json({ error: 'All Fields Are Required!' })

            const existingcategory = await parent_categoryModel.findOne({ title, slug })
            if (existingcategory) return res.json({ warning: 'Value Already Exists' })

            const response = await parent_categoryModel.create({ title, slug, status, image: req.file?.filename })
            if (!response) return res.json({ error: 'Failed to create brand' })

            return res.json({ message: 'successfully created' })
        } catch (error) {
            await deleteImg(`category_images/${req.file?.filename}`)
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('createParentCategory : ' + error.message)
        }
    },
    rendercategories: async (req, res) => {
        try {
            const categories = await parent_categoryModel.aggregate([
                {
                    $lookup: {
                        from: 'sub_categories',
                        localField: '_id',
                        foreignField: 'parentId',
                        as: 'subcategories'
                    }
                },
                {
                    $project: {
                        'subcategories.title': 0,
                        'subcategories.slug': 0,
                        'subcategories.parentId': 0,
                        'subcategories.status': 0,
                        'subcategories._id': 0
                    }
                },
                {
                    $sort: { title: -1 }
                }
            ])
            return res.render('categories/parentCategories', {
                category_img_path: config.category_img_path,
                categories
            })
        } catch (error) {
            console.log('rendercategories : ' + error.message)
        }
    },
    getSingleCategory: async (req, res) => {
        try {
            const category = await parent_categoryModel.findById({ _id: req.params.id })
            return res.render('categories/updateParentcategory', {
                category_img_path: config.category_img_path,
                category
            })
        } catch (error) {
            console.log('getSingleCategory : ' + error.message)
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { title, slug, status } = req.body;
            const response = await parent_categoryModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    title, slug, status,
                    image: req.file?.filename
                },
                { runValidators: true })
            if (req.file?.filename) await deleteImg(`category_images/${response.image}`)
            if (!response) return res.json({ error: 'Failed to update brand' })
            return res.json({ navigate: 'product/category' })
        } catch (error) {
            await deleteImg(`category_images/${req.file?.filename}`)
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('updateCategory : ' + error.message)
        }
    },
    updateCategoryStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const response = await parent_categoryModel.findByIdAndUpdate(
                { _id: req.params.id }, { status },
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('updateCategoryStatus : ' + error.message)
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const response = await parent_categoryModel.findByIdAndDelete({ _id: req.params.id })
            if (!response) return res.json({ error: 'Not Found' })
            return res.json({ message: 'Deleted successfully' })
        } catch (error) {
            console.log('deleteCategory : ' + error.message)
        }
    },
    renderADDSubCategory: async (req, res) => {
        try {
            const parentCategories = await parent_categoryModel.find({ status: true }, { title: 1, _id: 1 })
            return res.render('categories/AddSubcategory', { parentCategories })
        } catch (error) {
            console.log('renderADDSubCategory : ' + error.message)
        }
    },
    createSubCategory: async (req, res) => {
        try {
            const { title, slug, status, parentId } = req.body;
            if (!title || !slug || !status || !parentId) return res.json({ error: 'All Fields Are Required!' })

            const existingsubcategory = await sub_categoryModel.findOne({ title, slug })
            if (existingsubcategory) return res.json({ warning: 'Value Already Exists' })

            const response = await sub_categoryModel.create({
                title, slug, status,
                parentId: new Object(parentId)
            })
            if (!response) return res.json({ error: 'Failed to create brand' })

            return res.json({ message: 'successfully created' })
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('createSubCategory : ' + error.message)
        }
    },
    getSingleSubCategory: async (req, res) => {
        try {
            const parentCategories = await parent_categoryModel.find({ status: true }, { title: 1, _id: 1 })
            const category = await sub_categoryModel.findById({ _id: req.params.id })
            return res.render('categories/updateSubcategory', { category, parentCategories })
        } catch (error) {
            console.log('getSingleSubCategory : ' + error.message)
        }
    },
    renderSubCategory: async (req, res) => {
        try {
            const categories = await sub_categoryModel.find({}).sort({ title: -1 })
            return res.render('categories/subcategories', { categories })
        } catch (error) {
            console.log('renderSubCategory : ' + error.message)
        }
    },
    updateSubCategory: async (req, res) => {
        try {
            const response = await sub_categoryModel.findByIdAndUpdate(
                { _id: req.params.id }, req.body,
                { runValidators: true }
            )
            if (!response) return res.json({ error: 'Failed to update brand' })
            return res.json({ navigate: 'sub/category' })
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('updateSubCategory : ' + error.message)
        }
    },
    updateSubCategoryStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const response = await sub_categoryModel.findByIdAndUpdate(
                { _id: req.params.id }, { status },
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('updateSubCategoryStatus : ' + error.message)
        }
    },
    deleteSubCategory: async (req, res) => {
        try {
            const response = await sub_categoryModel.findByIdAndDelete({ _id: req.params.id })
            await deleteImg(`category_images/${response.image}`)
            if (!response) return res.json({ error: 'Not Found' })
            return res.json({ message: 'Deleted successfully' })
        } catch (error) {
            console.log('deleteSubCategory : ' + error.message)
        }
    },
    getparentCategory: async (req, res) => {
        try {
            const response = await parent_categoryModel.find({ status: true }, { image: 0, slug: 0, status: 0 })
            return res.status(200).json(response)
        } catch (error) {
            console.log('getparentCategory : ' + error.message)
        }
    },
    getsubCategory: async (req, res) => {
        const response = await sub_categoryModel.find({ parentId: req.params.parentId, status: true }, { image: 0, slug: 0, status: 0 })
        return res.status(200).json(response)
    },
    getPopularCategories: async (req, res) => {
        try {
            const response = await parent_categoryModel.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'parentcategoryId',
                        as: 'products'
                    }
                },
                {
                    $addFields: {
                        maximum: { $max: { $size: '$products' } },
                        category_img: {
                            $concat: [config.category_img_path, '/', '$image']
                        }
                    }
                },
                {
                    $limit: 4
                },
            ])
            return res.status(200).json(response)
        } catch (error) {
            console.log('getPopularCategories : ' + error.message)
        }
    },
    getSubCategoryonbrand: async (req, res) => {
        try {
            const response = await sub_categoryModel.find({ parentId: req.params.id, status: true }, { image: 0, slug: 0, status: 0 })
            return res.status(200).json(response)
        } catch (error) {
            console.log('getSubCategoryonbrand : ' + error.message)
        }
    }
}

export default category_controllers