import brandModel from '../models/brand.model.js'

const brandController = {
    createBrand: async (req, res) => {
        try {
            console.log(req.body)
        } catch (error) {
            console.log('createBrand : ' + error.message)
        }
    }
}

export default brandController