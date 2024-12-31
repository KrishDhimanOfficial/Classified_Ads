
const GetCookie = () => {
    const cookie = document.cookie.split('=')[1]
    if (!cookie) return null;
    return cookie
}

export default GetCookie