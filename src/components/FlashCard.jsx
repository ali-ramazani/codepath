import React, { useState } from "react";

const FlashCard = ({ data, questionNumber, isFlipped, setIsFlipped}) => {

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`card-container ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="card">
        <div className={`card-front ${data.difficulty}`}>
          <p> {questionNumber} {data.difficulty}</p>
          <p>{data.question}</p>
          <ul>
            {data.options &&
              data.options.map((option, index) => (
                <li key={index}>{index + 1}) {option}</li>
              ))}
          </ul>
        </div>
        <div className="card-back">
          <p>{data.answer}</p>
          <img src={data.url} alt="Dinosaur" />
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
