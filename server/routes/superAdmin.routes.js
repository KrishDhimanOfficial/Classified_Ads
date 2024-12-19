import express from 'express'
import brandController from '../controllers/brand.controller.js'
const router = express.Router()

router.get('/dashboard', (req, res) => res.render('index'))
router.get('/product/category', (req, res) => res.render('categories/parentCategories'))
router.get('/sub/category', (req, res) => res.render('categories/subcategories'))
router.get('/category/add-new-category', (req, res) => res.render('categories/AddParentcategory'))
router.get('/category/add-sub-category', (req, res) => res.render('categories/AddSubcategory'))



router.get('/product/add-new-brand', (req, res) => res.render('brands/Addbrand'))
router.get('/product/brands', (req, res) => res.render('brands/brands'))
router.route('/api/brand/:id?')
    .post(brandController.createBrand)

export default router