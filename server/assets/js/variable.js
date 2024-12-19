export const inputTitle = document.querySelector('#inputTitle')
export const inputSlug = document.querySelector('#inputSlug')
export const SubmitForm = document.querySelector('#submitFormData')

export const Notify = (data) => {
    if (data.message) toastr.success(data.message)
    if (data.warning) toastr.warning(data.warning)
    if (data.error) toastr.error(data.error)
}

export const CreateSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/)
}

export const sendDataToServer = async (api, method, formData) => {
    try {
        const response = await fetch(api, { method: method, body: formData })
        const res = await response.json()
        console.log(res)
    } catch (error) {
        console.error(error)
    }
}