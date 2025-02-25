const config = {
    port: process.env.PORT || 3000,
    mongodb_LINK: process.env.MONGODB_LINK || 'mongodb+srv://krrishdhiman841:Krish870@cluster0.w4lf3.mongodb.net/classified_Ads?retryWrites=true&w=majority&appName=Cluster0',
    private_key: process.env.PRIVATE_KEY || '[a{@870}%0${(*5A&^&!)(90)}p][018uer@!843]',
    brand_img_path: process.env.BRAND_IMG_PATH,
    category_img_path: process.env.CATEGORY_IMG_PATH,
    product_img_path: process.env.PRODUCT_IMG_PATH,
    site_img_path: process.env.SITE_IMAGES_PATH,
    sellerImage: process.env.SELLER_IMAGES_PATH,
}

export default config