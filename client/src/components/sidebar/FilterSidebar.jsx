import React, { useState, useEffect, useCallback } from 'react'
import { Input, BTN } from '../component'
import Select from 'react-select'
import DataService from '../../hooks/DataService'
import { useForm, Controller } from 'react-hook-form'

const FilterSidebar = () => {
    const [pcategory, setpcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [brands, setbrands] = useState([])
    const [loading, setloading] = useState(false)

    const { handleSubmit, control, register, formState: { errors } } = useForm()


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

    const filiters = async (formData) => {
        setloading(true)
        const res = await DataService.post('/filters/listings', formData)
        console.log(res);
        setloading(false)
    }

    useEffect(() => { fetchCategorie(), fetchBrand() }, [])
    return (
        <div className='back-sidebar pl-30 md-pl-0 md-mt-60'>
            <div className="widget back-search">
                <form>
                    <Input type={'text'} placeholder={'Filiters'} readOnly />
                </form>
            </div>
            <form onSubmit={handleSubmit(filiters)} autoComplete='off'>
                <div className="widget back-category  px-4">
                    <h3 className="widget-title">Condition</h3>
                    <ul className="recent-category">
                        <li>
                            <label id='used' className='w-50'>
                                <Input
                                    type={'radio'}
                                    htmlFor={'used'}
                                    className={'w-50'}
                                    value={'used'}
                                    {...register('condition')}
                                />
                                Used
                            </label>
                        </li>
                        <li>
                            <label id='new' className='w-50'>
                                <Input
                                    type={'radio'}
                                    htmlFor={'new'}
                                    className={'w-50'}
                                    value={'new'}
                                    {...register('condition')}
                                />
                                New
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="widget back-category px-4">
                    <h3 className="widget-title">Price</h3>
                    <Input
                        {...register('price')}
                        type={"text"}
                        id="price"
                        className={'py-2'}
                        placeholder={'Enter Price'}
                    />
                </div>
                <div className="widget back-category px-4">
                    <h3 className="widget-title">Types</h3>
                    <ul className="recent-category">
                        <li>
                            <Input
                                {...register('type')}
                                type={"checkbox"}
                                value={true}
                                id={"features"}
                            />
                            <label htmlFor={"features"}>Featured</label>
                        </li>
                        <li>
                            <Input
                                {...register('type')}
                                type={"checkbox"}
                                value={false}
                                id="listed"
                            />
                            <label htmlFor="listed">Listed</label>
                        </li>
                    </ul>
                </div>
                <div className="widget back-category px-4">
                    <h3 className="widget-title">Select Category</h3>
                    <div className='mb-3'>
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
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className='mb-3'>
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
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="widget back-category px-4">
                    <h3 className="widget-title">Brand</h3>
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
                            />
                        )}
                    />
                </div>
                <div className="widget back-category d-flex justify-content-center">
                    <BTN
                        type={'submit'}
                        text={'Apply Filters'}
                        style={{ position: 'relative' }}
                        className={'btn btn-primary bg-primary rounded-3'}
                    />
                </div>
            </form>
        </div>
    )
}

export default FilterSidebar
