import sellerModel from "../models/seller.model.js"

const seller_controllers = {
    renderAllSellers: async (req, res) => {
        try {
            const sellers = await sellerModel.find({}, { password: 0, username: 0 })
            return res.render('seller/allSellers', { sellers })
        } catch (error) {
            console.log('renderAllSellers : ' + error.message)
        }

    },
    renderAllDeactivated_Sellers: async (req, res) => {
        try {
            const sellers = await sellerModel.find({ status: false }, { password: 0 })
            return res.render('seller/dSellers', { sellers })
        } catch (error) {
            console.log('renderAllDeactivated_Sellers : ' + error.message)
        }
    },
    updateSellerStatus: async (req, res) => {
        try {
            const { status } = req.body;

            const response = await sellerModel.findByIdAndUpdate(
                { _id: req.params.id }, { status }
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('updateSellerStatus : ' + error.message)
        }
    }
}

export default seller_controllers