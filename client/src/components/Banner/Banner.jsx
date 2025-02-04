import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { BTN, Image, Input } from '../component'
import Select from 'react-select'
import DataService from '../../hooks/DataService'
import { useForm, Controller } from 'react-hook-form'
import bannerIMG from '../../assets/images/banner.webp'

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
                <div className="banner-content start-50 translate-middle">
                    <div className="back-sec-title">
                        <h1 className="banner-title text-center">What are you looking for?</h1>
                        {
                            /* <p className="banner-desc text-white text-center">
                            A simple way to connect buyers and sellers, promote services, or announce opportunities.
                            </p> */
                        }
                        <form onSubmit={handleSubmit(filterData)} autoComplete='off'>
                            <div className="d-flex gap-2">
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
                                <div className='flex-grow-1'>
                                    <BTN
                                        type='submit'
                                        text='Search'
                                        className="btn btn-dark w-100 h-100"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="banner-btn text-center pt-15">
                        <Link to="/browse-products" className="back-btn">Discover More Ads</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Banner)
