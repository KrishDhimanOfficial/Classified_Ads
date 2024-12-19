import { serverAPI, handleDeleteRequest } from './variable.js'

const datatable = document.querySelector('#table-grid')
const deletebtn = document.querySelector('#deleteobjbtn')

datatable.onclick = (e) => {
    const api = `${serverAPI}/${EndAPI}/${e.target.dataset.id}`;
    const table_row = e.target.closest('.table-row')

    if (e.target.closest('.openModal')) openDangerModal(table_row, api)
}

const openDangerModal = (table_row, api) => {
    deletebtn.onclick = () => handleDeleteRequest(table_row, api)
    return;
}