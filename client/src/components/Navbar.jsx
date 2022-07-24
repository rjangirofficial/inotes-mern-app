import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import verify from '../services/service';
import { toast } from 'react-toastify';

const Navbar = () => {

    const notifySuccess = (msg) => toast.success(msg);
    const Navigate = useNavigate()
    const [navToogle, setNavToogle] = useState(false)

    const logoutUser = () => {
        localStorage.removeItem('token')
        Navigate('/login')
        notifySuccess("Logout Successful")
    }

    const verifyUser = async () => {
        const result = await verify()
        if (result === "verified") {
            setNavToogle(true)
        }
    }

    useEffect(() => {
        verifyUser()
    }, []);

    return (
        <>
            <div className="navbar">
                <nav>
                    <div className="logo">
                        <NavLink to='/'>I Notes</NavLink>
                    </div>
                    <ul>
                        {
                            navToogle ?
                                <>
                                    <li><button onClick={logoutUser} >Logout</button></li>
                                </> :
                                <>
                                    <li><NavLink to='/login'>Login</NavLink></li>
                                    <li><NavLink to="/signup" >Sign Up</NavLink></li>
                                </>
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
