import axios from 'axios'
import config from "../../config/config"

class DataService {
    constructor() {
        this.clientAPI = axios.create({ baseURL: config.severAPI })
    }
    async post(api, formdata, config = {}) { // POST Request
        const response = await this.clientAPI.post(api, formdata, config)
        return response.data
    }

    async get(api, config = {}) { // GET Request 
        const response = await this.clientAPI.get(api, config)
        return response.data
    }

    async put(api, formData, config = {}) {  // PUT Request 
        const response = await this.clientAPI.put(api, formData, config)
        return response.data
    }

    async delete(api) { // DELETE Request
        const response = await this.clientAPI.delete(api)
        return response.data
    }
    async patch(api, formData, config = {}) {
        const response = await this.clientAPI.patch(api, formData, config)
        return response.data
    }
}

export default new DataService()