import React from 'react'
import { Button, Input } from '../component'

const FilterSidebar = () => {
    return (
        <div className='back-sidebar pl-30 md-pl-0 md-mt-60'>
            <div className="widget back-search">
                <form>
                    <Input type={'text'} placeholder={'search...'} />
                    <button type={'submit'}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </form>
            </div>
            <div className="widget back-category  px-4">
                <h3 className="widget-title">Condition</h3>
                <ul className="recent-category">
                    <li>
                        <Input type={"checkbox"} id="used" />
                        <label htmlFor="used">Used</label>
                    </li>
                    <li>
                        <Input type={"checkbox"} id="new" />
                        <label htmlFor="new">New</label>
                    </li>
                </ul>
            </div>
            <div className="widget back-category px-4">
                <h3 className="widget-title">Price</h3>
            </div>
            <div className="widget back-category px-4">
                <h3 className="widget-title">Types</h3>
                <ul className="recent-category">
                    <li>
                        <Input type={"checkbox"} id="features" />
                        <label htmlFor="features">Featured</label>
                    </li>
                    <li>
                        <Input type={"checkbox"} id="listed" />
                        <label htmlFor="listed">Listed</label>
                    </li>
                </ul>
            </div>
            <div className="widget back-category px-4">
                <h3 className="widget-title">Select Category</h3>
                <select name="" className='form-select mb-3'>
                    <option disabled>Select Category</option>
                    <option>helo</option>
                </select>
                <select name="" className='form-select'>
                    <option disabled>Select Sub Category</option>
                    <option>helo</option>
                </select>
            </div>
            <div className="widget back-category px-4 py-4 d-flex justify-content-center">
                <Button type='submit' text='Apply Filters' className={'btn btn-primary'} />
            </div>
        </div>
    )
}

export default FilterSidebar
