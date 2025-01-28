import mongoose from "mongoose"
import config from "../config/config.js"
import adminModel from "../models/admin.model.js"
import generalSettingModel from "../models/general-setting.model.js"
import sellerModel from "../models/seller.model.js"
import { setUser, getUser } from '../services/createToken.js'
import deleteImage from "../services/deleteImg.js"
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
            const settings = await generalSettingModel.findOne({})
            const { current_password, new_password, re_enter_passsword } = req.body;
            if (!current_password || !new_password || !re_enter_passsword) {
                return res.render('general-setting',
                    {
                        settings,
                        error: 'All Fields Are Required!',
                        current_password, new_password, re_enter_passsword
                    }
                )
            }
            if (new_password !== re_enter_passsword) {
                return res.render('general-setting', { settings, error: 'Password Must Be Same!', current_password })
            }

            const admin = await adminModel.findOne({}, { _id: 1, password: 1 })
            const isMatch = await bcrypt.compare(current_password, admin.password)

            if (!isMatch) {
                return res.render('general-setting',
                    { settings, error: 'Invalid Current Password!', current_password }
                )
            } // Check match current password with saved password

            const response = await adminModel.findByIdAndUpdate(
                { _id: admin._id },
                { password: await bcrypt.hash(new_password, 10) },
                { new: true }
            ) // Hashing a new password

            if (!response) return res.render('general-setting', { settings, error: 'Unable to update!' })
            return res.render('general-setting', {
                settings,
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
            const seller = await sellerModel.findOne({ email, status: true }, { password: 1 }, { runValidators: true })
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
    handleSellerAuthentication: async (req, res) => {
        try {
            const { token } = req.body;
            const seller = getUser(token)

            const response = await sellerModel.findOne({ _id: new mongoose.Types.ObjectId(seller?.id), status: true })
            if (!response) return res.json({ error: 'Unauthorized!' })
            return res.json({ message: 'Authenticated!' })
        } catch (error) {
            console.log('handleSellerAuthentication : ' + error.message)
        }
    },
    changeSellerPassword: async (req, res) => {
        try {
            const seller = getUser(req.headers['authorization'].split(' ')[1])
            const { current_password, new_password } = req.body;

            const prevPassword = await sellerModel.findById({ _id: seller.id }, { password: 1 })
            const checkpassword = await bcrypt.compare(current_password, prevPassword.password)

            if (!checkpassword) return res.json({ error: 'Incorrect password!' })

            const response = await sellerModel.findByIdAndUpdate(
                { _id: seller.id },
                { password: await bcrypt.hash(new_password, 20) },
                { new: true }
            )
            if (!response) return res.json({ error: 'unable to updated!' })
            return res.json({ message: 'updated successfully!' })
        } catch (error) {
            console.log('changeSellerPassword' + error.message)
        }
    },
    General_Settings: async (req, res) => {
        try {
            const { desc, name, companyemail } = req.body;

            const existingRecored = await generalSettingModel.findOne({})
            const response = await generalSettingModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    name: name.trim(),
                    desc: desc.trim(),
                    setFeaturedAdPrice: setFeaturedAdPrice,
                    companyemail: companyemail.trim(),
                    logo: req.files['logo']
                        ? req.files['logo'][0].filename
                        : existingRecored.logo
                },
                { runValidators: true }
            )
            if (!response) return res.json({ error: 'unable to updated!' })

            if (req.files['logo']) await deleteImage(`images/${response.logo}`)
            if (req.files['banner_image']) await deleteImage(`images/${response.banner_image}`)
            return res.json({ message: 'updated successfully!' })
        } catch (error) {
            // Extract custom error messages
            if (error.name === 'ValidationError') validations(res, error.errors)
            if (req.files['logo'] || req.files['banner_image']) {
                await deleteImage(`images/${req.files['logo'][0].filename || req.files['banner_image'][0].filename}`)
            }
            console.log('General_Settings' + error.message)
        }
    },
    renderGN: async (req, res) => {
        try {
            const settings = await generalSettingModel.findOne({})
            return res.render('general-setting', { settings, logo_img: config.site_img_path })
        } catch (error) {
            console.log('renderGN : ' + error.message)
        }
    },
    setFeaturedAdPrice: async (req, res) => {
        try {
            const { setFeaturedAdPrice } = req.body;
            const response = await generalSettingModel.findByIdAndUpdate(
                { _id: req.params.id },
                { setFeaturedAdPrice },
                { new: true, runValidators: true }
            )
            if (!response) return res.render('general-setting', { error: 'Unable to update!' })
            return res.redirect('/admin/general-settings')
        } catch (error) {
            console.log('setFeaturedAdPrice : ' + error.message)
        }
    },
    getGNSettings: async (req, res) => {
        try {
            const response = await generalSettingModel.findOne({})
            return res.status(200).json(response)
        } catch (error) {
            console.log('getGNSettings : ' + error.message)
        }
    }
}

export default authenticationcontroller