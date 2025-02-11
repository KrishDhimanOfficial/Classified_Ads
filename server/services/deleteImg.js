import fs from 'fs'
import path from 'path'
import config from '../config/config.js'

const deleteImage = async (image) => {
    try {
        const __dirname = path.dirname(`http://localhost:${config.port}`)
        const imagePath = path.join(__dirname, '../uploads', image)
        if (imagePath) {
            return await fs.promises.rm(imagePath)
        }
    } catch (error) {
        console.log('deleteImage : ' + error.message)
    }
}

export default deleteImage;