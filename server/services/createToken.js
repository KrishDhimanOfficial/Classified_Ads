import jwt from 'jsonwebtoken'
import config from '../config/config.js'


export const setUser = (user) => {
    return jwt.sign(user, config.private_key)
}

export const getUser = (token) => {
    if (!token) { return null }
    return jwt.verify(token, config.private_key)
}