import React, { useState } from "react";
import './add.css';
import { Link } from "react-router-dom";

export default function Add() {
    
    const [form, setForm] = useState({ title: "", desc: "",timeAdded:"" })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value,timeAdded:new Date().toISOString() })
    }
    const handleAddHabit = () => {
        if (form.title === "" || form.desc === "") {
            alert("Title or Description cannot be Empty")
            //clear the form
            setForm({ ...form, title: "", desc: "", timeAdded:"" });
            return
        }
        //store it in localStorage; this is tricky bcoz, if deletion occurs, ls.length can be same and data cannot be added further"
        localStorage.setItem(form.title, JSON.stringify(form))
        //show submitted message to user for 3 sec and hide
        setMsg("New  Habit  Added !!")
        setTimeout(() => { setMsg("") }, 1000);

        //clear the form
        setForm({ ...form, title: "", desc: "",timeAdded:"" });
    }

    const [msg, setMsg] = useState("")

    return (
        <div className="container position-relative">
            {msg && <div className="alert alert-success d-inline-flex z-3 position-absolute top-0 start-50 translate-middle" role="alert">
                <h5 style={{fontSize:'1em'}}>{msg}</h5>
            </div>}

            <div className="container vstack gap-3 col-md-5 mx-auto ">
                <input className="form-control me-auto" name="title" value={form.title} onChange={handleChange} type="text" placeholder="Add Title..." ></input>
                <textarea className="form-control me-auto" name="desc" value={form.desc} onChange={handleChange} rows="5" type="text" placeholder="Add Description..." ></textarea>
                <button className="btn btn-lg pe-4" onClick={handleAddHabit}>+ Add New Habit</button>
                <Link to='/viewHabit' type="button" className="btn mt-3 mb-5" >View All Habits</Link>
            </div>
        </div>
    )
}