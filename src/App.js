import './App.css';
import './style/Countdown.css';
import Countdown from './components/Countdown';
import CountdownFunc from './components/CountdownFunc';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Countdown</h1>
      </header>
      <div className="content">
        <Countdown date='2023-12-24T00:00:00' />,
        <CountdownFunc />
      </div>
    </div>
  );
}

export default App;
