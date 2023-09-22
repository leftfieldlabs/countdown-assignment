import './App.css';
import './style/Countdown.css';

import CountdownFunc from './components/CountdownFunc';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import Calendar from './components/Calendar';


function App() {

  const [selectedDate, setSelectedDate ] = useState(new Date());
  const [dateChanged, setDateChanged] = useState(false)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateChanged(true);
  }

  console.log(dateChanged)

  if( dateChanged ) {
    return (
        <div className="content">
          <Canvas
            camera={{
              fov:45,
              near: 0.1,
              far: 40,
              position: [ 0, 0, 18]
            }}
          >
            <CountdownFunc date={selectedDate} dateChanged={dateChanged}/>
          </Canvas>
        </div>
    );
  } else {
    return (
      <Calendar onDateChange={handleDateChange}/>
    )
  }
}

export default App;
