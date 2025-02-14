const config = {
    severAPI: import.meta.env.VITE_SERVER_URL,
    siteURL: import.meta.env.VITE_SITE_URL,
    seller_profile_img_path: import.meta.env.VITE_SELLER_PROFILE_PATH,
    server_product_img_path: import.meta.env.VITE_PRODUCT_IMG_PATH,
    site_img_path: import.meta.env.VITE_SITE_IMAGES_PATH,
    razorpay_key: import.meta.env.VITE_RAZORPAY_ID
}
export default config;