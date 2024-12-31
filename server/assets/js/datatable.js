import { serverAPI, handleDeleteRequest, Notify } from './variable.js'

const datatable = document.querySelector('#table-grid')
const deletebtn = document.querySelector('#deleteobjbtn')

datatable.onclick = (e) => {
    const api = `${serverAPI}/${EndAPI}/${e.target.dataset.id}`;
    const table_row = e.target.closest('.table-row')

    if (e.target.closest('.openModal')) openDangerModal(table_row, api)
    if (e.target.closest('.status')) updatetableDataStatus(e.target.checked, api)
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
        const res = await response.json()
        if (!response.ok) toastr.error('Network Error')
        Notify(res)
    } catch (error) {
        console.error(error)
    }
}