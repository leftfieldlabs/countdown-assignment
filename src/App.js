import './App.css';
import './style/Countdown.css';

import CountdownFunc from './components/CountdownFunc';
import { Canvas } from '@react-three/fiber';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Countdown</h1>
      </header>
      <div className="content">
        
        <Canvas
          
        >
          <CountdownFunc date='2023-09-17T08:22:00'/>
          
          
        </Canvas>
      </div>
    </div>
  );
}

export default App;
