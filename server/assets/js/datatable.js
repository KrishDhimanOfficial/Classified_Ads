import { serverAPI, handleDeleteRequest, Notify } from './variable.js'

const datatable = document.querySelector('#table-grid')
const deletebtn = document.querySelector('#deleteobjbtn')
const published = document.querySelector('#published')


datatable.onclick = (e) => {
    const api = `${serverAPI}/${EndAPI}/${e.target.dataset.id}`;
    const table_row = e.target.closest('.table-row')

    if (e.target.closest('.openModal')) openDangerModal(table_row, api)
    if (e.target.closest('.status')) updatetableDataStatus(e.target.checked, api)
    if (e.target.closest('.view')) openviewModal(api)
}

const openDangerModal = (table_row, api) => {
    deletebtn.onclick = () => handleDeleteRequest(table_row, api)
    return;
}

const updatetableDataStatus = async (status, api) => {
    try {
        const response = await fetch(api, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
        if (!response.ok) toastr.error('Network Error')
        const res = await response.json()
        Notify(res)
    } catch (error) {
        console.error(error)
    }
}

const openviewModal = async (api) => {
    try {
        const res = await fetch(api, { method: 'GET' })
        const data = await res.json()
        console.log(data);
        setData(data.response)
    } catch (error) {
        console.error(error)
    }
}

const setData = (data) => {
    published.setAttribute('data-id', data._id)
    published.checked = data.publishing_status;
    document.querySelector('#listingname').innerHTML = data.title;
    document.querySelector('#name').innerHTML = data.sellerInfo.name;
    document.querySelector('#username').innerHTML = data.sellerInfo.username;
    document.querySelector('#email').innerHTML = data.sellerInfo.email;
    document.querySelector('#phone').innerHTML = data.sellerInfo.phone;
    document.querySelector('#Image').src = data.featuredImg;
}

if (published) published.onclick = (e) => {
    const api = `${serverAPI}/${EndAPI}/${e.target.dataset.id}`;
    updatetableDataStatus(e.target.checked, api)
}