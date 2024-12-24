import {
    serverAPI, inputTitle, inputSlug, SubmitForm, CreateSlug,
    sendDataToServer,
} from './variable.js'

'use strict'

if (inputTitle) inputTitle.onkeyup = () => {
    const title = inputTitle.value.trim()
    inputSlug.value = CreateSlug(title) // create slug 
}

if (SubmitForm) SubmitForm.onsubmit = async (e) => {
    e.preventDefault() // prevent default form submit

    const method = SubmitForm.id === 'submitFormData' ? 'POST' : 'PUT';
    const api = SubmitForm.id === 'submitFormData' ? `${serverAPI}/${EndAPI}` : `${serverAPI}/${EndAPI}/${e.target.dataset.id}`
    const formData = new FormData(e.target)
    console.log(api);


    const response = await sendDataToServer(api, method, formData) // send data to server
    if (response && SubmitForm.id === 'submitFormData') e.target.reset()
}
