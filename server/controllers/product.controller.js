const product_controller = {
    createProduct: async (req, res) => {
        try {
            console.log(req.body);
            console.log(req.file);
        } catch (error) {
            console.log('createProduct : ' + error.message)
        }
    }
}

export default product_controller