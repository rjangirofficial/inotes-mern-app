import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import verify from '../services/service';
import Navbar from '../components/Navbar';
import todayDate from 'date-and-time';
import { toast } from 'react-toastify'

const Dashboard = () => {

    const notifyError = (msg) => toast.error(msg);
    const notifySuccess = (msg) => toast.success(msg);

    const now = new Date();
    const Navigate = useNavigate();
    const [apiData, setApiData] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const verifyUser = async () => {
        try {
            const result = await verify()
            if (result === "invalid token") {
                Navigate('/login')
                localStorage.removeItem('token')
            } else {
                fetchApiData()
            }
        } catch (error) {
            notifyError("Failed To Verify")
        }
    }

    const fetchApiData = async () => {
        try {
            const token = localStorage.getItem('token')
            const resp = await fetch(`${process.env.NOTES_API_KEY}/addnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })
            const data = await resp.json()
            setApiData(data)
        } catch (error) {
            notifyError("Failed To Fetch Data")
        }
    }

    const formHandler = async (e) => {
        e.preventDefault()
        try {
            const date = todayDate.format(now, 'hh:mm A MMM DD YYYY');
            const token = localStorage.getItem('token')
            const resp = await fetch(`${process.env.NOTES_API_KEY}/addnotes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                
                body: JSON.stringify({ title, description, date })
            })
            const data = await resp.json()
            if (data['status'] === 201) {
                notifySuccess("Successfully Note Added")
                setTitle("")
                setDescription("")
                fetchApiData()
            }
        } catch (error) {
            notifyError("Failed To Add Note")
        }
    }

    const deleteNote = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const resp = await fetch(`${process.env.NOTES_API_KEY}/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "token": token
                }
            })
            const data = await resp.json()
            if (data['status'] === 200) {
                fetchApiData()
                notifySuccess('Successfully Deleted')
            } else {
                notifyError("Failed To Delete")
            }
        } catch (error) {
            notifyError("Failed To Delete")
        }
    }

    useEffect(() => {
        verifyUser()
    }, []);

    return (
        <>
            <Navbar />
            <div className="form_container dashboard_form_container">
                <form onSubmit={formHandler} >
                    <h2>Add Notes</h2>
                    <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    <input required type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <input type="submit" value='Add Notes' />
                </form>
            </div>


            {
                apiData.map((item, index) => {
                    return (
                        <div className="notes" key={index}>
                            <p className='title'>{item.title}</p>
                            <p className='description'>{item.description}</p>
                            <p className='date'>{item.date}</p>
                            <button onClick={() => deleteNote(item._id)} className='delete_btn'>Delete</button>
                        </div>
                    )
                })
            }
        </>
    );
}

export default Dashboard;
