import React, { useEffect, useState, useCallback } from 'react'
import { Add_Atrribute } from '../admin'
import { Input, Button, SelectBox, TextArea, Image } from '../../components/component'
import * as yup from 'yup'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DataService from '../../hooks/DataService'

const productSchema = yup.object().shape({
    title: yup.string().trim().required('Title is required!').matches(/^[a-zA-Z0-9\s]+$/, 'Title contains only characters,numbers!'),
    price: yup.number().required('price is required!'),
    description: yup.string().trim().required('Description is required!').matches(/^[a-zA-Z0-9\s]+$/, 'Description contains only characters,numbers!'),
    brandId: yup.string().trim().required('Required!').matches(/^[a-zA-Z0-9]+$/, 'Invalid Brand Name!'),
    parentcategoryId: yup.string().trim().required('Required!').matches(/^[a-zA-Z0-9]+$/, 'Invalid Parent Category Name!'),
    subcategoryId: yup.string().trim().required('Required!').matches(/^[a-zA-Z0-9]+$/, 'Invalid Subcategory Name!'),
    attributes: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Required!'),   
            value: yup.string().required('Required!'),
        })
    ).max(10, 'Attribute create limit exceded!'),
})

const AddProduct = () => {
    const [priceInput, setPriceInput] = useState(0)
    const [productImg, setproductImg] = useState([])
    const [featuredImg, setfeaturedImg] = useState('#')
    const [slug, setSlug] = useState('')
    const [pcategory, setpcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [brands, setbrands] = useState([])

    const { handleSubmit, control, register, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(productSchema)
    })
    const attributeLength = watch('attributes')
    const { fields, append, remove } = useFieldArray({ control, name: 'attributes' })

    const displayImgs = (e) => {
        const file = e.target.files;
        setproductImg(Array.from(file).map(img => URL.createObjectURL(img)))
    }
    const displayFImgs = (e) => {
        const file = e.target.files[0]
        setfeaturedImg(URL.createObjectURL(file))
    }
    const createSlug = (str) => {
        return str.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and')
            .replace(/[^\w-]+/, '-')
    }

    const fetchCategorie = useCallback(async () => {
        const res = await DataService.get('/parent-category')
        const category = res.map(item => ({ value: item._id, label: item.title }))
        setpcategory(category)
    }, [])

    const fetchsubCategorie = useCallback(async (id) => {
        const res = await DataService.get(`/sub-category/${id}`)
        const category = res.map(item => ({ value: item._id, label: item.title }))
        setsubcategory(category)
    }, [])

    const fetchBrand = async () => {
        const res = await DataService.get('/brands')
        const brands = res.map(item => ({ value: item._id, label: item.title }))
        setbrands(brands)
    }

    const createProduct = async (formData) => {
        console.log(formData)
        const res = await DataService.post('/product', formData)
    }

    useEffect(() => { fetchCategorie(), fetchBrand() }, [])
    return (
        <div className="back-login-page">
            <div className="login-right-form pt-0 px-0">
                <form onSubmit={handleSubmit(createProduct)} autoComplete='off' encType="multipart/form-data">
                    <div className="row">
                        <div className="col-md-7">
                            <div className='bg-light p-3 mb-3'>
                                <label className='mb-2'>Item Name</label>
                                <Input
                                    type={'text'}
                                    {...register('title')}
                                    style={{ border: errors.title?.message ? '1px solid red' : '' }}
                                    onChange={(e) => setSlug(createSlug(e.target.value))}
                                    placeholder={'Enter item name'}
                                />
                                <Input
                                    type={'text'} value={slug}
                                    {...register('slug')}
                                    hidden
                                />
                                <span className='mt-2 d-block text-primary'>{slug}</span>
                                <span className='fs-6 text-danger m-0 mt-1'>{errors.title?.message}</span>
                            </div>
                            <div className='bg-light p-3 mb-3'>
                                <div className='mb-3'>
                                    <label className='mb-2'>Parent Category</label>
                                    <SelectBox
                                        options={pcategory}
                                        name={'parent_category'}
                                        {...register('parentcategoryId')}
                                        onChange={(selectedoption) => { fetchsubCategorie(selectedoption.value) }}
                                    />
                                </div>
                                <div>
                                    <label className='mb-2'>Sub Category</label>
                                    <SelectBox
                                        options={subcategory}
                                        name={'sub_category'}
                                        {...register('subcategoryId')}
                                    />
                                </div>
                            </div>
                            <div className='bg-light p-3 mb-3'>
                                <div className='mb-3'>
                                    <label className='mb-2'>Brand</label>
                                    <SelectBox
                                        options={brands}
                                        name={'brand'}
                                        {...register('brandId')}
                                    />
                                </div>
                            </div>
                            <div className='bg-light p-3 mb-3'>
                                <div className='mb-3'>
                                    <label className='mb-2'>Description</label>
                                    <TextArea
                                        className={'form-control'}
                                        placeholder={'Enter description'}
                                        style={{ height: '150px', border: errors.description?.message ? '1px solid red' : '' }}
                                        {...register('description')}
                                    />
                                    <span className='fs-6 text-danger m-0 mt-1'>{errors.description?.message}</span>
                                </div>
                            </div>
                            <div className="form-section">
                                <h5>Attributes</h5>
                                {
                                    fields.map((field, i) => (
                                        <Add_Atrribute
                                            key={field.id}
                                            index={i}
                                            closebtn={true}
                                            register={register}
                                            errors={errors}
                                            remove={() => remove(i)} // Pass a function to remove the field
                                        />
                                    ))
                                }
                                {
                                    attributeLength?.length < 10 && (
                                        <Button
                                            type={'button'}
                                            icon={<i className="fas fa-plus me-2"></i>}
                                            text={'Add More'}
                                            onClick={() => append({ name: '', value: '' })}
                                            className={"add-more-btn"}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="bg-light mb-3 rounded-5 p-3">
                                <div className='mb-3'>
                                    <label className='mb-2'>Price</label>
                                    <Input
                                        type={'number'}
                                        value={priceInput}
                                        {...register('price')}
                                        placeholder={'Enter item price'}
                                        style={{ border: errors.price?.message ? '1px solid red' : '' }}
                                        onChange={(e) => e.target.value < 0 ? setPriceInput(0) : setPriceInput(e.target.value)}
                                    />
                                    <span className='fs-6 text-danger m-0 mt-1'>{errors.pricer?.message}</span>
                                </div>
                                <div className='d-flex gap-2'>
                                    <label>Negotiable</label>
                                    <Input
                                        type={'checkbox'}
                                        className={'w-25'}
                                        {...register('negotiable')}
                                    />
                                </div>
                            </div>
                            <div className='bg-light p-3 mb-3'>
                                <label className='mb-2'>Condtion</label>
                                <div className="d-flex gap-3">
                                    <label id='used' className='w-25'>Used
                                        <Input
                                            htmlFor={'used'}
                                            type={'radio'}
                                            className={'w-25'}
                                            value={'used'}
                                            {...register('condition')}
                                        />
                                    </label>
                                    <label id='new' className='w-25'>new
                                        <Input
                                            htmlFor={'new'}
                                            type={'radio'}
                                            className={'w-25'}
                                            value={'new'}
                                            {...register('condition')}
                                        />
                                    </label>
                                </div>
                            </div>
                            <label id='featured' className="upload-container mb-3">
                                <Image src={featuredImg} className={'mb-0 featuredImg'} />
                                <h5>
                                    Click to browse &amp; Upload Freatured Image
                                </h5>
                                <p>
                                    image format: jpg,jpeg,png,webp
                                </p>
                                <p>
                                    recommended size 810x450
                                </p>
                                <Input
                                    type={'file'}
                                    onChange={(e) => { displayFImgs(e), register('featured_img').onChange(e) }}
                                    max={1}
                                    accept={'images/*'}
                                    htmlFor={'featured'}
                                    hidden
                                />
                            </label>
                            <label id='images' className="upload-container mb-3">
                                <div className='d-flex flex-wrap justify-content-between gap-2 mb-3'>
                                    {
                                        productImg.map((img, i) => (
                                            <div key={i}>
                                                <Button
                                                    type={'button'}
                                                    onClick={(e) => setproductImg(productImg.filter(img => img !== e.target.dataset.id))}
                                                    icon={<i data-id={img} className="fas fa-close"></i>}
                                                    className={"remove-btn float-end"}
                                                />
                                                <Image
                                                    src={`${img}`}
                                                    className={'mb-0 featuredImg'}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                                <h5>
                                    Click to browse &amp; Upload Product Image
                                </h5>
                                <p>
                                    image format: jpg,jpeg,png,webp
                                </p>
                                <p>
                                    recommended size 810x450
                                </p>
                                <Input
                                    type={'file'}
                                    onChange={(e) => { displayImgs(e), register('images').onChange(e) }}
                                    multiple max={4} accept={'images/*'} htmlFor={'images'} hidden
                                />
                            </label>
                            <Button
                                type={"submit"}
                                text={'Continue'}
                                id={"button"}
                            />
                        </div>
                    </div>
                </form >
            </div>
        </div>
    )
}

export default AddProduct