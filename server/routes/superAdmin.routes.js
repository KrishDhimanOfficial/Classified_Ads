import express from 'express'
import brandController from '../controllers/brand.controller.js'
import { upload } from '../Middleware/multer.middleware.js'
import category_controllers from '../controllers/category.controller.js'
import authenticationcontroller from '../controllers/authentication.controller.js'
import { checkAdminIsLogged, checkToken } from '../Middleware/CheckAdminAuthentication.js'
const router = express.Router()

// Routes for Super Admin
router.get('/dashboard', checkAdminIsLogged, (req, res) => res.render('index'))

// Routes for SuperAdmin Authentication
router.route('/login')
    .all(checkToken)
    .get((req, res) => res.render('login'))
    .post(upload.none(), authenticationcontroller.handleSuperAdminLogin)
router.get('/logout', authenticationcontroller.handleSuperAdminLogout)

//  Routes for product Brands
router.get('/product/add-new-brand', checkAdminIsLogged, (req, res) => res.render('brands/Addbrand'))
router.get('/product/brands', checkAdminIsLogged, brandController.renderBrands)
router.route('/product/brand/:id?')
    .post(upload.none(), brandController.createBrand)
    .get(brandController.getSingleBrand)
    .put(upload.none(), brandController.updateBrand)
    .patch(brandController.updateBrandStatus)
    .delete(brandController.deleteBrand)


// Routes for product Categories
router.get('/category/add-new-category', checkAdminIsLogged, (req, res) => res.render('categories/AddParentcategory'))
router.get('/product/category', checkAdminIsLogged, category_controllers.rendercategories)
router.route('/product/category/:id?')
    .post(upload.none(), category_controllers.createParentCategory)
    .get(category_controllers.getSingleCategory)
    .put(upload.none(), category_controllers.updateCategory)
    .patch(category_controllers.updateCategoryStatus)
    .delete(category_controllers.deleteCategory)


// Routes for product Sub-Categories
router.get('/sub/category', checkAdminIsLogged, category_controllers.renderSubCategory)
router.get('/category/add-sub-category', checkAdminIsLogged, category_controllers.renderADDSubCategory)
router.route('/product/sub-category/:id?')
    .post(upload.none(), category_controllers.createSubCategory)
    .get(category_controllers.getSingleSubCategory)
    .put(upload.none(), category_controllers.updateSubCategory)
    .patch(category_controllers.updateSubCategoryStatus)
    .delete(category_controllers.deleteSubCategory)

// product listings
router.get('/product/listings', checkAdminIsLogged, (req, res) => res.render('listing/listings'))

// Routes for Sellers
router.get('/all-sellers', checkAdminIsLogged, authenticationcontroller.renderAllSellers)
router.get('/deactivated-sellers', checkAdminIsLogged, authenticationcontroller.renderAllDeactivated_Sellers)

// General-Settings
router.get('/general-settings', checkAdminIsLogged, (req, res) => res.render('general-setting'))
router.post('/change-password', upload.none(), authenticationcontroller.changeDashboardPassword)

router.get('/*', (req, res) => res.render('404'))

export default router