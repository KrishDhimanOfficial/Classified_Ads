import parent_categoryModel from '../models/parent_category.model.js'
import sub_categoryModel from '../models/sub_category.model.js';
import validations from '../services/validateData.js'

const category_controllers = {
    createParentCategory: async (req, res) => {
        try {
            const { title, slug, status } = req.body;
            if (!title || !slug || !status) return res.json({ error: 'All Fields Are Required!' })

            const existingcategory = await parent_categoryModel.findOne({ title, slug })
            if (existingcategory) return res.json({ warning: 'Value Already Exists' })

            const response = await parent_categoryModel.create({ title, slug, status })
            if (!response) return res.json({ error: 'Failed to create brand' })

            return res.json({ message: 'successfully created' })
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('createParentCategory : ' + error.message)
        }
    },
    rendercategories: async (req, res) => {
        try {
            const categories = await parent_categoryModel.find({})
            return res.render('categories/parentCategories', { categories })
        } catch (error) {
            console.log('rendercategories : ' + error.message)
        }
    },
    getSingleCategory: async (req, res) => {
        try {
            const category = await parent_categoryModel.findById({ _id: req.params.id })
            return res.render('categories/updateParentcategory', { category })
        } catch (error) {
            console.log('getSingleCategory : ' + error.message)
        }
    },
    updateCategory: async (req, res) => {
        try {
            const response = await parent_categoryModel.findByIdAndUpdate(
                { _id: req.params.id }, req.body,
                { runValidators: true })
            if (!response) return res.json({ error: 'Failed to update brand' })
            return res.json({ message: 'update successfully' })
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('updateCategory : ' + error.message)
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
            const categories = await sub_categoryModel.find({})
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
            return res.json({ message: 'update successfully' })
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('updateSubCategory : ' + error.message)
        }
    },
    deleteSubCategory: async (req, res) => {
        try {
            const response = await sub_categoryModel.findByIdAndDelete({ _id: req.params.id })
            if (!response) return res.json({ error: 'Not Found' })
            return res.json({ message: 'Deleted successfully' })
        } catch (error) {
            console.log('deleteSubCategory : ' + error.message)
        }
    }
}

export default category_controllers