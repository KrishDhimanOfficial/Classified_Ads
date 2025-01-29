export const serverAPI = 'http://localhost:3000/admin';
export const inputTitle = document.querySelector('#inputTitle')
export const inputSlug = document.querySelector('#inputSlug')
export const inputImage = document.querySelector('#inputImage')
export const previewImage = document.querySelector('#previewImage')
export const SubmitForm = document.querySelector('#submitFormData') || document.querySelector('#updateFormData')
export const submitbtn = document.querySelector('#submitbtn')
export const resetbtn = document.querySelector('#reset')
export const loginbtn = document.querySelector('#loginbtn')
export const submitgeneralSetting = document.querySelector('#submitgeneralSetting')
export const parent_category = document.querySelector('#parent_category')
export const featuredAdSetting = document.querySelector('#featuredAdSetting')

export const Notify = (data) => {
    if (data.message) toastr.success(data.message)
    if (data.warning) toastr.warning(data.warning)
    if (data.error) toastr.error(data.error)
    if (data.errors) data.errors.forEach(error => toastr.error(error))
    return;
}

export const CreateSlug = (str) => {
    return str.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, 'and')
        .replace(/[^\w-]+/, '-')
}

export const displayPreviewImage = async (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => previewImage.src = reader.result;
    reader.readAsDataURL(file)
}

export const sendDataToServer = async (api, method, formData, navigate) => {
    try {
        submitbtn.disabled = true;
        submitbtn.innerText = '...Submitting'

        const response = await fetch(api, { method, body: formData })
        const res = await response.json() // Receving Response from server

        if (res.navigate && method === 'PUT') window.location.href = `${serverAPI}/${res.navigate}`;
        if (res.navigator) { // That use For Location
            window.location.href = `${serverAPI}/${res.navigator}`;
        }
        Notify(res) // Show the notifications
        if (res.message) return true
    } catch (error) {
        console.error(error)
    } finally {
        submitbtn.disabled = false;
        submitbtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Submit';
    }
}

export const handleDeleteRequest = async (table_row, api) => {
    const response = await fetch(api, { method: 'DELETE' })
    const res = await response.json()

    if (!response.ok) toastr.error('Network Error')
    if (res.message) table_row.remove()
    Notify(res)
}