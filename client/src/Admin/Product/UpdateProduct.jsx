import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Input, BTN, TextArea, Image, } from '../../components/component'
import { Add_Atrribute } from '../admin'
import Select from 'react-select'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DataService from '../../hooks/DataService'
import Notify from '../../hooks/Notify'
import config from '../../../config/config'
import GetCookie from '../../hooks/GetCookie'

const productSchema = yup.object().shape({
    title: yup.string().trim().required('Title is required!')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Title contains only characters,numbers!'),
    price: yup.number('Input must be a number'),
    description: yup.string().trim().required('Description is required!')
        .max(300, 'Maximum 300 Characters are allowed!'),
    condition: yup.string().required('Required!'),
    attributes: yup.array().of(
        yup.object().shape({
            name: yup.string().trim().required('Required!'),
            value: yup.string().trim().required('Required!'),
        })
    ).max(10, 'Attribute create limit exceded!'),
    featured_img: yup.mixed().required('Upload Featured Image!'),
})


const UpdateProduct = () => {
    const { listing_slug } = useParams()
    const navigate = useNavigate()
    const [listing, setlisting] = useState({})
    const [priceInput, setPriceInput] = useState(0)
    const [productImg, setproductImg] = useState([])
    const [featuredImg, setfeaturedImg] = useState('#')
    const [status, setstatus] = useState(true)
    const [negotiable, setnegotiable] = useState(false)
    const [showAddMoreButton, setShowAddMoreButton] = useState(true)
    const [slug, setSlug] = useState(listing.slug)
    const [pcategory, setpcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [brands, setbrands] = useState([])
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const [location, setlocation] = useState({ state: { value: '', label: '' }, city: { value: '', label: '' } })
    // ALL States

    const { handleSubmit, control, register, watch, setValue, formState: {
        errors, isSubmitting, } } = useForm({ resolver: yupResolver(productSchema) })

    const attributeLength = watch('attributes')
    const { fields, append, remove } = useFieldArray({ control, name: 'attributes' })

    const displayImgs = (e) => {
        const file = e.target.files;
        const newimges = Array.from(file).slice(0, 4 - listing.images.length).map(img => URL.createObjectURL(img))
        setproductImg(prev => ([...prev, ...newimges]))
    }

    const displayFImgs = (e) => {
        const file = e.target.files[0]
        setfeaturedImg(URL.createObjectURL(file))
    }

    const createSlug = (str) => {
        return str.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/[^\w-]+/, '-')
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

    const fetchBrand = useCallback(async (id) => {
        const res = await DataService.get(`/brands/${id}`)
        const brands = res.map(item => ({ value: item._id, label: item.title }))
        setbrands(brands)
    }, [])

    const fetchState = useCallback(async () => {
        const res = await DataService.get(`/location/states`)
        const states = res.map(item => ({ value: item._id, label: item.name }))
        setstates(states)
    }, [])

    const fetchCities = useCallback(async (id) => {
        const res = await DataService.get(`/location/cities/${id}`)
        const cities = res.map(item => ({ value: item._id, label: item.name }))
        setcities(cities)
    }, [])

    const updateLisingImages = useCallback(async (images, image) => {
        try {
            const res = await DataService.patch('/product/update-listing-images', { images, image }, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            Notify(res)
        } catch (error) {
            console.error('updateLisingImages : ' + error)
        }
    }, [])

    const updateListing = async (data) => {
        try {
            const formData = new FormData()
            formData.append('featured_img', data.featured_img[0])
            Array.from(data.images).forEach((image) => formData.append('images', image))
            formData.append('slug', slug)
            formData.append('status', status)
            formData.append('data', JSON.stringify(data))

            const res = await DataService.put(`/product/${listing._id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            Notify(res)
        } catch (error) {
            console.error('updateListing : ', error)
        }
    }

    const getlisting = async () => {
        try {
            const res = await DataService.get(`/product/${listing_slug}`, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            Notify(res), setlisting(res)
            setValue('title', res.title)
            setValue('condition', res.condition)
            setValue('attributes', res.features)
            setValue('description', res.description)
            setSlug(res.slug)
            setPriceInput(res.price)
            setnegotiable(res.negotiable)
            setfeaturedImg(`${config.server_product_img_path}/${res.featured_img}`)
            setproductImg(res.images?.map(img => `${config.server_product_img_path}/${img}`))
        } catch (error) {
            console.error('getlisting : ', error)
        }
    }
    useEffect(() => { getlisting(), fetchCategorie(), fetchState() }, [])
    return (
        <div className="back-login-page">
            <div className="login-right-form pt-0 px-0">
                <form onSubmit={handleSubmit(updateListing)} autoComplete='off' encType="multipart/form-data">
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
                                        name={'parentcategoryId'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                isRtl={false}
                                                options={pcategory}
                                                value={{ value: listing.parent_category?._id, label: listing.parent_category?.title }}
                                                onChange={(selectedoption) => {
                                                    field.onChange(selectedoption)
                                                    fetchsubCategorie(selectedoption.value)
                                                    fetchBrand(selectedoption.value)
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
                                        name={'subcategoryId'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                isRtl={false}
                                                options={subcategory}
                                                value={{ value: listing.sub_category?._id, label: listing.sub_category?.title }}
                                                onChange={(selectedoption) => {
                                                    field.onChange(selectedoption)
                                                    fetchBrand(selectedoption.value)
                                                }}
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
                                        name={'brandId'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                isRtl={false}
                                                options={brands}
                                                value={{
                                                    value: listing.brand?._id,
                                                    label: listing.brand?.title
                                                }}
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
                                    showAddMoreButton && (
                                        <BTN
                                            type={'button'}
                                            icon={<i className="fas fa-plus me-2"></i>}
                                            text={'Add More'}
                                            onClick={() => {
                                                append({ name: '', value: '' })
                                                setShowAddMoreButton(attributeLength?.length < 10)
                                            }}
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
                                        checked={negotiable}
                                        style={{ width: '10%' }}
                                        onClick={() => setnegotiable(!negotiable)}
                                        {...register('negotiable')}
                                    />
                                    <label>Negotiable</label>
                                </div>
                            </div>
                            <div className='bg-light p-3 mb-3'>
                                <div className='mb-3'>
                                    <label className='mb-2'>Select State</label>
                                    <Controller
                                        name={'stateId'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                isRtl={false}
                                                value={{
                                                    value: location.state.value ? location.state.value : listing.state?._id,
                                                    label: location.state.label ? location.state.label : listing.state?.name
                                                }}
                                                options={states}
                                                onChange={(selectedoption) => {
                                                    setlocation(prev => ({ ...prev, state: selectedoption }))
                                                    localStorage.setItem('state', JSON.stringify(selectedoption))
                                                    field.onChange(selectedoption)
                                                    fetchCities(selectedoption.value)
                                                }}
                                                styles={{
                                                    control: (style) => ({
                                                        ...style,
                                                        border: errors.stateId?.message ? '1px solid red' : ''
                                                    })
                                                }}
                                            />
                                        )}
                                    />
                                    <span className='fs-6 text-danger m-0 mt-2'>{errors.stateId?.message}</span>
                                </div>
                                <div>
                                    <label className='mb-2'>Select city</label>
                                    <Controller
                                        name={'cityId'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                isRtl={false}
                                                value={{
                                                    value: location.city.value ? location.city.value : listing.city?._id,
                                                    label: location.city.label ? location.city.label : listing.city?.name
                                                }}
                                                options={cities}
                                                onFocus={() => {
                                                    const state = JSON.parse(localStorage.getItem('state'))
                                                    fetchCities(state.value)
                                                }}
                                                onChange={(selectedoption) => {
                                                    setlocation(prev => ({ ...prev, city: selectedoption }))
                                                    localStorage.setItem('city', JSON.stringify(selectedoption))
                                                    field.onChange(selectedoption)
                                                }}
                                                styles={{
                                                    control: (style) => ({
                                                        ...style,
                                                        border: errors.cityId?.message ? '1px solid red' : ''
                                                    })
                                                }}
                                            />
                                        )}
                                    />
                                    <span className='fs-6 text-danger m-0 mt-2'>{errors.cityId?.message}</span>
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
                                    Click to browse &amp; Upload Featured Image
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
                                    onChange={(e) => { displayFImgs(e), register('featured_img').onChange(e) }}
                                    hidden
                                />
                            </label>
                            <label id='images' htmlFor='input-images' className="upload-container mb-3">
                                <div className='d-flex flex-wrap justify-content-between gap-2 mb-3'>
                                    {
                                        productImg?.map((img, i) => (
                                            <div key={i}>
                                                <BTN
                                                    type={'button'}
                                                    onMouseDown={(e) => {
                                                        setproductImg(productImg.filter(img => img !== e.target.dataset.id))
                                                        updateLisingImages(productImg, img)
                                                    }}
                                                    icon={<i data-id={img} className="fas fa-close"></i>}
                                                    className={"remove-btn float-end"}
                                                />
                                                <Image
                                                    src={img}
                                                    className={'mb-0 featuredImg'}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                                <h5>
                                    Click to browse &amp; Upload Product Others Image
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
                                    id={'input-images'}
                                    type={'file'} accept={'images/*'}
                                    {...register('images')}
                                    onChange={(e) => { displayImgs(e), register('images').onChange(e) }}
                                    hidden
                                    multiple
                                />
                            </label>
                            {
                                listing.status && (
                                    <BTN
                                        disbaled={isSubmitting.toString()}
                                        type={"submit"}
                                        text={'Draft'}
                                        id={"button"}
                                        onClick={() => setstatus(false)}
                                        className={'mb-3'}
                                    />
                                )
                            }
                            <BTN
                                disbaled={isSubmitting.toString()}
                                type={"submit"}
                                text={'update'}
                                onClick={() => setstatus(true)}
                                id={"button"}
                            />
                        </div>
                    </div>
                </form >
            </div>
        </div>
    )
}

export default UpdateProduct