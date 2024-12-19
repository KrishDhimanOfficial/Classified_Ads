import {
    serverAPI, inputTitle, inputSlug, SubmitForm, CreateSlug,
    sendDataToServer,
} from './variable.js'

'use strict'


inputTitle.onkeyup = () => {
    const title = inputTitle.value.trim()
    inputSlug.value = CreateSlug(title) // create slug 
}

SubmitForm.onsubmit = async (e) => {
    e.preventDefault() // prevent default form submit

    const method = SubmitForm.id === 'submitFormData' ? 'POST' : 'PUT';
    const api = SubmitForm.id === 'submitFormData' ? `${serverAPI}/${EndAPI}` : `${serverAPI}/${EndAPI}/${e.target.dataset.id}`
    const formData = new FormData(e.target)


    const response = await sendDataToServer(api, method, formData) // send data to server
    if (response) e.target.reset()
}