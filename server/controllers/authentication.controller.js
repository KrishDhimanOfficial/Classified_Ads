import adminModel from "../models/admin.model.js"
import validations from "../services/validateData.js"
import bcrypt from 'bcrypt'

const authenticationcontroller = {
    handleSuperAdminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const response = await adminModel.create({
                email, password: await bcrypt.hash(password, 10)
            })
            if (!response) return res.json({ error: 'Invalid Fields!' })
            return res.redirect('/admin/dashboard')
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('handleSuperAdminLogin : ' + error.message)
        }
    },
    handelSellerRegister: async (req, res) => {
        try {

        } catch (error) {
            console.log('handelSellerRegister : ' + error.message)
        }
    },
    handleSellerLogin: async (req, res) => {
        try {

        } catch (error) {
            console.log('handleSellerLogin : ' + error.message)
        }
    }
}
export default authenticationcontroller