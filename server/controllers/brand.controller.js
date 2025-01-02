import config from '../config/config.js';
import brandModel from '../models/brand.model.js'
import productModel from '../models/product.model.js';
import validations from '../services/validateData.js'
import deleteImg from '../services/deleteImg.js'

const brandController = {
    createBrand: async (req, res) => {
        try {
            const { title, slug, status } = req.body;
            if (!title || !slug || !status) return res.json({ error: 'All Fields Are Required!' })

            const existingBrand = await brandModel.findOne({ title, slug })
            if (existingBrand) return res.json({ warning: 'Value Already Exists' })

            const response = await brandModel.create({ title, slug, status })
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
            const brand = await brandModel.findById({ _id: req.params.id })
            return res.render('brands/updateBrand', {
                brand_img_path: config.brand_img_path,
                brand
            })
        } catch (error) {
            console.log('getSingleBrand : ' + error.message)
        }
    },
    updateBrand: async (req, res) => {
        try {
            const { title, slug, status } = req.body;
            const response = await brandModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    title, slug, status,
                    image: req.file?.filename
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
    }
}

export default brandController