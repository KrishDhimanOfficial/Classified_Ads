import adminModel from "../models/admin.model.js"
import sellerModel from "../models/seller.model.js"
import { setUser } from '../services/createToken.js'
import validations from "../services/validateData.js"
import bcrypt from 'bcrypt'

const authenticationcontroller = {
    handleSuperAdminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await adminModel.findOne({ email })
            if (!admin) return res.render('login', { error: 'Invalid Input Fields!' })

            const isMatch = await bcrypt.compare(password, admin.password)
            if (!isMatch) {
                return res.render('login', { error: 'Invalid Input Fields!', email })
            } else {
                const token = setUser({ _id: admin._id })
                res.cookie('classified_ads_admin', token,
                    {
                        httpOnly: true,
                        maxAge: 60 * 60 * 60 * 60 * 24,
                        sameSite: 'strict',
                        secure: true
                    })
                return res.redirect('/admin/dashboard')
            }
        } catch (error) {
            console.log('handleSuperAdminLogin : ' + error.message)
        }
    },
    handleSuperAdminLogout: async (req, res) => {
        try {
            res.clearCookie('classified_ads_admin')
            return res.redirect('/admin/login')
        } catch (error) {
            console.log('handleSuperAdminLogout : ' + error.message)
        }
    },
    changeDashboardPassword: async (req, res) => {
        try {
            const { current_password, new_password, re_enter_passsword } = req.body;
            if (!current_password || !new_password || !re_enter_passsword) {
                return res.render('general-setting',
                    {
                        error: 'All Fields Are Required!',
                        current_password, new_password, re_enter_passsword
                    }
                )
            }
            if (new_password !== re_enter_passsword) {
                return res.render('general-setting', { error: 'Password Must Be Same!', current_password })
            }

            const admin = await adminModel.findOne({}, { _id: 1, password: 1 })
            const isMatch = await bcrypt.compare(current_password, admin.password)

            if (!isMatch) {
                return res.render('general-setting',
                    { error: 'Invalid Current Password!', current_password }
                )
            } // Check match current password with saved password

            const response = await adminModel.findByIdAndUpdate(
                { _id: admin._id },
                { password: await bcrypt.hash(new_password, 10) },
                { new: true }
            ) // Hashing a new password

            if (!response) return res.render('general-setting', { error: 'Unable to update!' })
            return res.render('general-setting', {
                success: 'Password Changed Successfully!',
            })
        } catch (error) {
            console.log('changeDashboardPassword : ' + error.message)
        }
    },
    handelSellerRegister: async (req, res) => {
        try {
            const { email, username, phone, name, password } = req.body;

            const checkExistence = await sellerModel.findOne({ email, phone }) // Find Exists user with email
            if (checkExistence) return res.json({ info: 'Account Exists With this Email!' })

            const reponse = await sellerModel.create(
                {
                    email, username, name, phone,
                    password: await bcrypt.hash(password, 10)
                }
            ) // create Seller
            if (!reponse) return res.json({ error: 'Unable to create Account!' })
            return res.json({ message: 'Seller Registered Successfully!' })
        } catch (error) {
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('handelSellerRegister : ' + error.message)
        }
    },
    handleSellerLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const seller = await sellerModel.findOne({ email }, { password: 1 }, { runValidators: true })
            if (!seller) return res.json({ error: 'Invalid Email or Password!' })

            const isMatch = await bcrypt.compare(password, seller.password)

            if (!isMatch) return res.json({ error: 'Invalid Email or Password!' })
            else return res.json({
                message: 'Authenticated!',
                seller_token: setUser({ id: seller._id })
            })
        } catch (error) {
            if (error.name === 'ValidationError') validations(res, error.errors)
            console.log('handleSellerLogin : ' + error.message)
        }
    },
}

export default authenticationcontroller