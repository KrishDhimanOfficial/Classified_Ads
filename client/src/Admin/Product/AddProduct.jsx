import React, { useEffect, useState, useCallback } from 'react'
import { Add_Atrribute } from '../admin'
import { Input, Button, SelectBox, TextArea, Image } from '../../components/component'
import * as yup from 'yup'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DataService from '../../hooks/DataService'
import Select from 'react-select'
import GetCookie from '../../hooks/GetCookie'
import { useNavigate } from 'react-router-dom'
import Notify from '../../hooks/Notify'

const productSchema = yup.object().shape({
    // title: yup.string().trim().required('Title is required!').matches(/^[a-zA-Z0-9\s]+$/, 'Title contains only characters,numbers!'),
    // price: yup.number().required('price is required!'),
    // description: yup.string().trim().required('Description is required!').matches(/^[a-zA-Z0-9\s]+$/, 'Description contains only characters,numbers!'),
    // condition: yup.string().required('Required!'),
    // attributes: yup.array().of(
    //     yup.object().shape({
    //         name: yup.string().required('Required!'),
    //         value: yup.string().required('Required!'),
    //     })
    // ).max(10, 'Attribute create limit exceded!')
    // brandId: yup.string().trim().required('Required!').matches(/^[a-z0-9]+$/, 'Invalid Brand Name!'),
    // parentcategoryId: yup.string().trim().required('Required!').matches(/^[a-z0-9]+$/, 'Invalid Parent Category Name!'),
    // subcategoryId: yup.string().trim().required('Required!').matches(/^[a-z0-9]+$/, 'Invalid Subcategory Name!'),
    // featured_img: yup.mixed().required('Upload Featured Image!'),
})

