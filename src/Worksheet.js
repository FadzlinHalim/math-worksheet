import React, { useState, useEffect } from "react";
import "./Worksheet.css";

const questions = [
  { question: "17 rounded off to the nearest 10 is..", options: [10, 20, 17], answer: 10 },
  { question: "45 rounded off to the nearest 10 is..", options: [50, 45, 40], answer: 50 },
  { question: "75 rounded off to the nearest 10 is..", options: [70, 80, 175], answer: 80 },
  { question: "19 rounded off to the nearest 10 is..", options: [20, 10, 19], answer: 20 },
  { question: "64 rounded off to the nearest 10 is..", options: [64, 70, 60], answer: 60 },
  { question: "0 rounded off to the nearest 10 is..", options: [10, 1, 0], answer: 0 },
  { question: "98 rounded off to the nearest 10 is..", options: [80, 100, 89], answer: 100 },
  { question: "199 rounded off to the nearest 10 is..", options: [190, 100, 200], answer: 200 },
  { question: "94 rounded off to the nearest 10 is..", options: [100, 94, 90], answer: 90 },
  { question: "165 rounded off to the nearest 10 is..", options: [160, 170, 150], answer: 170 },
  { question: "445 rounded off to the nearest 10 is..", options: [450, 440, 500], answer: 450 },
  { question: "999 rounded off to the nearest 10 is..", options: [990, 1000, 909], answer: 1000 },
];

const Worksheet = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [name, setName] = useState("");
  const [score, setScore] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOptionChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const calculateScore = () => {
    if (!name.trim()) {
      alert("Please enter your name before submitting!");
      return;
    }

    const unanswered = questions
      .map((_, index) => (responses[index] === null ? index : null))
      .filter((index) => index !== null);

    setUnansweredQuestions(unanswered);

    if (unanswered.length > 0) {
      alert("Please answer all the questions!");
      return;
    }

    const correctAnswers = questions.filter(
      (q, index) => responses[index] === q.answer
    );
    setScore(correctAnswers.length);
    setShowFeedback(true);
  };

  const resetWorksheet = () => {
    setResponses(Array(questions.length).fill(null));
    setScore(null);
    setName("");
    setShowFeedback(false);
    setUnansweredQuestions([]);
  };

  const progress = Math.round((responses.filter((r) => r !== null).length / questions.length) * 100);

  // Scroll effect: Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Show the button when scroll is greater than 100px
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="worksheet-container">
      <header>
        <h1>Rounding Off to the Nearest 10</h1>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </header>
      <div className="name-input">
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="questions">
        {questions.map((q, index) => (
          <div
            key={index}
            className={`question-card ${
              showFeedback && responses[index] === q.answer
                ? "correct"
                : ""
            } ${
              showFeedback &&
              responses[index] !== q.answer &&
              responses[index] !== null
                ? "incorrect"
                : ""
            } ${unansweredQuestions.includes(index) ? "unanswered" : ""}`}
          >
            <p>{q.question}</p>
            <div className="options">
              {q.options.map((option, optIndex) => (
                <label key={optIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={responses[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={resetWorksheet} className="reset">
          Reset
        </button>
        <button onClick={calculateScore} className="submit">
          Submit
        </button>
      </div>

      {score !== null && (
        <p className="score">
          {name}, Your Score: {score} / {questions.length}
        </p>
      )}

      <footer>
        <p>Copyright © www.mathinenglish.com</p>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${isScrolled ? 'show' : ''}`} 
        onClick={scrollToTop}
      >
        ↑ Scroll to Top
      </button>
    </div>
  );
};

export default Worksheet;
