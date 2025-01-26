import React from "react";
import { Link } from "react-router-dom";
import './Home.css'

export default function Home() {
    const handleClear = () => {
        // Show a confirmation dialog
        const userConfirmed = window.confirm("Are you sure you want to clear all habits?");
        if (userConfirmed) {
            localStorage.clear();
        }
    };

    return (
        <nav className="navbar justify-content-center row-gap-5 hero-up" >
            {/* carousels */}
            <div id="carouselExampleSlidesOnly" className="carousel slide"  >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/image1.jpg" className="d-block w-100" alt="..."  />
                        {/* captions */}
                        <div className="carousel-caption">
                            <h3>Your Daily Goals !!</h3>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/image2.jpg" className="d-block w-100" alt="..."  />
                        <div className="carousel-caption">
                            <h3>Your Workout Goals !!</h3>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/image3.jpg" className="d-block w-100" alt="..."  />
                        <div className="carousel-caption">
                            <h3>Time Management !!</h3>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* buttons */}
            <form className="container-fluid justify-content-center column-gap-5">
                <Link to="/addHabit" className="btn btn-lg pe-4 add" type="button" >+ Add New Habit</Link>
                <Link to="/viewHabit" className="btn btn-lg px-4" type="button">View All Habits</Link>
            </form>
            <button className="btn px-4 mb-5" onClick={handleClear} >Clear All</button>
        </nav>
    );
}