import React from "react";
import { Link } from "react-router-dom";
import './Head.css'

export default function Head() {
    return (
        <div style={{position:'relative'}}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid d-flex flex-column align-items-center text-center">
                    <Link className="navbar-brand fs-1 fw-bold ms-3" to="/">Heinabi</Link>
                    <div className="text-white fs-4 fst-italic ">Habit Tracker</div>
                </div>
            </nav>
            <Link to="/">
                <i className="fa-solid fa-calendar-days fa-3x logo " style={{ color: "#ffffff" }} ></i>
            </Link>

            <div className="home-about">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="text-white">Home</span>
                </Link>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                    <span className="text-white " >About</span>
                </Link>
            </div>

        </div>
    )
}