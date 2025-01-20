import express from 'express'
import { upload, sellerprofileImg, product } from '../Middleware/multer.middleware.js'
import handlemulterError from '../Middleware/handleMulterError.js'
import authenticationcontroller from '../controllers/authentication.controller.js'
import seller_Controller from '../controllers/seller.controller.js'
import product_controller from '../controllers/product.controller.js'
import category_controller from '../controllers/category.controller.js'
import brand_controller from '../controllers/brand.controller.js'
const router = express.Router()


router.post('/auth/seller', authenticationcontroller.handleSellerAuthentication)
router.post('/register/seller', authenticationcontroller.handelSellerRegister)
router.post('/login/seller', authenticationcontroller.handleSellerLogin)
router.put('/change/password', authenticationcontroller.changeSellerPassword)

router.route('/seller/profile/:id?')
    .post(upload.none(), seller_Controller.getProfile)
    .put(sellerprofileImg.single('image'), seller_Controller.updateProfile)
router.put('/update/seller-wallet', seller_Controller.updateWallet)
router.post('/seller/payment-transactions', seller_Controller.getpaymentTransactions)
router.get('/get/seller-profile/:seller_username',seller_Controller.getSeller)

router.get('/parent-category', category_controller.getparentCategory)
router.get('/sub-category/:parentId', category_controller.getsubCategory)
router.get('/brands', brand_controller.getbrands)

router.post('/products', product_controller.allListings)
router.get('/product/:listing_slug', product_controller.getSingleListingtoUpdate)
router.patch('/product/update-listing-images', product_controller.updateListingImages)
router.route('/product/:id?')
    .post(product.fields(
        [
            { name: 'images', maxCount: 4 },
            { name: 'featured_img', maxCount: 1 },
        ]
    ), handlemulterError, product_controller.createProduct)
    .put(product.fields(
        [
            { name: 'images', maxCount: 4 },
            { name: 'featured_img', maxCount: 1 },
        ]
    ), handlemulterError, product_controller.updateProduct)
    .patch(product_controller.handleupdateStatus)
    .delete(product_controller.deleteProduct)

router.post('/listings', product_controller.getlistingDetails)
router.get('/single-listing/:listing_slug', product_controller.getSingleListing)

// Filters listings
router.get('/browse-listing', product_controller.browseListings)
router.get('/filters/listings', product_controller.handleFilteringListing)

// Settings
router.get('/settings', authenticationcontroller.getGNSettings)
export default router