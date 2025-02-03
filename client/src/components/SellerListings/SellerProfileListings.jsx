import React, { useEffect, useState, useCallback } from 'react'
import { Product } from '../component'
import { Link, useParams } from 'react-router-dom'
import config from '../../../config/config'
import DataService from '../../hooks/DataService'
import GetCookie from '../../hooks/GetCookie'


const SellerProfileListings = () => {
    const { seller_username } = useParams()
    const [sellerlisting, setsellerlistingInfo] = useState({})

    const sellerDetails = useCallback(async (page) => {
        try {
            const res = await DataService.get(`/get/seller-profile/${seller_username}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${GetCookie()}`
                }
            })
            if (res.error) navigate('not-found')
            setsellerlistingInfo(res)
        } catch (error) {
            console.error('sellerDetails : ' + error)
        }
    }, [])

    useEffect(() => { sellerDetails() }, [])
    return (
        <>
            {
                sellerlisting.collectionData?.map((listing, i) => (
                    <div className="col-md-6" key={i}>
                        <Product
                            id={listing._id}
                            title={listing.title}
                            price={listing.price}
                            slug={`/listing/${listing.slug}`}
                            image={`${config.server_product_img_path}/${listing.featured_img}`}
                            category={listing.parentcategory.title}
                            ad_status={listing.ad_status}
                            sellerImg={listing.sellerImage}
                            isfavourite={listing.isWishlistItem}
                            sellerUsername={listing.sellerusername}
                        />
                    </div>
                ))
            }
            <div className="d-flex justify-content-center mt-5">
                <ul className="back-pagination">
                    {sellerlisting.prevpage && (
                        <li className="back-next">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault()
                                sellerDetails(sellerlisting.page - 1)
                            }}> Previous </Link>
                        </li>
                    )}
                    {
                        sellerlisting?.totalDocs > sellerlisting?.limit && (
                            Array.from({ length: sellerlisting.totalPages })?.map((_, i) => (
                                <li key={i}>
                                    <Link to="#"
                                        className={sellerlisting.page === i + 1 ? 'bg-primary text-white' : ''}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            sellerDetails(i + 1)
                                        }}>{i + 1} </Link>
                                </li>
                            ))
                        )
                    }
                    {sellerlisting.nextpage && (
                        <li className="back-next p-0">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault()
                                sellerDetails(sellerlisting.page + 1)
                            }}> Next </Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default React.memo(SellerProfileListings)