const GetCookie = (navigate) => {
    const seller_token = localStorage.getItem('seller_token')
    if (seller_token === 'undefined') navigate ? navigate('/login') : null
    if (!seller_token) navigate ? navigate('/login') : null
    return seller_token
}
export default GetCookie