import logo from './logo.svg';
import './App.css';
import testImage from './images/testKarte.png';

function App() {
  return (
    <div className="App">
      <div className='flex-container'>
        <div className='flex-container'>
          <div className='flex-item'>
            <img src={testImage}></img>
          </div>
          <div className='flex-item'>
            <img src={testImage}></img>
          </div>
        </div>
        <div className='flex-container'>
          <div className='flex-item'>
            <img src={testImage}></img>
          </div>
          <div className='flex-item'>
            <img src={testImage}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
