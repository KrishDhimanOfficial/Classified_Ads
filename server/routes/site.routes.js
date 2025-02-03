import express from 'express'
import { upload, sellerprofileImg, product } from '../Middleware/multer.middleware.js'
import handlemulterError from '../Middleware/handleMulterError.js'
import AuthenticateUser from '../Middleware/AuthicateUser.js'
import authenticationcontroller from '../controllers/authentication.controller.js'
import location_controller from '../controllers/location.controller.js'
import seller_Controller from '../controllers/seller.controller.js'
import product_controller from '../controllers/product.controller.js'
import category_controller from '../controllers/category.controller.js'
import brand_controller from '../controllers/brand.controller.js'
const router = express.Router()


router.post('/auth/seller', AuthenticateUser, authenticationcontroller.handleSellerAuthentication)
router.post('/register/seller', authenticationcontroller.handelSellerRegister)
router.post('/login/seller', authenticationcontroller.handleSellerLogin)
router.put('/change/password', AuthenticateUser, authenticationcontroller.changeSellerPassword)

router.route('/seller/profile/:id?')
    .all(AuthenticateUser)
    .post(upload.none(), seller_Controller.getProfile)
    .put(sellerprofileImg.single('image'), seller_Controller.updateProfile)
router.put('/update/seller-wallet', seller_Controller.updateWallet)
router.post('/seller/payment-transactions', AuthenticateUser, seller_Controller.getpaymentTransactions)
router.get('/get/seller-profile/:seller_username', AuthenticateUser, seller_Controller.getSeller)

router.get('/parent-category', category_controller.getparentCategory)
router.get('/sub-category/:parentId', category_controller.getsubCategory)
router.get('/brands/:id', brand_controller.getbrands)
router.get('/popular-categories', category_controller.getPopularCategories)

router.post('/products', AuthenticateUser, product_controller.allListings)
router.get('/product/:listing_slug', AuthenticateUser, product_controller.getSingleListingtoUpdate)
router.patch('/product/update-listing-images', product_controller.updateListingImages)
router.route('/product/:id?')
    .all(AuthenticateUser)
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

router.post('/listings', AuthenticateUser, product_controller.getlistingDetails)
router.get('/single-listing/:listing_slug', product_controller.getSingleListing)
router.get('/popular-listings', product_controller.getPopularListings)
router.get('/featured-listings', product_controller.getFeaturedListings)
router.patch('/promote-listing/:id', product_controller.promoteListing)
router.patch('/update-ad-click/:id', product_controller.updateAdClick)

// Filters listings
router.get('/browse-listing', product_controller.browseListings)
router.get('/filters/listings', product_controller.handleFilteringListing)

// Reviews & Rating 
router.route('/seller-reviews/:id?')
    .post(AuthenticateUser, seller_Controller.writeSellerReview)
    .get(seller_Controller.getSellerReviews)

// Wishlist 
router.patch('/add-to-wishlist', AuthenticateUser, product_controller.add_to_wishlist)
router.get('/get-user-wishlist', AuthenticateUser, product_controller.getWishList)
router.patch('/delete-wishlist-item/:id', AuthenticateUser, product_controller.removeWishlistItem)

// Settings
router.get('/settings', authenticationcontroller.getGNSettings)

// Location
router.get('/location/states', location_controller.getlocationState)
router.get('/location/cities/:id', location_controller.getlocationCities)

// Follow & Following
router.get('/check-seller', seller_Controller.getSellerIdToNotShowFollowBtn)
router.patch('/follow/seller', AuthenticateUser, seller_Controller.startFollowing)
router.patch('/unfollow/seller', AuthenticateUser, seller_Controller.startUnFollowing)

export default router