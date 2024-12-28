import express from 'express'
import { upload } from '../Middleware/multer.middleware.js'
import authenticationcontroller from '../controllers/authentication.controller.js'

const router = express.Router()

router.post('/register/seller', authenticationcontroller.handelSellerRegister)
router.post('/login/seller', authenticationcontroller.handleSellerLogin)

export default router