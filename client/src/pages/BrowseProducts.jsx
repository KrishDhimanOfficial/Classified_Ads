import React from 'react'
import { FilterSidebar, Product, Placeholder } from '../components/component'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BrowseProducts = () => {
    const state = useSelector(state => state.state)
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
                                    <div className="col-md-4">
                                        <Product ad_status={true} />
                                    </div>
                                    <div className="col-md-4">
                                        <Product ad_status={true} />
                                    </div>
                                    <div className="col-md-4">
                                        <Product ad_status={true} />
                                    </div>
                                    <div className="col-md-4">
                                        <Product ad_status={true} />
                                    </div>
                                    <div className="col-md-4">
                                        <Placeholder />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-5">
                                    <ul className="back-pagination">
                                        <li className="back-next"><Link to="#">Previous<i className="arrow_carrot-right"></i></Link></li>
                                        <li><Link to="#">1</Link></li>
                                        <li><Link to="#">2</Link></li>
                                        <li><Link to="#">3</Link></li>
                                        <li className="back-next"><Link to="#">Next<i className="arrow_carrot-right"></i></Link></li>
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
