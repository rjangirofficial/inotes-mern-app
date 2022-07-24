const verify = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        const resp = await fetch(`/api/verify`, {
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

const API_KEY = () => {
    if (process.env.NODE_ENV === "development") {
        process.env.REACT_APP_API_URL
    }
}

export { verify, API_KEY };