import logo from './logo.svg';
import './App.css';
import testImage from './images/testKarte.png';

function App() {

  const images = [
    testImage, testImage, testImage, testImage
  ];


  return (
    <div className='App'>
      <div className='memory-board'>
        <div className="image-grid">
          {images.map((image, index) => (
              <img key={index} src={image} className='image' />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
