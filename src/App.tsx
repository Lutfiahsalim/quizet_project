import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { QuestionState, fetchQuizQuestion } from "./API";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

// assets import
import assets_icon from "../src/img/t1.png";
import categoryQuiz from "../src/img/category.png";
import iconQuiz from "../src/img/searching.png";
// import iconLamp from "../src/img/idea.png";

import "./style/styles.scss";

// Components
import QuestionCard from "./components/QuestionCard";
import DifficultySelector from "./components/DifficultySelector";
import CategoricalSelector from "./components/CategorySelector";
import Footer from "./components/Footer";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;

const App = () => {
  // const [step, setStep] = useState<
  //   "start" | "category" | "difficulty" | "quiz" | "result"
  // >();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const navigate = useNavigate();

  const StartTrivia = async () => {
    setGameOver(false);
    navigate("/category");
  };

  const Difficulty = async () => {
    navigate("/difficulty");
  };

  const fetchQuestions = async (difficulty: string) => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizQuestion(TOTAL_QUESTION, difficulty);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
      navigate("/quiz");
    } catch (error) {
      console.error("Error fetching question", error);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver && questions[number]) {
      //user Answer
      const answer = e.currentTarget.value;
      // Check anwer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save answer in the array for user answes
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1 className="navbar-title">QUIZet.</h1>
        <div className="nav-child">
          <ul>
            <li>
              <a href="#about-section">About</a>
            </li>
            <li>
              <a href="">Score</a>
            </li>
          </ul>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="content">
                <h1 className="quiz-name">Quizet</h1>
                <p className="quiz-description">
                  Take our quiz to assess your expertise and identify the
                  strengths <br />
                  and weaknesses in your knowledge base.
                </p>
                <div className="icon-wrap">
                  <img src={iconQuiz} alt="icon" />
                </div>
                {gameOver || userAnswers.length === TOTAL_QUESTION ? (
                  <button className="start" onClick={StartTrivia}>
                    START QUIZ <FontAwesomeIcon icon={faPlay} />
                  </button>
                ) : null}
              </div>
              <div id="about-section">
                <div className="desc-top">
                  <h2 className="desc-left">
                    QUIZet is a place to expertise our brain
                  </h2>
                  <img src={assets_icon} alt="icon of Quizet" />
                </div>

                <div className="desc-bottom">
                  <h3>here is the category of quiz you could play</h3>
                  <img src={categoryQuiz} alt="BigCo Inc. logo" />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/category"
          element={<CategoricalSelector setCategorical={Difficulty} />}
        />
        <Route
          path="/difficulty"
          element={<DifficultySelector setDifficulty={fetchQuestions} />}
        />
        <Route
          path="/quiz"
          element={
            !loading && questions[number] ? (
              <QuestionCard
                questionNr={number + 1}
                totalQuestions={TOTAL_QUESTION}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-grow text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              // <p>Loading question...</p>
            )
          }
        />
      </Routes>

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTION - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
      <Footer />
    </div>
  );
};

export default App;
