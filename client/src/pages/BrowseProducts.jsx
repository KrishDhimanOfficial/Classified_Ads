import React, { useEffect, useState, useCallback } from 'react'
import { FilterSidebar, Product, Placeholder } from '../components/component'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import config from '../../config/config'
import DataService from '../hooks/DataService'

const BrowseProducts = () => {
    const location = useLocation()
    const [urlQueryParams, seturlQueryParams] = useSearchParams()
    const entries = urlQueryParams.entries()
    const [listing, setlisting] = useState({})
    const [isloading, setloading] = useState(false)


    let filters = '?' // fetching filters data
    for (const [key, value] of entries) filters += `${key}=${value}&`;
    if (filters.endsWith('&')) filters = filters.slice(0, -1)

    const browseListing = async () => {
        try {
            setloading(true)
            const res = await DataService.get('/browse-listing')
            setloading(false), setlisting(res)
        } catch (error) {
            console.error('browseListing : ' + error)
        }
    }

    const getfilterData = useCallback(async () => {
        try {
            setloading(true)
            const res = await DataService.get(`/filters/listings${filters}`)
            setloading(false), setlisting(res)
        } catch (error) {
            console.error('filiters : ', error)
        }
    }, [])

    const filterLlistingwithPagination = useCallback(async (page) => {
        try {
            setloading(true)
            const api = location.search ? `/filters/listings${filters}&page=${page}` : `/browse-listing?page=${page}`;
            const res = await DataService.get(api)
            setloading(false), setlisting(res)
        } catch (error) {
            console.error('fetchLlistingwithPagination : ' + error)
        }
    }, [])

    useEffect(() => { location.search ? getfilterData() : browseListing() }, [])
    return (
        <>
            <title>Browse products</title>
            <div className="back-wrapper">
                <div className="back-wrapper-inner">
                    <div className="container pt-120 pb-120">
                        <div className="row">
                            <div className="col-md-3">
                                <FilterSidebar />
                            </div>
                            <div className="col-md-9 back__course__area" style={{ backgroundColor: '#fff' }}>
                                <div className="row  mb-50" style={{ background: '#EFF1F5' }}>
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
                                        listing.collectionData?.map((listing, i) => (
                                            <div className="col-md-4" key={i}>
                                                <Product
                                                    title={listing.title}
                                                    price={listing.price}
                                                    slug={`/listing/${listing.slug}`}
                                                    image={`${config.server_product_img_path}/${listing.featured_img}`}
                                                    category={listing.parentcategory.title}
                                                    ad_status={listing.ad_status}
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
                                                        <Link to="#" onClick={(e) => {
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
