import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verify, API_KEY } from '../services/service';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import Loader from '../services/loader';

const Signup = () => {

    const notifyError = (msg) => toast.error(msg);
    const notifySuccess = (msg) => toast.success(msg);

    const Navigate = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loader, setLoader] = useState(false)

    const formHandler = async (e) => {
        e.preventDefault()
        setLoader(true)
        const resp = await fetch(`${API_KEY()}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        setLoader(false)
        const data = await resp.json()
        if (data['status'] === 201) {
            notifySuccess(data['msg'])
            Navigate('/login')
        } else {
            notifyError(data['msg'])
        }

    }

    const checkSignup = async () => {
        const result = await verify()
        if (result === 'verified') {
            Navigate('/')
        }
    }

    useEffect(() => {
        checkSignup()
    }, []);

    return (
        <>
            <Navbar />
            {loader && <Loader />}
            <div className="form_container signup_container">
                <form onSubmit={formHandler}>
                    <h2>Sign Up</h2>
                    <input required type="text" onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    <input required type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <input required type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <input type="submit" value='Sign Up' />
                </form>
            </div>
        </>
    );
}

export default Signup;
