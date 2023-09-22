import './App.css';
import './style/Countdown.css';

import CountdownFunc from './components/CountdownFunc';
import { Canvas } from '@react-three/fiber';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Countdown</h1>
      </header> */}
      <div className="content">
        <Canvas
          camera={{
            fov:45,
            near: 0.1,
            far: 200,
            position: [ 0, 0, 18]
          }}
        >
          <CountdownFunc date='2023-09-23T18:34:30'/>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
