const API_KEY = () => {
    if (!process.env.NODE_ENV === "development") {
        return process.env.REACT_APP_API_URL;
    } else {
        return `${process.env.PUBLIC_URL}/api`
    }
}


const verify = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        const resp = await fetch(`${API_KEY()}/verify`, {
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


export { verify, API_KEY };