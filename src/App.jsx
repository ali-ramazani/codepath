import React, { useState, useEffect } from "react";
import "./App.css";
import FlashCard from "./components/FlashCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { data } from "./data/data.js";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [shuffledData, setShuffledData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index

  const [isFlipped, setIsFlipped] = useState(false);
  
  useEffect(() => {
    const shuffled = shuffleArray([...data]); // Shuffle a copy of the data
    setShuffledData(shuffled);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < shuffledData.length - 1 ? prevIndex + 1 : 0
    ); // Go to the next card, loop back to start if at the end

    setQuestionNumber((prevNumber) => {
      return prevNumber < shuffledData.length ? prevNumber + 1 : 1;
    })

    setIsFlipped(false);
  };

  return (
    <div className="container">
      <div className="flash_card_header">
        <h1>Ready to Roar with Dino Facts?</h1>
        <h2>
          Think you know your dinosaurs? Challenge yourself with these roaring questions and discover the ancient giants that ruled the Earth!
        </h2>
        <p>Number of Cards: {shuffledData.length}</p>
      </div>

      {shuffledData.length > 0 && (
        <FlashCard index={currentIndex} data={shuffledData[currentIndex]} questionNumber = {questionNumber} isFlipped={isFlipped} setIsFlipped={setIsFlipped}/>
      )}
      <div className="navigation">
        <FontAwesomeIcon
          icon={faArrowRight}
          className="right_arrow"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default App;
