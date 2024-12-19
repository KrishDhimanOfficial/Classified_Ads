const validation = (res, error) => {
    // Extract custom error messages
    const errors = Object.values(error).map((err) => err.message)
    return res.status(400).json({ errors })
}
export default validation