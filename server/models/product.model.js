import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'


const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
    },
    title: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Title is required!'],
        trim: true,
        max: [100, 'Title is too long!'],
    },
    slug: {
        type: mongoose.Schema.Types.String,
    },
    publishing_status: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    },
    ad_status: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    click_count: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    condition: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Condition is required!'],
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Description is required!'],
        trim: true,
        max: [500, 'Description is too long!'],
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
        required: true
    },
    parentcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_category',
        required: [true, 'Select Category!']
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sub_category',
        required: [true, 'Select SubCategory!']
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
    },
    featured_img: {
        type: mongoose.Schema.Types.String,
        required: [true, 'Image is required!'],
    },
    images: {
        type: [mongoose.Schema.Types.String],
        required: [true, 'Images are required!'],
        min: [1, 'Minimum 1 image is required!'],
        max: [5, 'Maximum 5 images are allowed!'],
    },
    price: {
        type: mongoose.Schema.Types.Number,

    },
    negotiable: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    },
    features: {
        type: [ // Array of objects
            {
                name: mongoose.Schema.Types.String,
                value: mongoose.Schema.Types.String,
            }
        ],
        max: [10, 'Maxinum limit reached!']
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state',
        required: [true, 'Please Select Your State!']
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required: [true, 'Please Select Your city!']
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    created_At: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    },
    ad_start_date: {
        type: mongoose.Schema.Types.Date,
        default: null
    },
    ad_end_date: {
        type: mongoose.Schema.Types.Date,
        default: null
    }
})

productSchema.plugin(aggregatePaginate)
export default mongoose.model('product', productSchema)