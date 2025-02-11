import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { Image, Input, Submit } from '../component'
import Select from 'react-select'
import DataService from '../../hooks/DataService'
import { useForm, Controller } from 'react-hook-form'
import bannerIMG from '../../assets/images/banner1.webp'
import { TypeAnimation } from 'react-type-animation'

const Banner = () => {
    const navigate = useNavigate()
    const [states, setstates] = useState([])
    const [cities, setcities] = useState([])
    const [selectedState, setSelectedState] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)


    const { handleSubmit, control, register } = useForm()

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

    // Reset City when State changes
    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption)
        setSelectedCity(null) // Reset City to empty
    }

    const filterData = (formdata) => {
        let filiters = '?'
        if (formdata.search) filiters += `search=${formdata.search}`

        if (!formdata.stateId) localStorage.setItem('filterstate', JSON.stringify(''))
        else filiters += `stateId=${formdata.stateId.value}`;
        if (!formdata.cityId) localStorage.setItem('filtercity', JSON.stringify(''))
        else filiters += `cityId=${formdata.cityId.value}`;

        navigate(`/browse-products${filiters}`)
    }

    useEffect(() => { fetchState() }, [])
    return (
        <div className="home-banner-part">
            <div className="banner-img">
                <Image className="desktop img-fluid w-100" src={bannerIMG} alt="Banner Image" />
            </div>
            <div className="container">
                <div className="banner-content start-50 translate-middle w-75">
                    <div className="back-sec-title">
                        <TypeAnimation
                            preRenderFirstString={true}
                            sequence={[
                                500,
                                'Are You Looking For I-Phones ?',
                                1000,
                                'Are You Looking For Cars ?',
                                1000,
                                'Are You Looking For Tools ?',
                                1000,
                                'Are You Looking For Furniture ?',
                                500,
                            ]}
                            speed={50}
                            className='banner-title d-block text-center text-white'
                            repeat={Infinity}
                        />
                        <form onSubmit={handleSubmit(filterData)} autoComplete='off'>
                            <div className="d-flex gap-2 mb-3">
                                <div className='flex-grow-1'>
                                    <Input
                                        {...register('search')}
                                        type="text"
                                        placeholder="Search for a property"
                                        className="form-control"
                                    />
                                </div>
                                <div className='flex-grow-1'>
                                    <Controller
                                        name={'stateId'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isSearchable
                                                isRtl={false}
                                                placeholder='Select State'
                                                options={states}
                                                value={selectedState}
                                                onChange={(selectedoption) => {
                                                    handleStateChange(selectedoption)
                                                    localStorage.setItem('filtercity', JSON.stringify(''))
                                                    localStorage.setItem('filterstate', JSON.stringify(selectedoption))
                                                    field.onChange(selectedoption)
                                                    fetchCities(selectedoption.value)
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className='flex-grow-1'>
                                    <Controller
                                        name={'cityId'} // Name of the field
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                isSearchable
                                                isRtl={false}
                                                placeholder='Select City'
                                                value={selectedCity}
                                                options={selectedState ? cities : []}
                                                onChange={(selectedoption) => {
                                                    setSelectedCity(selectedoption)
                                                    field.onChange(selectedoption)
                                                    localStorage.setItem('filtercity', JSON.stringify(selectedoption))
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Submit
                                    text='Search'
                                    className="back-btn"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Banner)
