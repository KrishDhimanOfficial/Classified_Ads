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
router.post('/seller/payment-transactions',seller_Controller.getpaymentTransactions)

router.get('/parent-category', category_controller.getparentCategory)
router.get('/sub-category/:parentId', category_controller.getsubCategory)
router.get('/brands', brand_controller.getbrands)

router.route('/product')
    .post(product.fields(
        [
            { name: 'images', maxCount: 4 },
            { name: 'featured_img', maxCount: 1 },
        ]
    ), handlemulterError, product_controller.createProduct)

export default router