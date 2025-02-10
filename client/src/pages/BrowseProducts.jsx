import React, { useEffect, useState, useCallback } from 'react'
import { FilterSidebar, Product, Placeholder } from '../components/component'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { DataService } from '../hooks/hooks'
import { useSelector } from 'react-redux'

const BrowseProducts = () => {
    const navigate = useNavigate()
    const sellerInfo = useSelector(state => state.seller)
    const location = useLocation()
    const [urlQueryParams, seturlQueryParams] = useSearchParams()
    const [listing, setlisting] = useState({})
    const [isloading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const [applyfilters, setFilters] = useState('')

    const browseListing = async () => {
        try {
            setlisting({}), setloading(true)
            const res = await DataService.get(`/browse-listing`)
            if (res.error) seterror(res.error), setloading(false)
            seterror(''), setlisting(res), setloading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const getfilterData = useCallback(async () => {
        try {
            seterror(''), setlisting({}), setloading(true)
            const res = await DataService.get(`/filters/listings${applyfilters}`)
            if (res.error) return seterror(res.error), setloading(false)
            seterror(''), setlisting(res), setloading(false)
        } catch (error) {
            console.error('filiters : ', error)
        }
    }, [location.key, applyfilters])

    const filterLlistingwithPagination = useCallback(async (page) => {
        try {
            seterror(''), setlisting({}), setloading(true)
            const api = location.search
                ? `/filters/listings${applyfilters}&page=${page}`
                : `/browse-listing?page=${page}`;
            const res = await DataService.get(api)

            if (res.error) return seterror(res.error), setloading(false)
            seterror(''), setlisting(res), setloading(false)
        } catch (error) {
            console.error(error)
        }
    }, [location.key, applyfilters])

    useEffect(() => {
        let filters = '?'
        const entries = urlQueryParams.entries()
        for (const [key, value] of entries) filters += `${key}=${value}&`;
        if (filters.endsWith('&')) filters = filters.slice(0, -1)
        setFilters(filters)
    }, [location.key])

    useEffect(() => {
        location.search ? getfilterData() : browseListing()
    }, [applyfilters])
    return (
        <>
            <title>Browse products</title>
            <div className="back-wrapper">
                <div className="back-wrapper-inner">
                    <div className="container pt-120 pb-120">
                        <div className="row">
                            <div className="col-md-3 d-md-block d-none">
                                <FilterSidebar />
                            </div>
                            <div className="col-md-9 back__course__area" style={{ backgroundColor: '#fff' }}>
                                <div className="row mb-50" style={{ background: '#EFF1F5' }}>
                                    <h2 className='m-0 py-3 text-center fs-2' style={{ color: '#757575' }}>Results</h2>
                                </div>
                                <div className="row">
                                    {
                                        isloading && (
                                            Array.from({ length: 9 })?.map((_, i) => (
                                                <div className="col-md-4" key={i}>
                                                    <Placeholder />
                                                </div>
                                            ))
                                        )
                                    }
                                    {
                                        error && (
                                            <div className="col-md-12">
                                                <div className="text-center">
                                                    <h2>{error}</h2>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        listing.collectionData?.map((listing, i) => (
                                            <div className="col-md-4" key={i}>
                                                <Product
                                                    id={listing._id}
                                                    title={listing.title}
                                                    price={listing.price}
                                                    slug={`/listing/${listing.slug}`}
                                                    image={`${listing.listing_img}`}
                                                    category={listing.parentcategory.title}
                                                    ad_status={listing.ad_status}
                                                    sellerImg={listing.sellerImage}
                                                    location={listing.location}
                                                    isfavourite={sellerInfo.seller?.wishlist?.includes(listing._id)}
                                                    sellerUsername={listing.sellerusername}
                                                    date={listing.date}
                                                    ad_end_date={listing.ad_end_date}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="d-flex justify-content-center mt-5">
                                    <ul className="back-pagination">
                                        {listing.prevpage && (
                                            <li className="back-next">
                                                <Link to="#" onClick={(e) => {
                                                    e.preventDefault()
                                                    filterLlistingwithPagination(listing.page - 1)
                                                }}> Previous </Link>
                                            </li>
                                        )}
                                        {
                                            listing?.totalDocs > listing?.limit && (
                                                Array.from({ length: listing.totalPages })?.map((_, i) => (
                                                    <li key={i}>
                                                        <Link to="#" className={listing.page === i + 1 ? 'bg-primary text-white' : ''}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                filterLlistingwithPagination(i + 1)
                                                            }}>{i + 1} </Link>
                                                    </li>
                                                ))
                                            )
                                        }
                                        {listing.nextpage && (
                                            <li className="back-next p-0">
                                                <Link to="#" onClick={(e) => {
                                                    e.preventDefault()
                                                    filterLlistingwithPagination(listing.page + 1)
                                                }}> Next </Link>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrowseProducts
