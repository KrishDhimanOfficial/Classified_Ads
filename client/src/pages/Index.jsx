import React from 'react'
import { Banner, Counter, Product, Sec_Heading } from '../components/component'

const Index = () => {
    return (
        <>
            <title>Home</title>
            <div className="back-wrapper">
                <div className="back-wrapper-inner">
                    <Banner />
                    <div className="back__course__area  pt-120 pb-90">
                        <div className="container">
                            <Sec_Heading
                                title={'Favorite Ads'}
                                subtitle={'Popular Ads To Browse'}
                            />
                            <div className="row">
                                <div className="col-md-3">
                                    <Product />
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
                </div>
            </div>
        </>
    )
}

export default Index