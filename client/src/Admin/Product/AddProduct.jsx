import React, { useEffect, useState, useCallback } from 'react'
import { Add_Atrribute } from '../admin'
import { Input, BTN, TextArea, Image } from '../../components/component'
import * as yup from 'yup'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DataService from '../../hooks/DataService'
import Select from 'react-select'
import GetCookie from '../../hooks/GetCookie'
import { useNavigate } from 'react-router-dom'
import Notify from '../../hooks/Notify'
import config from '../../../config/config'

const productSchema = yup.object().shape({
    title: yup.string().trim().required('Title is required!')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Title contains only characters,numbers!'),
    price: yup.number().required('price is required!'),
    brandId: yup.object().required('Required!'),
    parentcategoryId: yup.object().required('Required!'),
    stateId: yup.string().required('Required!'),
    cityId: yup.string().required('Required!'),
    subcategoryId: yup.object().required('Required!'),
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

const AddProduct = () => {
    const navigate = useNavigate()
    const [priceInput, setPriceInput] = useState(0)
    const [productImg, setproductImg] = useState([])
    const [featuredImg, setfeaturedImg] = useState('#')
    const [status, setstatus] = useState(true)
    const [showAddMoreButton, setShowAddMoreButton] = useState(true)
    const [slug, setSlug] = useState('')
    const [pcategory, setpcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [brands, setbrands] = useState([])
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const [selectedState, setSelectedState] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)

    const { handleSubmit, control, setValue, register, reset, watch, formState: {
        errors, isSubmitting, } } = useForm({ resolver: yupResolver(productSchema) })

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
        return str.toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/[^\w-]+/, '-')
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

    const handleStateIdChange = (selectedoption) => {
        setSelectedState(selectedoption), setSelectedCity(null)
        fetchCities(selectedoption.value)
        setValue('stateId', selectedoption.value)
        localStorage.setItem('city', JSON.stringify(''))
        localStorage.setItem('state', JSON.stringify(selectedoption))
    }
    const handleCityIdChange = (selectedoption) => {
        setValue('cityId', selectedoption.value)
        setSelectedCity(selectedoption)
        localStorage.setItem('city', JSON.stringify(selectedoption))
    }

    const createProduct = async (data) => {
        const formData = new FormData()
        formData.append('featured_img', data.featured_img[0])
        Array.from(data.images).forEach((image) => formData.append('images', image))
        formData.append('slug', slug)
        formData.append('status', status)
        formData.append('stateId', data.stateId.value)
        formData.append('cityId', data.cityId.value)
        formData.append('data', JSON.stringify(data))

        const res = await DataService.post('/product', formData, {
            headers: {
                'Authorization': `Bearer ${GetCookie(navigate)}`
            }
        })
        reset(), Notify(res)
        if (res) setfeaturedImg([]), setproductImg([]), setSlug('')
    }

    const setLocation = () => {
        const state = JSON.parse(localStorage.getItem('state'))
        const city = JSON.parse(localStorage.getItem('city'))
        setSelectedState(state), setSelectedCity(city)
    }

    useEffect(() => { setLocation(), fetchCategorie(), fetchState() }, [])
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
                                <span className='mt-2 d-block text-primary'>{`${config.siteURL}/${slug}`}</span>
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
                                        style={{ width: '10%' }}
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
                                                value={selectedState}
                                                options={states}
                                                onChange={(selectedoption) => { handleStateIdChange(selectedoption) }}
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
                                                value={selectedCity}
                                                options={cities}
                                                onFocus={() => { fetchCities(selectedState.value) }}
                                                onChange={(selectedoption) => { handleCityIdChange(selectedoption) }}
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
                                                <BTN
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
                                    type={'file'}
                                    multiple max={4} accept={'images/*'} htmlFor={'images'}
                                    {...register('images')}
                                    onChange={(e) => { displayImgs(e), register('images').onChange(e) }}
                                    hidden
                                />
                            </label>
                            <BTN
                                disbaled={isSubmitting.toString()}
                                type={"submit"}
                                text={'Draft'}
                                id={"button"}
                                onClick={() => setstatus(false)}
                                className={'mb-3'}
                            />
                            <BTN
                                disbaled={isSubmitting.toString()}
                                type={"submit"}
                                text={'Continue'}
                                id={"button"}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct