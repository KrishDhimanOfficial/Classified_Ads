const GetCookie = (navigate) => {
    const seller_token = sessionStorage.getItem('seller_token')
    if(seller_token === 'undefined') navigate('/login')
    if (!seller_token) navigate('/login')
    return seller_token
}

export default GetCookie