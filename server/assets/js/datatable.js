import { serverAPI, handleDeleteRequest, SubmitForm, Notify } from './variable.js'

const datatable = document.querySelector('#table-grid')
const deletebtn = document.querySelector('#deleteobjbtn')
const published = document.querySelector('#published')
const loader = document.querySelector('#loader')
const planpricediscountInput = document.querySelector('#planpricediscount')
const price = document.querySelector('#planprice')
const plantitle = document.querySelector('#plantitle')
const plan_duration = document.querySelector('#planDuration')


datatable.onclick = (e) => {
    const api = `${serverAPI}/${EndAPI}/${e.target.dataset.id}`;
    const table_row = e.target.closest('.table-row')

    if (e.target.closest('.openModal')) openDangerModal(table_row, api)
    if (e.target.closest('.status')) updatetableDataStatus(e.target.checked, api)
    if (e.target.closest('.view')) openviewModal(api)
    if (e.target.closest('.openlocationModal')) fetchLocationData(api, e.target.dataset.id)
    if (e.target.closest('.openadPlanModal')) fetchSingleAdPlan(api, e.target.dataset.id)
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

const fetchLocationData = async (api, id) => {
    try {
        SubmitForm.id = 'updateFormData';
        loader.classList.remove('d-none')
        SubmitForm.setAttribute('data-id', id)

        const response = await fetch(api, { method: 'GET' })
        const data = await response.json()

        if (data.stateId) setCityData(data.name, data.state)
        else setStateData(data.name)
    } catch (error) {
        console.error(error)
    }
}

document.body.onclick = () => loader.classList.add('d-none')

const setStateData = (name) => {
    document.querySelector('#location').value = name;
    loader.classList.add('d-none')
}

const setCityData = (name, state) => {
    const selectBox = document.querySelector('#stateId').children;
    Array.from(selectBox).forEach(select => {
        if (select.value === state._id) select.Selected = true;
    })
    document.querySelector('#location').value = name;
    loader.classList.add('d-none')
}

if (planpricediscountInput) planpricediscountInput.onchange = (e) => {
    const per = price.value.trim() * e.target.value.trim() / 100;
    document.querySelector('#discountedPrice').value = Math.round(price.value - per)
}

const fetchSingleAdPlan = async (api, id) => {
    try {
        SubmitForm.id = 'updateFormData';
        loader.classList.remove('d-none')
        SubmitForm.setAttribute('data-id', id)
        const response = await fetch(api, { method: 'GET' })
        const data = await response.json()
        price.value = data.price;
        planpricediscountInput.value = data.discount;
        Array.from(plan_duration.children).forEach(item => {
            if (item.value === data.plan_duration) item.selected = true;
        })
        Array.from(plantitle.children).forEach(item => {
            if (item.value === data.title) item.selected = true;
        })
        loader.classList.add('d-none')
    } catch (error) {
        console.error(error)
    }
}