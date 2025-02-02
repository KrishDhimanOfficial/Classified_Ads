import express from 'express'
import brandController from '../controllers/brand.controller.js'
import { upload, brand, category, GN } from '../Middleware/multer.middleware.js'
import handlemulterError from '../Middleware/handleMulterError.js'
import category_controllers from '../controllers/category.controller.js'
import authenticationcontroller from '../controllers/authentication.controller.js'
import seller_controllers from '../controllers/seller.controller.js'
import { checkAdminIsLogged, checkToken } from '../Middleware/CheckAdminAuthentication.js'
import product_controller from '../controllers/product.controller.js'
import locationControllers from '../controllers/location.controller.js'
const router = express.Router()

// Routes for Super Admin
router.get('/dashboard', checkAdminIsLogged, authenticationcontroller.RenderIndexPage)

// Routes for SuperAdmin Authentication
router.route('/login')
    .all(checkToken)
    .get((req, res) => res.render('login'))
    .post(upload.none(), authenticationcontroller.handleSuperAdminLogin)
router.get('/logout', authenticationcontroller.handleSuperAdminLogout)

//  Routes for product Brands
router.get('/product/add-new-brand', checkAdminIsLogged, brandController.renderAddBrand)
router.get('/product/brands', checkAdminIsLogged, brandController.renderBrands)
router.route('/product/brand/:id?')
    .post(brand.single('image'), handlemulterError, brandController.createBrand)
    .get(brandController.getSingleBrand)
    .put(brand.single('image'), handlemulterError, brandController.updateBrand)
    .patch(brandController.updateBrandStatus)
    .delete(brandController.deleteBrand)


// Routes for product Categories
router.get('/category/add-new-category', checkAdminIsLogged, (req, res) => res.render('categories/AddParentcategory'))
router.get('/product/category', checkAdminIsLogged, category_controllers.rendercategories)
router.route('/product/category/:id?')
    .post(category.single('image'), handlemulterError, category_controllers.createParentCategory)
    .get(category_controllers.getSingleCategory)
    .put(category.single('image'), handlemulterError, category_controllers.updateCategory)
    .patch(category_controllers.updateCategoryStatus)
    .delete(category_controllers.deleteCategory)

// Routes for Location (State)
router.get('/location/states', checkAdminIsLogged, locationControllers.renderStates)
router.route('/location/state/:id?')
    .post(upload.none(), handlemulterError, locationControllers.createState)
    .get(locationControllers.getSingleState)
    .put(upload.none(), locationControllers.updateState)
    .patch(locationControllers.updateStateStatus)
    .delete(locationControllers.deleteState)

// Routes for Location (Cities)
router.get('/location/cities', checkAdminIsLogged, locationControllers.renderCities)
router.route('/location/city/:id?')
    .post(upload.none(), handlemulterError, locationControllers.createCity)
    .get(locationControllers.getSingleCity)
    .put(upload.none(), locationControllers.updateCity)
    .patch(locationControllers.updateCityStatus)
    .delete(locationControllers.deleteCity)

// Routes for product Sub-Categories
router.get('/sub-category/:id', checkAdminIsLogged, category_controllers.getSubCategoryonbrand)
router.get('/sub/category', checkAdminIsLogged, category_controllers.renderSubCategory)
router.get('/category/add-sub-category', checkAdminIsLogged, category_controllers.renderADDSubCategory)
router.route('/product/sub-category/:id?')
    .post(upload.none(), category_controllers.createSubCategory)
    .get(category_controllers.getSingleSubCategory)
    .put(upload.none(), category_controllers.updateSubCategory)
    .patch(category_controllers.updateSubCategoryStatus)
    .delete(category_controllers.deleteSubCategory)

// product listings
router.get('/product/listings', checkAdminIsLogged, product_controller.renderSellersListingOnAdminPanel)
router.get('/product/deactivated-listings', product_controller.renderAllDeActiveListingOnAdminPanel)
router.route('/listing/:id?')
    .get(product_controller.getSingleListingOnAdminPanel)
    .patch(product_controller.handleupdatePusblishStatus)


// Routes for Sellers
router.get('/all-sellers', checkAdminIsLogged, seller_controllers.renderAllSellers)
router.get('/deactivated-sellers', checkAdminIsLogged, seller_controllers.renderAllDeactivated_Sellers)
router.route('/seller/:id?')
    .patch(seller_controllers.updateSellerStatus)

// General-Settings
router.get('/general-settings', checkAdminIsLogged, authenticationcontroller.renderGN)
router.post('/change-password', upload.none(), authenticationcontroller.changeDashboardPassword)
router.put('/general-setting/:id', GN.fields([
    { name: 'logo', maxCount: 1 },
]), handlemulterError, authenticationcontroller.General_Settings)
router.post('/setFeaturedAdPrice/:id', authenticationcontroller.setFeaturedAdPrice)

// Transactions
router.get('/transactions', checkAdminIsLogged, authenticationcontroller.renderAllTransactions)

router.get('/*', (req, res) => res.render('404'))

export default router