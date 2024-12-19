import {
    inputTitle, inputSlug, SubmitForm, CreateSlug,
    sendDataToServer
} from './variable.js'

'use strict'

const serverAPI = 'http://localhost:3000/admin';

inputTitle.onkeyup = () => {
    const title = inputTitle.value.trim()
    inputSlug.value = CreateSlug(title) // create slug 
}

SubmitForm.onsubmit = (e) => {
    e.preventDefault() // prevent default form submit

    const method = SubmitForm.id === 'submitFormData' ? 'POST' : 'PUT';
    const api = SubmitForm.id === 'submitFormData'
        ? `${serverAPI}/${EndAPI}`
        : `${serverAPI}/${EndAPI}/${id}`
    const formData = new FormData(e.target)
    sendDataToServer(api, method, formData) // send data to server
}