import logo from './logo.svg';
import './App.css';
import testImage from './images/testKarte.png';
import testImage2 from './images/testKarte2.png';
import testImage3 from './images/testKarte3.png';
import testImage4 from './images/testKarte4.png';
import backCard from './images/backKarte.png';
import { useEffect, useState } from 'react';

function App() {
  const [cards, setCards] = useState([testImage, testImage2, testImage3, testImage4]);
  const [cardsDisplay, setCardsDisplay] = useState([]);

  const numBoardCards = cards.length;
  const numColumns = Math.ceil(numBoardCards / 2);
  
  useEffect(() => {
    setupGame();
  }, []);


  useEffect(() => {
    const cardGrid = document.querySelector('.card-grid');
    cardGrid.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  }, [numColumns]);

  function shuffleArray(array) {
    const swapped = [];
    const shuffledArray = Array.from(array);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (!swapped.includes(j)) {
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        swapped.push(j);
      }
    }
    return shuffledArray;
  }

  function setupGame() {
    const memoryBoard = shuffleArray([...cards, ...cards]);
    const newCardsDisplay = Array(cards.length * 2).fill(backCard);
    setCards(memoryBoard);
    setCardsDisplay(newCardsDisplay);
  }

  function turnCard(cardIndex) {
    const newCardsDisplay = Array.from(cardsDisplay);

    if (cardsDisplay[cardIndex] === backCard) {
      newCardsDisplay[cardIndex] = cards[cardIndex]; 
    } else {
      newCardsDisplay[cardIndex] = backCard;
    }
     setCardsDisplay(newCardsDisplay);
  }

  return (
    <div className='App'>
      <div className='memory-board'>
        <div className="card-grid">
          { cardsDisplay.map((card, index) => (
              <button onClick={() => turnCard(index)}><img key={index} src={card} className='image'/></button>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
