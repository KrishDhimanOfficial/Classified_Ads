import { getUser } from "../services/createToken.js"
import sellerModel from "../models/seller.model.js"
import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId;

const AuthenticateUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const seller = getUser(token)
        const response = await sellerModel.findById({ _id: new ObjectId(seller?.id), status: true })

        if (!response) return res.json({ middlewareError: 'Unauthorized!' })
        next()
    } catch (error) {
        console.log('AuthenticateUser : ', error.message)
        return res.json({ error: 'Unauthorized!' })
    }
}

export default AuthenticateUser