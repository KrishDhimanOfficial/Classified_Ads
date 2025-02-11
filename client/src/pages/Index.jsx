import React, { useState, useEffect } from 'react'
import { Banner, Category, Product, Sec_Heading } from '../components/component'
import { Link } from 'react-router-dom'
import DataService from '../hooks/DataService'
import { motion } from "motion/react"

const Index = () => {
    const [categories, setcategories] = useState([])
    const [listings, setlistings] = useState([])
    const [featuredListings, setfeaturedListings] = useState([])

    const fetchcategories = async () => {
        try {
            const res = await DataService.get('/popular-categories')
            setcategories(res)
        } catch (error) {
            console.error('fetchcategories : ' + error)
        }
    }
    const fetchfeaturedListings = async () => {
        try {
            const res = await DataService.get('/featured-listings')
            setfeaturedListings(res)
        } catch (error) {
            console.error('fetchfeaturedListings : ' + error)
        }
    }
    const fetchproducts = async () => {
        try {
            const res = await DataService.get('/popular-listings')
            setlistings(res)
        } catch (error) {
            console.log('fetchproducts : ' + error)
        }
    }
    useEffect(() => { fetchcategories(), fetchproducts(), fetchfeaturedListings() }, [])
    return (
        <>
            <title>Home</title>
            <div className="back-wrapper">
                <div className="back-wrapper-inner">
                    <Banner />
                    <div className="back_popular_topics pt-120 pb-120">
                        <div className="container">
                            <Sec_Heading title={'Browse Categories'} subtitle={'Popular Category to Browse'} />
                            <div className="row">
                                {
                                    categories?.map((category, i) => (
                                        category.maximum > 0 && (
                                            <div className="col-md-3" key={i}>
                                                <Category
                                                    category={category.title}
                                                    listedProduct={`${category.maximum} Listed Product`}
                                                    imgpath={category.category_img}
                                                />
                                            </div>
                                        )
                                    ))
                                }
                            </div>
                        </div>
                        <div className="text-center pt-20">
                            <Link to="/browse-products" className="back-btn-border">Browse more Category</Link>
                        </div>
                    </div>
                    <div className="back__course__area  pt-120 pb-90">
                        <div className="container">
                            <Sec_Heading title={"Check Out What's New"} subtitle={'Featured ads'} />
                            <div className="row">
                                {
                                    featuredListings?.map((listing, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, translateY: 100 }}
                                            whileInView={{ opacity: 1, translateY: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className="col-md-3" key={i}>
                                            <Product
                                                id={listing._id}
                                                title={listing.title}
                                                price={listing.price}
                                                slug={`/listing/${listing.slug}`}
                                                image={listing.listing_img}
                                                category={listing.category.title}
                                                ad_status={listing.ad_status}
                                                sellerImg={listing.sellerImg}
                                                location={listing.location}
                                                sellerUsername={listing.seller.username}
                                            />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="back__course__area  pt-120 pb-90">
                        <div className="container">
                            <Sec_Heading title={'Browse Products'} subtitle={'Browse More Products'} />
                            <div className="row">
                                {
                                    listings?.map((listing, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, translateY: 100 }}
                                            whileInView={{ opacity: 1, translateY: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            className="col-md-3" key={i}>
                                            <Product
                                                id={listing._id}
                                                title={listing.title}
                                                price={listing.price}
                                                slug={`/listing/${listing.slug}`}
                                                image={listing.listing_img}
                                                category={listing.category.title}
                                                ad_status={listing.ad_status}
                                                sellerImg={listing.sellerImg}
                                                location={listing.location}
                                                sellerUsername={listing.seller.username}
                                            />
                                        </motion.div>
                                    ))
                                }
                            </div>
                            <div className="text-center pt-20">
                                <Link to="/browse-products" className="back-btn-border">
                                    Browse more Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index