import {
    serverAPI, inputTitle, inputSlug, SubmitForm, inputImage, resetbtn, previewImage,
    CreateSlug, sendDataToServer, displayPreviewImage
} from './variable.js'

'use strict'

inputTitle.onkeyup = () => {
    const title = inputTitle.value.trim()
    inputSlug.value = CreateSlug(title) // create slug 
}

inputImage.onchange = (e) => displayPreviewImage(e) // display image preview

if (resetbtn) resetbtn.onclick = () => previewImage.src = '../../assets/images/upload_area.png';

SubmitForm.onsubmit = async (e) => {
    e.preventDefault() // prevent default form submit

    const method = SubmitForm.id === 'submitFormData' ? 'POST' : 'PUT';
    const api = SubmitForm.id === 'submitFormData' ? `${serverAPI}/${EndAPI}` : `${serverAPI}/${EndAPI}/${e.target.dataset.id}`
    const formData = new FormData(e.target)

    const response = await sendDataToServer(api, method, formData) // send data to server
    if (response && SubmitForm.id === 'submitFormData') e.target.reset()
}