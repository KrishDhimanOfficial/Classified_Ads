import React, { lazy, Suspense, useEffect, useState } from 'react'
import DataService from '../../hooks/DataService'
import GetCookie from '../../hooks/GetCookie'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Placeholder } from '../../components/component'
import { setWishListVisible } from '../../../controller/seller.store'

const Product = lazy(() => import('../../components/product/Product'))

const My_Wishlist = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [wishlist, setwishlist] = useState({})
    const [isloading, setloading] = useState(false)
    const seller = useSelector(state => state.seller)

    const fetchWishList = async (page) => {
        try {
            setloading(true)
            const res = await DataService.get(`/get-user-wishlist?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${GetCookie(navigate)}`
                }
            })
            Notify(res)
            setloading(false), setwishlist(res), dispatch(setWishListVisible(false))
        } catch (error) {
            setloading(false)
            console.error('fetchWishList : ', error)
        }
    }
    useEffect(() => { fetchWishList() }, [seller.wishListVisible])
    return (
        <div className='back-course-filter bg-white'>
            {
                wishlist.collectionData?.length == 0 && (
                    <h1 className='text-center'>No Favourties Ads</h1>
                )
            }
            <div className="container back__course__area bg-white">
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
                        wishlist.collectionData?.map((listing, i) => (
                            <div className="col-md-4" key={i}>
                                <Product
                                    id={listing._id}
                                    title={listing.title}
                                    price={listing.price}
                                    slug={`/listing/${listing.slug}`}
                                    image={`${listing.img}`}
                                    wishlist={true}
                                    category={listing.category.title}
                                    ad_status={listing.ad_status}
                                    sellerImg={listing.seller_Img}
                                    sellerUsername={listing.seller.username}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-100 d-flex justify-content-center'>
                <ul className="back-pagination">
                    {wishlist.prevpage && (
                        <li className="back-next">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault(), fetchWishList(wishlist.page - 1)
                            }}> Previous </Link>
                        </li>
                    )}
                    {
                        wishlist?.totalDocs > wishlist?.limit && (
                            Array.from({ length: wishlist.totalPages })?.map((_, i) => (
                                <li key={i}>
                                    <Link to="#"
                                        className={wishlist.page === i + 1 ? 'bg-primary text-white' : ''}
                                        onClick={(e) => {
                                            e.preventDefault(), fetchWishList(i + 1)
                                        }}>{i + 1} </Link>
                                </li>
                            ))
                        )
                    }
                    {wishlist.nextpage && (
                        <li className="back-next p-0">
                            <Link to="#" onClick={(e) => {
                                e.preventDefault(), fetchWishList(wishlist.page + 1)
                            }}> Next </Link>
                        </li>
                    )}
                </ul>
            </div >
        </div>
    )
}

export default My_Wishlist