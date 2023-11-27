import './App.css';
import './style/Countdown.css';
import './style/Webgl.css';

import Countdown from './components/Countdown';
import Webgl from 'components/Webgl';

function App() {
  return (
    <div className="App">
        <Countdown />
        <Webgl />
      <p className="f">
        <a target="_blank" href="http://www.jeremieboulay.fr" rel="noreferrer">@Jeremboo</a><br /> ┗|｀O´|┛
      </p>
    </div>
  );
}

export default App;
