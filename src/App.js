import logo from './logo.svg';
import './App.css';
import testImage from './images/testKarte.png';
import testImage2 from './images/testKarte2.png';
import testImage3 from './images/testKarte3.png';
import testImage4 from './images/testKarte4.png';
import testImage5 from './images/testKarte5.png';
import testImage6 from './images/testKarte6.png';
import testImage7 from './images/testKarte7.png';
import backCard from './images/backKarte.png';
import { useEffect, useState } from 'react';

function App() {
  const [cards, setCards] = useState([testImage, testImage2, testImage3, testImage4, testImage5, testImage6, testImage7]);
  const [cardsDisplay, setCardsDisplay] = useState([]);

  const numBoardCards = cards.length;
  const numColumns = Math.ceil(numBoardCards / 4);

  const [currentCards, setCurrentCards] = useState([]);
  
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

  useEffect(() => {
    if (currentCards.length === 2) {
      checkCards();
    }
  }, [currentCards]);

  function setupGame() {
    const memoryBoard = shuffleArray([...cards, ...cards]);
    const newCardsDisplay = Array(cards.length * 2).fill(backCard);
    setCards(memoryBoard);
    setCardsDisplay(newCardsDisplay);
  }

  function turnCard(cardIndex) {
    const newCardsDisplay = Array.from(cardsDisplay);
    if (currentCards.length <= 1) {
      if (cardsDisplay[cardIndex] === backCard) {
        newCardsDisplay[cardIndex] = cards[cardIndex];
        setCurrentCards(prevCurrentCards => [...prevCurrentCards, cards[cardIndex]]);
      } else {
        newCardsDisplay[cardIndex] = backCard;
        setCurrentCards(prevCurrentCards => prevCurrentCards.filter(card => card !== cards[cardIndex]));
      }
    } else {
      checkCards();
    }
    setCardsDisplay(newCardsDisplay);
  }

  function checkCards() {
    if (currentCards[0] === currentCards[1]) {
      setTimeout(() => {
      const currentCardPath = currentCards[0];
      const newCardsDisplay = cardsDisplay.map((card) => 
        card === currentCardPath ? null : card
      );
      setCurrentCards([]);
      setCardsDisplay(newCardsDisplay);
      }, 500);
    } else {
      setTimeout(() => {
        const newCardsDisplay = Array.from(cardsDisplay);
        const indexInDisplay1 = cardsDisplay.findIndex(card => card === currentCards[0]);
        const indexInDisplay2 = cardsDisplay.findIndex(card => card === currentCards[1]);
        newCardsDisplay[indexInDisplay1] = backCard;
        newCardsDisplay[indexInDisplay2] = backCard;
        setCurrentCards([]);
        setCardsDisplay(newCardsDisplay);
      }, 1000);
    }
  }

  return (
    <div className='App'>
      <div className='memory-board'>
        <div className="card-grid">
          { cardsDisplay.map((card, index) => {
              if (card) {
                return (
                <button onClick={() => turnCard(index)}><img src={card} alt="Card" className='image' /></button>
                );
              } else {
                return(<div/>);
              }
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
