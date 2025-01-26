import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CLDR from "./CLDR";
import './view.css'

export default function View() {
    //can work without hooks, BUT if we use DELETE, we want Dynamic changes so we have to use hooks
    const [myHabits, setMyHabits] = useState([]) /// [ [key,obj1,false,'close'] ,[] , ....] // habit is [key,obj1,false,'close'] // obj has title and desc // key is related to key of localStorage

    useEffect(() => {
        let storedHabits = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i); // Get the actual key
            const habit = JSON.parse(localStorage.getItem(key)); // Retrieve the value
            if ('title' in habit){ //add only habits as they have title

                storedHabits.push([key, habit, false, 'Track Habit']);       
            } 
            }
        storedHabits=storedHabits.sort((a, b) => new Date(a[1].timeAdded) - new Date(b[1].timeAdded));
        console.log(storedHabits)
        setMyHabits(storedHabits);
    }, []); // Get all habits on the first render only

    const handleDelete = (habit) => {
        const userConfirmed = window.confirm("Deletion will result in losing track of this Habit. Are you sure?");
        if (userConfirmed) {
            localStorage.removeItem(habit[0]) //remove from localStorage
            const newHabits = myHabits.filter(item => item !== habit)
            setMyHabits(newHabits)//Remove from myHabits for dynamic changes
            //Show submitted message to user for 3 sec and hide
            setMsg("Habit  Deleted !!")
            setTimeout(() => { setMsg("") }, 1000);
        }
    }
    const [msg, setMsg] = useState("")
    
    // Show Calendar button
    const viewCalendar = (idx) => {
        setMyHabits((prev) => {
            // Copy of the previous state
            const newHabits = [...prev];
    
            // Update the specific habit
            newHabits[idx][2] = !prev[idx][2];
            newHabits[idx][3] = newHabits[idx][2] ? 'Close' : 'Track Habit';
    
            return newHabits;
        });
    };
    

    return (
        <div className="container position-relative">

            {msg && <div className="d-inline-flex alert alert-danger z-3 position-fixed top- start-50 translate-middle" role="alert">
                <h5 style={{ fontSize: '1em' }}>{msg}</h5>
            </div>}

            {myHabits.length > 0 ? (
                <div className="card-deck">

                    <div className="container text-center my-3 pe-2">
                        <h3 className="fw-bold">My Habits</h3>
                    </div>

                    {/* Main Logic */}

                    { myHabits.map((habit, idx) => {      //habit is [key,obj1,false,'close']  key is related to key of localStorage
                        return (<div key={habit[0]} className="card container my-3">
                            <div className="card-body">
                                <h5 className="card-title">{idx + 1}. {[habit[1].title]}</h5>
                                <p className="card-text">{habit[1].desc}</p>
                                {/* calendar button */}
                                <button className="btn btn-primary me-3 mt-3 "  onClick={()=>viewCalendar(idx)} >{habit[3]}</button> {/*Track Habit*/}
                                {/* delete button show when no calendar*/}
                                {!habit[2] && <button className="btn btn-primary mt-3" onClick={() => { handleDelete(habit) }}>Delete</button>}
                            
                                {/* Show Calendar */}
                                {habit[2] && <div className="calendar" > <CLDR id={habit[0]}/> </div>}
                                
                            </div>
                         
                        </div>
                        
                        )
                    })}

                    {/* End of Main Logic */}
                    

                    <div className="container column-flex align-item-center text-center mb-4">
                        <Link to="/addHabit" className="btn btn-lg pe-4 mt-5" type="button" >+ Add New Habit</Link>
                    </div>
                    <div className="container column-flex align-item-center text-center mb-5">
                        <Link to="/" className="btn mb-5 px-3" type="button" >Home</Link>
                    </div>


                </div>

            ) : (<div className="container column-flex align-item-center text-center">
                <h5 className="fst-italic mt-5">No Habits found. Please add some new Habits.</h5>
            
                <Link to="/addHabit" className="btn btn-lg pe-4 mt-5 mb-5" type="button" >+ Add New Habit</Link>
                <div className="container column-flex align-item-center text-center mb-5">
                        <Link to="/" className="btn mb-5 px-3" type="button" >Home</Link>
                </div>
            </div>
            )}

        </div>
    );
}
