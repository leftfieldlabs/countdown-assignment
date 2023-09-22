import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Calendar = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);

    const handleChange = (date) => {
        setStartDate(date);
    };
    //once user submits date chosen, props are passed up to parrent component through onDateChange
    const handleSubmit = (event) => {
        event.preventDefault();
        setCalendarOpen(false);
        if (onDateChange && startDate) {
            onDateChange(startDate);
        }
    };

    // the consts below are need to help establish minTime, which limits a user from choosing a past time for the date value
    const isToday = startDate.toDateString() === new Date().toDateString();
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    if (calendarOpen) {
        return (
            <div className="calendar" >
                <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', gap: '3vh'}}>
                    <DatePicker 
                    className="change"
                        selected={startDate} 
                        onChange={handleChange}
                        shouldCloseOnSelect={false}
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={1}
                        dateFormat="Pp"
                        minDate={new Date()}
                        minTime={isToday ? new Date().setHours(currentHour, currentMinute) : undefined}
                        maxTime={isToday ? new Date().setHours(23, 59) : undefined}
                        
                    />
                    <button type="submit">Confirm Date</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="calendar" style={{display: 'flex', flexDirection: 'column'}}>
                <h1>Countdown App</h1>
                <button onClick={() => setCalendarOpen(true)}>Pick A Date To Get Started</button>
                <p>This countdown has physics based effects that drop the UI <br/> 
                containing a completely depleted time measurement. <br/>
                Choose a date and time not too far away to see these effects.</p>
            </div>
        )
    }
};

export default Calendar;

// style={{position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', zIndex: 1000}}
