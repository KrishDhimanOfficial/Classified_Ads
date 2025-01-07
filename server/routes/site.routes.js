import express from 'express'
import { upload, sellerprofileImg } from '../Middleware/multer.middleware.js'
import authenticationcontroller from '../controllers/authentication.controller.js'
import seller_Controller from '../controllers/seller.controller.js'

const router = express.Router()


router.post('/auth/seller', authenticationcontroller.handleSellerAuthentication)
router.post('/register/seller', authenticationcontroller.handelSellerRegister)
router.post('/login/seller', authenticationcontroller.handleSellerLogin)

router.route('/seller/profile/:id?')
    .post(upload.none(), seller_Controller.getProfile)
    .put(sellerprofileImg.single('image'), seller_Controller.updateProfile)

export default router