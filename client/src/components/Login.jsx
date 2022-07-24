import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verify ,API_KEY} from '../services/service';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Login = () => {

    const notifyError = (msg) => toast.error(msg);
    const notifySuccess = (msg) => toast.success(msg);

    const Navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const formHandler = async (e) => {
        e.preventDefault()
        const resp = await fetch(`${API_KEY()}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await resp.json()
        if (data['status'] === 200) {
            Navigate('/')
            notifySuccess(data['msg'])
            localStorage.setItem('token', data['token'])
        } else {
            notifyError(data['msg'])
        }

    }

    const checkLogin = async () => {
        const result = await verify()
        if (result === 'verified') {
            Navigate('/')
        } else {
            localStorage.removeItem('token')
        }
    }

    useEffect(() => {
        checkLogin()
    }, []);

    return (
        <>
            <Navbar />
            <div className="form_container login_container">
                <form onSubmit={formHandler}>
                    <h2>Login</h2>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <input type="submit" value='Login' />
                </form>
            </div>
        </>
    );
}

export default Login;
