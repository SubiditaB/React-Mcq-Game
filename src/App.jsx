// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import questions from './data/questions'; // Correct import path for data
import './App.css'; // Import the main App styles

const SHUFFLE_DELAY_MS = 1000; // Delay before moving to next question after feedback
const QUESTION_TIME_LIMIT = 15; // seconds per question

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIME_LIMIT);
  const [quizQuestions, setQuizQuestions] = useState([]); // To hold shuffled questions

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = useCallback((array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }, []);

  // Initialize/Reset Game
  const startGame = useCallback(() => {
    // Shuffle questions once at the start of the game
    const shuffledQuestions = shuffleArray([...questions]).map(q => ({
      ...q,
      options: shuffleArray([...q.options]) // Shuffle options for each question
    }));
    setQuizQuestions(shuffledQuestions);

    setGameStarted(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setTimeRemaining(QUESTION_TIME_LIMIT);
  }, [shuffleArray]);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (gameStarted && !quizCompleted && timeRemaining > 0 && !showFeedback) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !showFeedback) {
      // Time's up, move to next question (without selecting an answer)
      handleAnswerSelection(null);
    }
    return () => clearInterval(timer); // Cleanup interval
  }, [gameStarted, quizCompleted, timeRemaining, showFeedback]);


  // Handle Answer Selection
  const handleAnswerSelection = (option) => {
    if (selectedOption !== null && !showFeedback) return; // Prevent re-selection before feedback

    setSelectedOption(option);
    setShowFeedback(true);

    if (option && option.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to next question after a brief delay
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null); // Reset selected option for next question

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimeRemaining(QUESTION_TIME_LIMIT); // Reset timer for next question
      } else {
        setQuizCompleted(true); // All questions answered
      }
    }, SHUFFLE_DELAY_MS);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (!gameStarted) {
    return (
      <div className="app-container welcome-screen">
        <h2>Welcome to the ReactJS Quiz!</h2>
        <p>Test your knowledge on ReactJS fundamentals with this interactive MCQ game. You'll have {QUESTION_TIME_LIMIT} seconds per question. Good luck!</p>
        <button onClick={startGame}>Start Quiz</button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="app-container result-screen">
        <h2>Quiz Completed!</h2>
        <p className="score">Your Score: {score} / {quizQuestions.length}</p>
        <button onClick={startGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="app-container quiz-container">
      <div className="quiz-header">
        <div className="progress-indicator">
          Question {currentQuestionIndex + 1} / {quizQuestions.length}
        </div>
        <div className="timer">{timeRemaining}s</div>
      </div>

      <h3 className="question-text">{currentQuestion.question}</h3>

      {showFeedback && (
        <div className={`feedback-message ${selectedOption?.isCorrect ? 'correct' : 'incorrect'}`}>
          {selectedOption?.isCorrect ? 'Correct!' : 'Incorrect!'}
        </div>
      )}

      <div className="options-grid">
        {currentQuestion.options.map((option) => (
          <button
            key={option.text}
            className={`option-button ${selectedOption === option ? 'selected' : ''} ${showFeedback ? (option.isCorrect ? 'correct' : (selectedOption === option ? 'incorrect' : '')) : ''}`}
            onClick={() => handleAnswerSelection(option)}
            disabled={showFeedback || selectedOption !== null} // Disable after selection and during feedback
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;