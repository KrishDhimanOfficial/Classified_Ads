const GetCookie = (navigate) => {
    const cookie = document.cookie.split('=')[1]
    if (!cookie) navigate('/login')
    if (cookie === 'undefined') navigate('/login')
    return cookie
}

export default GetCookie