import React, { useState, useEffect } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './CLDR.css';
import FullCalendar from '@fullcalendar/react';

const CLDR = ({id}) => {
    const [hoveredDate, setHoveredDate] = useState(null);
    const [selectDate,setSelectDate]=useState('');
    const [tobeHlt,setToBeHlt]=useState([]);
    const [tobeSkp,setToBeSkp]=useState([]);

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const savedHlt = JSON.parse(localStorage.getItem(`tobeHlt${id}`)) || []; //to avoid null
        const savedSkp = JSON.parse(localStorage.getItem(`tobeSkp${id}`)) || [];
        setToBeHlt(savedHlt);
        setToBeSkp(savedSkp);
    }, [id]);

    // Save tobeHlt to localStorage whenever it updates
    useEffect(() => {
        if (tobeHlt.length===0){localStorage.removeItem(`tobeHlt${id}`);
                                return;} //we dont want to store empty items

        localStorage.setItem(`tobeHlt${id}`, JSON.stringify(tobeHlt));

    }, [tobeHlt,id]);

    // Save tobeSkp to localStorage whenever it updates
    useEffect(() => {
        if (tobeSkp.length===0){localStorage.removeItem(`tobeSkp${id}`);
                                return;} //we dont want to store empty items
        localStorage.setItem(`tobeSkp${id}`, JSON.stringify(tobeSkp));
    }, [tobeSkp,id]);


    const handleSelect=(dateString)=>{
            setSelectDate(dateString);
    }

    const handleDone = () => {
        // Remove the date from `tobeSkp` if it exists
        setToBeSkp((prev) => prev.filter((item) => item !== selectDate));
    
        // Add the date to `tobeHlt` if it's not already included
        if (!tobeHlt.includes(selectDate)) {
            setToBeHlt((prev) => [...prev, selectDate]);
        }
        // Clear the selected date to avoid overridding
        setSelectDate('');
    };
    
    const handleSkip = () => {
        // Remove the date from `tobeHlt` if it exists
        setToBeHlt((prev) => prev.filter((item) => item !== selectDate));
    
        // Add the date to `tobeSkp` if it's not already included
        if (!tobeSkp.includes(selectDate)) {
            setToBeSkp((prev) => [...prev, selectDate]);
        }
        // Clear the selected date to avoid overridding
        setSelectDate('');
    };

    const handleRemove =() =>{
        //remove from hlt
        setToBeHlt((prev) => prev.filter((item) => item !== selectDate));
        //remove from skp
        setToBeSkp((prev) => prev.filter((item) => item !== selectDate));
        // Clear the selected date to avoid overridding
        setSelectDate('');
    }

    return (<>
            <div className="calendar-container" >
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                
                    //Header info
                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'prev,next today',
                    }}


                    //Cell Info Styling
                    dayCellContent={(info) => {
                        const dateString = info.date.toDateString();
                        //  console.log(`datestring ${dateString}`)
                        let className = 'normal-cell-centent' // Default class
                        
                        if (hoveredDate === dateString) {
                                    className = 'hover-highlight'; // Marked
                        } else if (selectDate === dateString ||tobeHlt.includes(dateString)||tobeSkp.includes(dateString)) {
                                    className = 'hover-highlight-white'; // Selected
                        } 

                        return (
                            <div
                                //hovering
                                onMouseEnter={() => setHoveredDate(dateString)}
                                onMouseLeave={() => setHoveredDate(null)}

                                //selecting 
                                onClick={()=> handleSelect(dateString)}

                                //updating class accordingly with function
                                className={className}
                                
                                >
                                {info.date.getDate()}
                            </div>
                        );
                    }}

                    //Cell highlighting for Selection and Marking Done/Skip
                    dayCellClassNames={(info) => {
                        const dateString = info.date.toDateString();                
                        if (selectDate === dateString) {
                            return 'selected'; 
                        }
                        if (tobeHlt.includes(dateString)) {
                            return 'mark-done-hlt'; 
                        }
                        if (tobeSkp.includes(dateString)) {
                            return 'mark-skip-hlt';
                        }
                        return 'all-cell'; 
                    }}
                />
            </div>
            
            <button className="btn btn-primary mt-3 me-2 btn-mark-done" onClick={handleDone} >Mark Done</button>
            
            <button className="btn btn-primary mt-3 me-2 btn-skip" onClick={handleSkip} >Mark Skip</button>

            <button className="btn btn-primary mt-3 " onClick={handleRemove} >Remove</button>
            </>
        );
};

export default CLDR;
