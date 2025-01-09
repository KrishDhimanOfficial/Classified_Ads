import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Add_Atrribute } from '../admin'
import { Input, Button, SelectBox, TextArea, Image } from '../../components/component'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DataService from '../../hooks/DataService'

const productSchema = yup.object().shape({

})

const AddProduct = () => {
    const [priceInput, setPriceInput] = useState(0)
    const [pro_Attributes, setpro_Attributes] = useState(0)
    const [productImg, setproductImg] = useState([])
    const [featuredImg, setfeaturedImg] = useState('#')
    const [pcategory, setpcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [brands, setbrands] = useState([])

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm()

    const displayImgs = (e) => {
        const file = e.target.files;
        setproductImg(Array.from(file).map(img => URL.createObjectURL(img)))
    }
    const displayFImgs = (e) => {
        const file = e.target.files[0];
        setfeaturedImg(URL.createObjectURL(file))
    }

    const fetchCategorie = useCallback(async () => {
        const res = await DataService.get('/parent-category')
        setpcategory(res)
    })
    const fetchBrand = async () => {
        const res = await DataService.get('/brands')
        setbrands(res)
    }
    const fetchsubCategorie = async (id) => {
        const res = await DataService.get(`/sub-category/${id}`)
        setsubcategory(res)
    }

    const createProduct = async (formData) => {
        console.log(formData)
        const res = await DataService.post('/product', formData)
    }

    useEffect(() => { fetchCategorie(), fetchBrand() }, [])
    return (
        <>
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
                                        placeholder={'Enter item name'}
                                    />
                                </div>
                                <div className='bg-light p-3 mb-3'>
                                    <div className='mb-3'>
                                        <label className='mb-2'>Parent Category</label>
                                        <SelectBox
                                            options={pcategory}
                                            Defaultoption={<option disabled selected> Select An Option </option>}
                                            {...register('parentcategoryId')}
                                            className={'form-control select2bs4 w-100'}
                                            onChange={(e) => fetchsubCategorie(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className='mb-2'>Sub Category</label>
                                        <SelectBox
                                            options={subcategory}
                                            {...register('subcategoryId')}
                                            className={'form-control select2bs4 w-100'}
                                        />
                                    </div>
                                </div>
                                <div className='bg-light p-3 mb-3'>
                                    <div className='mb-3'>
                                        <label className='mb-2'>Brand</label>
                                        <SelectBox
                                            options={brands}
                                            Defaultoption={<option disabled selected> Select An Option </option>}
                                            {...register('brandId')}
                                            className={'form-control select2 w-100'}
                                        />
                                    </div>
                                </div>
                                <div className='bg-light p-3 mb-3'>
                                    <div className='mb-3'>
                                        <label className='mb-2'>Description</label>
                                        <TextArea
                                            className={'form-control'}
                                            placeholder={'Enter description'}
                                            {...register('description')}
                                        />
                                    </div>
                                </div>
                                <div className="form-section">
                                    <h5>Attributes</h5>
                                    <Add_Atrribute closebtn={false} register={register} />
                                    {
                                        Array.from({ length: pro_Attributes }).map((_, i) => (
                                            <Add_Atrribute
                                                key={i}
                                                closebtn={true}
                                                register={register(`attribute.${i}.title`)}
                                            />
                                        ))
                                    }
                                    <Button
                                        type={'button'}
                                        icon={<i className="fas fa-plus"></i>}
                                        text={'Add More'}
                                        onClick={() => setpro_Attributes(prev => prev + 1)}
                                        className={"add-more-btn"}
                                    />
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
                                            onChange={(e) => e.target.value < 0 ? setPriceInput(0) : setPriceInput(e.target.value)}
                                        />
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
                                        multiple
                                        max={4}
                                        htmlFor={'images'}
                                        hidden
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
        </>
    )
}

export default AddProduct