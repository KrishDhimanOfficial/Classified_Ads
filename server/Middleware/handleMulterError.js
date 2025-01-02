import multer from "multer"

// Error handling middleware
const handlemulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).json({ error: err.message })
    } else if (err) {
        // Custom error occurred when uploading.
        return res.status(400).json({ error: err.message })
    } else{
        next()
    }
}

export default handlemulterError