import './App.css';
import './style/Countdown.css';
import Countdown from './components/Countdown';
import CountdownFunc from './components/CountdownFunc';
import { Canvas } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Countdown</h1>
      </header>
      <div className="content">
        <Countdown date='2023-12-24T00:00:00' />,
        <CountdownFunc date='2023-12-24T00:00:00'/>
        <Canvas>
          
          <Text3D
            font="/helvetiker_regular.typeface.json"

          >
            I am 3D
          </Text3D>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
