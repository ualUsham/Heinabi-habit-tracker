import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CLDR from "./CLDR";
import './view.css';

export default function View() {
    const [myHabits, setMyHabits] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        let storedHabits = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            let habit = null;

            try {
                habit = JSON.parse(localStorage.getItem(key));
            } catch (error) {
                console.error(`Error parsing localStorage key ${key}:`, error);
                continue; // Skip invalid JSON data
            }

            if (habit && habit.title) { 
                storedHabits.push([key, habit, false, 'Track Habit']);
            }
        }

        storedHabits.sort((a, b) => new Date(a[1].timeAdded) - new Date(b[1].timeAdded));
        setMyHabits(storedHabits);
    }, []);

    const handleDelete = (habit) => {
        const userConfirmed = window.confirm("Deletion will result in losing track of this Habit. Are you sure?");
        if (userConfirmed) {
            localStorage.removeItem(habit[0]);
            setMyHabits((prev) => prev.filter(item => item !== habit));

            setMsg("Habit Deleted!");
            setTimeout(() => setMsg(""), 1000);
        }
    };

    const viewCalendar = (idx) => {
        setMyHabits((prev) => 
            prev.map((habit, i) => 
                i === idx ? [habit[0], habit[1], !habit[2], habit[2] ? 'Track Habit' : 'Close'] : habit
            )
        );
    };

    return (
        <div className="container position-relative">
            {msg && (
                <div className="d-inline-flex alert alert-danger z-3 position-fixed top-0 start-50 translate-middle" role="alert">
                    <h5 style={{ fontSize: '1em' }}>{msg}</h5>
                </div>
            )}

            {myHabits.length > 0 ? (
                <div className="card-deck">
                    <div className="container text-center my-3 pe-2">
                        <h3 className="fw-bold">My Habits</h3>
                    </div>

                    {myHabits.map((habit, idx) => (
                        <div key={habit[0]} className="card container my-3">
                            <div className="card-body">
                                <h5 className="card-title">{idx + 1}. {habit[1].title}</h5>
                                <p className="card-text">{habit[1].desc}</p>

                                <button className="btn btn-primary me-3 mt-3" onClick={() => viewCalendar(idx)}>
                                    {habit[3]}
                                </button>

                                {!habit[2] && (
                                    <button className="btn btn-danger mt-3" onClick={() => handleDelete(habit)}>
                                        Delete
                                    </button>
                                )}

                                {habit[2] && <div className="calendar"><CLDR id={habit[0]} /></div>}
                            </div>
                        </div>
                    ))}

                    <div className="container text-center mb-4">
                        <Link to="/addHabit" className="btn btn-lg pe-4 mt-5">+ Add New Habit</Link>
                    </div>
                    <div className="container text-center mb-5">
                        <Link to="/" className="btn px-3">Home</Link>
                    </div>
                </div>
            ) : (
                <div className="container text-center">
                    <h5 className="fst-italic mt-5">No Habits found. Please add some new Habits.</h5>
                    <Link to="/addHabit" className="btn btn-lg pe-4 mt-5 mb-5">+ Add New Habit</Link>
                    <div className="container text-center mb-5">
                        <Link to="/" className="btn px-3">Home</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
