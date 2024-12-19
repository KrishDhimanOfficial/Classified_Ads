import express from 'express'
import brandController from '../controllers/brand.controller.js'
import { upload } from '../Middleware/multer.middleware.js'
const router = express.Router()

router.get('/dashboard', (req, res) => res.render('index'))
router.get('/product/category', (req, res) => res.render('categories/parentCategories'))
router.get('/sub/category', (req, res) => res.render('categories/subcategories'))
router.get('/category/add-new-category', (req, res) => res.render('categories/AddParentcategory'))
router.get('/category/add-sub-category', (req, res) => res.render('categories/AddSubcategory'))



router.get('/product/add-new-brand', (req, res) => res.render('brands/Addbrand'))
router.get('/product/brands', brandController.renderBrands)
router.route('/product/brand/:id?')
    .post(upload.none(), brandController.createBrand)
    .get(brandController.getSingleBrand)
    .put(upload.none(), brandController.updateBrand)
    .delete(brandController.deleteBrand)


export default router