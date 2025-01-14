import { json } from "express";
import productModel from "../models/product.model.js";

const product_controller = {
    createProduct: async (req, res) => {
        try {
            // console.log(JSON.parse(req.body.data));
            // console.log(req.body);
            if (!req.files['featured_img']) return res.json({ error: 'please select featured image' })
            if (!req.files['images']) return res.json({ error: 'please select images' })

            const { slug } = req.body;
            const { title, description, parentcategoryId, subcategoryId, brandId,
                price, negotiable, condition, attributes } = JSON.parse(req.body.data)

            const response = await productModel.create({
                title, description, slug, price, negotiable,
                condition, features: attributes,
                featured_img: req.files['featured_img'][0].filename,
                images: req.files['images'].map(file => file.filename),
                parentcategoryId: new Object(parentcategoryId.value),
                subcategoryId: new Object(subcategoryId.value),
                brandId: new Object(brandId.value)
            })

            if (!response) return res.json({ error: 'failed!' })
            return res.json({ message: 'Created Succesfully!' })
        } catch (error) {
            console.log('createProduct : ' + error.message)
        }
    }
}

export default product_controller