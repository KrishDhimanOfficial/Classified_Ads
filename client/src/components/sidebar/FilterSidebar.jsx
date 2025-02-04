import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Input, BTN } from '../component'
import Select from 'react-select'
import DataService from '../../hooks/DataService'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const FilterSidebar = () => {
    const cityRef = useRef()
    const navigate = useNavigate()
    const [pcategory, setpcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [brands, setbrands] = useState([])
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const [selectedState, setSelectedState] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)

    const { handleSubmit, setValue, control, register } = useForm()

    const fetchCategorie = useCallback(async () => {
        setsubcategory([])
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

    const getlocation = () => {
        const Filtercity = JSON.parse(localStorage.getItem('filtercity'))
        const Filterstate = JSON.parse(localStorage.getItem('filterstate'))
        let filters = '?';

        if (Filterstate) {
            filters += `stateId=${Filterstate.value}&`;
            setSelectedState(Filterstate), setValue('stateId', Filterstate.value)
            if (filters.endsWith('&')) filters = filters.slice(0, -1)
            navigate(`/browse-products${filters}`)
        }
        if (Filtercity) {
            filters += `cityId=${Filtercity.value}&`;
            setSelectedCity(Filtercity), setValue('cityId', Filtercity.value)
            if (filters.endsWith('&')) filters = filters.slice(0, -1)
            navigate(`/browse-products${filters}`)
        }
        if (Filterstate && Filtercity) {
            if (filters.endsWith('&')) filters = filters.slice(0, -1)
            navigate(`/browse-products${filters}`)
        }
    }

    const getfilterData = useCallback(async (formData) => {
        try {
            let filters = '?'
            if (!formData.stateId) localStorage.setItem('filterstate', JSON.stringify(''))
            if (!formData.cityId) localStorage.setItem('filtercity', JSON.stringify(''))

            Object.entries(formData).forEach(([key, value]) => {
                if (typeof value === 'object' && value) filters += `${key}=${value.value.trim()}&`;
                if (typeof value !== 'object' && value) filters += `${key}=${value.trim()}&`;
            })
            if (filters.endsWith('&')) filters = filters.slice(0, -1)
            navigate(`/browse-products${filters}`)
        } catch (error) {
            console.error('filiters : ', error)
        }
    }, [])

    const handleStateIdChange = (selectedoption) => {
        setSelectedState(selectedoption), setSelectedCity(null)
        fetchCities(selectedoption.value)
        setValue('stateId', selectedoption.value)
        localStorage.setItem('filtercity', JSON.stringify(''))
        localStorage.setItem('filterstate', JSON.stringify(selectedoption))
    }

    const handleCityIdChange = (selectedoption) => {
        setValue('cityId', selectedoption.value)
        setSelectedCity(selectedoption)
        localStorage.setItem('filtercity', JSON.stringify(selectedoption))
    }

    useEffect(() => { fetchCategorie(), fetchState(), getlocation() }, [])
    return (
        <div className='back-sidebar pl-30 md-pl-0 md-mt-60'>
            <div className="widget back-search">
                <form>
                    <Input type={'text'} placeholder={'Filiters'} readOnly />
                </form>
            </div>
            <form onSubmit={handleSubmit(getfilterData)} autoComplete='off'>
                <div className="widget back-category px-4">
                    <h3 className="widget-title">Search</h3>
                    <Input
                        {...register('search')}
                        type={'text'}
                        className='px-2 py-3'
                        placeholder={'Search for An Item'}
                    />
                </div>
                <div className="widget back-category px-4">
                    <h3 className="widget-title">Select Location</h3>
                    <div className='mb-3'>
                        <Controller
                            name='stateId' // Name of the field
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    isRtl={false}
                                    options={states}
                                    value={selectedState}
                                    onChange={(selectedoption) => handleStateIdChange(selectedoption)}
                                />
                            )}
                        />
                    </div>
                    <div className='mb-3'>
                        <Controller
                            name='cityId' // Name of the field
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    isRtl={false}
                                    options={cities}
                                    value={selectedCity}
                                    onFocus={() => fetchCities(selectedState.value)}
                                    onChange={(selectedoption) => handleCityIdChange(selectedoption)}
                                />
                            )}
                        />
                    </div>
                </div>
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
                    <h3 className="widget-title">Types</h3>
                    <ul className="recent-category">
                        <li>
                            <Input
                                {...register('featured')}
                                type={"checkbox"}
                                value={true}
                                id={"features"}
                            />
                            <label htmlFor={"features"}>Featured</label>
                        </li>
                        <li>
                            <Input
                                {...register('listed')}
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
                                        fetchBrand(selectedoption.value)
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
                                    onChange={(selectedoption) => { fetchBrand(selectedoption.value) }}
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

export default React.memo(FilterSidebar)