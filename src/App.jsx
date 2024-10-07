import React, { useState, useEffect } from "react";
import "./App.css";
import FlashCard from "./components/FlashCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { data } from "./data/data.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [shuffledData, setShuffledData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState("");

  useEffect(() => {
    const shuffled = shuffleArray([...data]);
    setShuffledData(shuffled);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < shuffledData.length - 1 ? prevIndex + 1 : 0
    );
    setQuestionNumber((prevNumber) => {
      return prevNumber < shuffledData.length ? prevNumber + 1 : 1;
    });
    setIsFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : shuffledData.length - 1;
    });
    setQuestionNumber((prevNumber) => {
      return prevNumber > 1 ? prevNumber - 1 : shuffledData.length;
    });
    setIsFlipped(false);
  };

  const handleGuess = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentCard = shuffledData[currentIndex];
    const correctAnswer = currentCard.answer.toLowerCase().trim();
    const userGuess = guess.toLowerCase().trim();

    if (userGuess === correctAnswer) {
      toast.success(`Correct! The answer is indeed ${correctAnswer}.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      toast.error(`Incorrect! The correct answer is actually ${correctAnswer}.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }

    setGuess(""); // Reset the guess input after submission
  };

  const handleShuffle = (e) => {
    e.preventDefault();
    const shuffled = shuffleArray([...shuffledData]);
    setShuffledData(shuffled);
  };

  return (
    <div className="container">
      <div className="flash_card_header">
        <h1>Ready to Roar with Dino Facts?</h1>
        <h2>
          Think you know your dinosaurs? Challenge yourself with these roaring
          questions and discover the ancient giants that ruled the Earth!
        </h2>
        <p>Number of Cards: {shuffledData.length}</p>
      </div>

      {shuffledData.length > 0 && (
        <FlashCard
          index={currentIndex}
          data={shuffledData[currentIndex]}
          questionNumber={questionNumber}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your guess"
          value={guess}
          onChange={handleGuess}
        />
        <button type="submit">Submit Guess</button>
      </form>
      <div className="navigation_div">
        <div className="navigation">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="left_arrow"
            onClick={handlePrev}
          />
        </div>
        <div className="navigation">
          <FontAwesomeIcon
            icon={faArrowRight}
            className="right_arrow"
            onClick={handleNext}
          />
        </div>
        <div className="navigation">
          <FontAwesomeIcon
            icon={faShuffle}
            className="shuffle_icon"
            onClick={handleShuffle}
          />
        </div>
      </div>

      <ToastContainer />

    </div>
  );
}

export default App;
