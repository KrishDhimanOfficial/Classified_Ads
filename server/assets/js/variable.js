export const serverAPI = 'http://localhost:3000/admin';
export const inputTitle = document.querySelector('#inputTitle')
export const inputSlug = document.querySelector('#inputSlug')
export const SubmitForm = document.querySelector('#submitFormData') || document.querySelector('#updateFormData')
export const submitbtn = document.querySelector('#submitbtn')

export const Notify = (data) => {
    if (data.message) toastr.success(data.message)
    if (data.warning) toastr.warning(data.warning)
    if (data.error) toastr.error(data.error)
    if (data.errors) data.errors.forEach(error => toastr.error(error))
    return;
}

export const CreateSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/)
}

export const sendDataToServer = async (api, method, formData) => {
    try {
        const response = await fetch(api, {
            method,
            body: formData
        })
        const res = await response.json()
        Notify(res) // Show the notifications
        if (res.message) return true
    } catch (error) {
        console.error(error)
    }
}

export const handleDeleteRequest = async (table_row, api) => {
    const response = await fetch(api, { method: 'DELETE' })
    const res = await response.json()

    if (!response.ok) toastr.error('Network Error')
    if (res.message) table_row.remove()
    Notify(res)
}