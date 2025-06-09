// src/data/questions.js

const questions = [
  {
    id: 1,
    question: "What is the primary purpose of ReactJS?",
    options: [
      { text: "To manage server-side logic", isCorrect: false },
      { text: "To build user interfaces", isCorrect: true },
      { text: "To manage databases", isCorrect: false },
      { text: "To create mobile games", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "Which hook is used to manage state in a functional component?",
    options: [
      { text: "useEffect", isCorrect: false },
      { text: "useContext", isCorrect: false },
      { text: "useState", isCorrect: true },
      { text: "useReducer", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "What does JSX stand for?",
    options: [
      { text: "JavaScript XML", isCorrect: true },
      { text: "JavaScript Extension", isCorrect: false },
      { text: "JSON Xchange", isCorrect: false },
      { text: "JavaScript Syntax", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "How do you pass data from a parent component to a child component in React?",
    options: [
      { text: "Using state management libraries", isCorrect: false },
      { text: "Using props", isCorrect: true },
      { text: "Using callbacks", isCorrect: false },
      { text: "Using context API only", isCorrect: false },
    ],
  },
  {
    id: 5,
    question: "Which of the following is NOT a React lifecycle method (for class components)?",
    options: [
      { text: "componentDidMount", isCorrect: false },
      { text: "shouldComponentUpdate", isCorrect: false },
      { text: "componentWillUnmount", isCorrect: false },
      { text: "componentWillRender", isCorrect: true }, // This is not a standard lifecycle method
    ],
  },
];

export default questions;