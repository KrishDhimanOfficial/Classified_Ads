import express from 'express'
import brandController from '../controllers/brand.controller.js'
import { upload } from '../Middleware/multer.middleware.js'
import category_controllers from '../controllers/category.controller.js'
const router = express.Router()

router.get('/dashboard', (req, res) => res.render('index'))


//  Routes for product Brands
router.get('/product/add-new-brand', (req, res) => res.render('brands/Addbrand'))
router.get('/product/brands', brandController.renderBrands)
router.route('/product/brand/:id?')
    .post(upload.none(), brandController.createBrand)
    .get(brandController.getSingleBrand)
    .put(upload.none(), brandController.updateBrand)
    .delete(brandController.deleteBrand)


// Routes for product Categories
router.get('/category/add-new-category', (req, res) => res.render('categories/AddParentcategory'))
router.get('/product/category', category_controllers.rendercategories)
router.route('/product/category/:id?')
    .post(upload.none(), category_controllers.createParentCategory)
    .get(category_controllers.getSingleCategory)
    .put(upload.none(), category_controllers.updateCategory)
    .delete(category_controllers.deleteCategory)

    
// Routes for product Sub-Categories
router.get('/sub/category', category_controllers.renderSubCategory)
router.get('/category/add-sub-category', category_controllers.renderADDSubCategory)
router.route('/product/sub-category/:id?')
    .post(upload.none(), category_controllers.createSubCategory)
    .get(category_controllers.getSingleSubCategory)
    .put(upload.none(), category_controllers.updateSubCategory)
    .delete(category_controllers.deleteSubCategory)
export default router