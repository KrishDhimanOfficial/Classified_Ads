
const product_controller = {
    createProduct: async (req, res) => {
        try {
            console.log(req.body);
            console.log(req.files);
            return res.json({ error: 'Server Error' })
        } catch (error) {
            console.log('createProduct : ' + error.message)
        }
    }
}

export default product_controller