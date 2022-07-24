const verify = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        const resp = await fetch('http://localhost:3000/api/verify', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        const data = await resp.json()
        if (!(data['status'] === 200)) {
            return "invalid token";
        } else {
            return 'verified'
        }
    } else {
        return "invalid token";
    }
}

export default verify;