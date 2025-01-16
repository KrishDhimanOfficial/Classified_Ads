const GetCookie = (navigate) => {
    const seller_token = sessionStorage.getItem('seller_token')
    if (!seller_token) navigate('/login')
    return seller_token
    // const cookies = document.cookie.split(';') // Split the cookie string into individual cookies

    // for (let cookie of cookies) {
    //     const [key, value] = cookie.trim().split('=') // Split the cookie into key
    //     console.log(!value);

    //     // if (!value) navigate('/login')
    //     if (true && key !== 'seller_token') navigate('/login')
    //     if (key === 'seller_token') return value
    // }
}

export default GetCookie