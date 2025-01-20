import React from 'react'
import { Banner, Category, Counter, Product, Sec_Heading } from '../components/component'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <>
            <title>Home</title>
            <div className="back-wrapper">
                <div className="back-wrapper-inner">
                    <Banner />
                    <div className="back_popular_topics pt-120 pb-120">
                        <div className="container">
                            <Sec_Heading
                                title={'Browse Categories'}
                                subtitle={'Popular Category to Browse'}
                            />
                            <div className="row">
                                <div className="col-md-3">
                                    <Category
                                        category={'Mobile'}
                                        listedProduct={'1000+ Listed Product'}
                                        imgpath={''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center pt-20">
                            <Link to="/browse-products" className="back-btn-border">Browse more Category</Link>
                        </div>
                    </div>
                    <div className="back__course__area  pt-120 pb-90">
                        <div className="container">
                            <Sec_Heading
                                title={'Favorite Ads'}
                                subtitle={'Popular Ads To Browse'}
                            />
                            <div className="row">
                                <div className="col-md-3">
                                    <Product ad_status={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container pt-120 pb-90">
                        <div className="row">
                            <div className="col-md-4 d-flex justify-content-center">
                                <Counter count={100} text={'Verified Sellers'} />
                            </div>
                            <div className="col-md-4 d-flex justify-content-center">
                                <Counter count={100} text={'Listed Product'} />
                            </div>
                            <div className="col-md-4 d-flex justify-content-center">
                                <Counter count={100} text={'Listed Categories'} />
                            </div>
                        </div>
                    </div>
                    <div className="back__course__area  pt-120 pb-90">
                        <div className="container">
                            <Sec_Heading
                                title={'Browse Products'}
                                subtitle={'Browse More Products'}
                            />
                            <div className="row">
                                <div className="col-md-3">
                                    <Product />
                                </div>
                                <div className="col-md-3">
                                    <Product />
                                </div>
                                <div className="col-md-3">
                                    <Product />
                                </div>
                                <div className="col-md-3">
                                    <Product />
                                </div>
                                <div className="col-md-3">
                                    <Product />
                                </div>
                                <div className="col-md-3">
                                    <Product />
                                </div>
                                <div className="col-md-3">
                                    <Product />
                                </div>
                                <div className="col-md-3">
                                    <Product />
                                </div>
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