const AddProduct = () => {
    const navigate = useNavigate()
    const [priceInput, setPriceInput] = useState(0)
    const [productImg, setproductImg] = useState([])
    const [featuredImg, setfeaturedImg] = useState('#')
    const [slug, setSlug] = useState('')
    const [pcategory, setpcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [brands, setbrands] = useState([])

    const { handleSubmit, control, register, reset, watch, formState: { errors, isSubmitting } } = useForm(
        { resolver: yupResolver(productSchema) }
    )
    const attributeLength = watch('attributes')
    const { fields, append, remove } = useFieldArray({ control, name: 'attributes' })

    const displayImgs = (e) => {
        const file = e.target.files;
        setproductImg(Array.from(file).slice(0, 4).map(img => URL.createObjectURL(img)))
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

    const fetchBrand = useCallback(async () => {
        const res = await DataService.get('/brands')
        const brands = res.map(item => ({ value: item._id, label: item.title }))
        setbrands(brands)
    }, [])

    const createProduct = async (data) => {
        console.log(data);

        const formData = new FormData()
        formData.append('featured_img', data.featured_img[0])
        formData.append(`images`, data.images)
        Object.entries(data).forEach(([key, value]) => formData.append(key, value))

        Array.from(data.images).map((image, i) => {
            formData.append(`image_${i}`, image);
        })
        const res = await DataService.post('/product', formData, data, {
            headers: {
                'Authorization': `Bearer ${GetCookie(navigate)}`
            }
        })
        reset()
        console.log(res)
        Notify(res)
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
                                <span className='mt-2 d-block text-primary'>{slug}</span>
                                <span className='fs-6 text-danger m-0 mt-1'>{errors.title?.message}</span>
                            </div>
                            <div className='bg-light p-3 mb-3'>
                                <div className='mb-3'>
                                    <label className='mb-2'>Parent Category</label>
                                    <Controller
                                        name={'parent_category'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                isRtl={false}
                                                options={pcategory}
                                                onChange={(selectedoption) => {
                                                    field.onChange(selectedoption)
                                                    fetchsubCategorie(selectedoption.value)
                                                }}
                                                styles={{
                                                    control: (style) => ({
                                                        ...style,
                                                        border: errors.parentcategoryId?.message ? '1px solid red' : ''
                                                    })
                                                }}
                                            />
                                        )}
                                    />
                                    <span className='fs-6 text-danger m-0 mt-2'>{errors.parentcategoryId?.message}</span>
                                </div>
                                <div>
                                    <label className='mb-2'>Sub Category</label>
                                    <Controller
                                        name={'sub_category'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                isRtl={false}
                                                options={subcategory}
                                                onChange={(selectedoption) => field.onChange(selectedoption)}
                                                styles={{
                                                    control: (style) => ({
                                                        ...style,
                                                        border: errors.subcategoryId?.message ? '1px solid red' : ''
                                                    })
                                                }}
                                            />
                                        )}
                                    />
                                    <span className='fs-6 text-danger m-0 mt-2'>{errors.subcategoryId?.message}</span>
                                </div>
                            </div>
                            <div className='bg-light p-3 mb-3'>
                                <div className='mb-3'>
                                    <label className='mb-2'>Brand</label>
                                    <Controller
                                        name={'brand'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                isRtl={false}
                                                options={brands}
                                                onChange={(selectedoption) => field.onChange(selectedoption)}
                                                styles={{
                                                    control: (style) => ({
                                                        ...style,
                                                        border: errors.brandId?.message ? '1px solid red' : ''
                                                    })
                                                }}
                                            />
                                        )}
                                    />
                                    <span className='fs-6 text-danger m-0 mt-2'>{errors.brandId?.message}</span>
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
                                    <span className='fs-6 text-danger m-0 mt-1'>{errors.price?.message}</span>
                                </div>
                                <div className='d-flex gap-2'>
                                    <Input
                                        type={'checkbox'}
                                        style={{ width: '10%' }}
                                        {...register('negotiable')}
                                    />
                                    <label>Negotiable</label>
                                </div>
                            </div>
                            <div className='bg-light p-3 mb-3'>
                                <label className='mb-2'>Condtion</label>
                                <div className="d-flex gap-3">
                                    <label id='used' className='w-25'>
                                        <Input
                                            type={'radio'}
                                            htmlFor={'used'}
                                            className={'w-25'}
                                            value={'used'}
                                            {...register('condition')}
                                        />
                                        Used
                                    </label>
                                    <label id='new' className='w-25'>
                                        <Input
                                            type={'radio'}
                                            htmlFor={'new'}
                                            className={'w-25'}
                                            value={'new'}
                                            {...register('condition')}
                                        />
                                        New
                                    </label>
                                </div>
                                <span className='fs-6 text-danger m-0 mt-1'>{errors.condition?.message}</span>
                            </div>
                            <label id='featured' className="upload-container mb-3">
                                <Image src={featuredImg} className={'mb-2 featuredImg'} />
                                <h5>
                                    Click to browse &amp; Upload Freatured Image
                                </h5>
                                <p>
                                    image format: jpg,jpeg,png,webp
                                </p>
                                <p>
                                    recommended size 810x450
                                </p>
                                <span className='fs-6 text-danger m-0 mt-1'>{errors.featured_img?.message}</span>
                                <Input
                                    type={'file'} accept={'images/*'} htmlFor={'featured'}
                                    {...register('featured_img')}
                                    onChange={(e) => {
                                        displayFImgs(e)
                                        register('featured_img').onChange(e)
                                    }}
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
                                <p>
                                    upload  maximun 4 images
                                </p>
                                <span className='fs-6 text-danger m-0 mt-1'>{errors.images?.message}</span>
                                <Input
                                    type={'file'}
                                    multiple max={4} accept={'images/*'} htmlFor={'images'}
                                    {...register('images')}
                                    onChange={(e) => { displayImgs(e), register('images').onChange(e) }}
                                    hidden
                                />
                            </label>
                            <Button
                                disbaled={isSubmitting.toString()}
                                type={"submit"}
                                text={isSubmitting ? 'Loading...' : 'Draft'}
                                id={"button"}
                                className={'mb-3'}
                            />
                            <Button
                                disbaled={isSubmitting.toString()}
                                type={"submit"}
                                text={isSubmitting ? 'Loading...' : 'Continue'}
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