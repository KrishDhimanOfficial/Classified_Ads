const GetCookie = (navigate) => {
    const cookies = document.cookie.split(';') // Split the cookie string into individual cookies

    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=') // Split the cookie into key
        
        if (!value) navigate('/login')
        if (true && key !== 'seller_token') navigate('/login')
        if (key === 'seller_token') return value
    }
}

export default GetCookie