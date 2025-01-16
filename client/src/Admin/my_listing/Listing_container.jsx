import React, { useCallback, useEffect, useState } from 'react'
import { Product } from '../admin'
import { Link } from 'react-router-dom'
import DataService from '../../hooks/DataService'
import { useNavigate } from 'react-router-dom'
import GetCookie from '../../hooks/GetCookie'
import config from '../../../config/config'

const Listing_container = () => {
    const navigate = useNavigate()
    const [listings, setlisting] = useState([])

    const fetchLlisting = useCallback(async (page) => {
        const res = await DataService.post(`/products?page=${page}`, {}, {
            headers: {
                'Authorization': `Bearer ${GetCookie(navigate)}`
            }
        })
        setlisting(res)
    }, [])
    useEffect(() => { fetchLlisting() }, [])
    return (
        <>
            <div className='back-course-filter bg-white'>
                {
                    listings.collectionData?.length == 0 && (
                        <h1 className='text-center'>No Listing</h1>
                    )
                }
                {
                    listings.collectionData?.map((listing, i) => (
                        <Product key={i}
                            id={listing._id}
                            title={listing.title}
                            price={listing.price}
                            status={listing.status}
                            slug={`/listing/${listing.slug}`}
                            updatelisting={`/user/update/${listing.slug}`}
                            publishStatus={listing.publishing_status}
                            createdAt={listing.formattedDate}
                            path={`${config.server_product_img_path}/${listing.featured_img}`}
                        />
                    ))
                }
            </div >
            <div className='w-100 d-flex justify-content-center'>
                <ul className="back-pagination">
                    {listings.prevpage && (
                        <li className="back-next">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault()
                                fetchLlisting(listings.page - 1)
                            }}> Previous </Link>
                        </li>
                    )}
                    {
                        listings?.totalDocs > listings?.limit && (
                            Array.from({ length: listings.totalPages })?.map((_, i) => (
                                <li key={i}>
                                    <Link to="#" onClick={(e) => {
                                        e.preventDefault()
                                        fetchLlisting(i + 1)
                                    }}>{i + 1} </Link>
                                </li>
                            ))
                        )
                    }
                    {listings.nextpage && (
                        <li className="back-next p-0">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault()
                                fetchLlisting(listings.page + 1)
                            }}> Next </Link>
                        </li>
                    )}
                </ul>
            </div >
        </>
    )
}

export default Listing_container