import React, { useState } from "react";
import { QuestionState, fetchQuizQuestion } from "./API";

// Components
import QuestionCard from "./components/QuestionCard";
import DifficultySelector from "./components/DifficultySelector";
import CategoricalSelector from "./components/CategorySelector";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;

const App = () => {
  const [step, setStep] = useState<
    "start" | "category" | "difficulty" | "quiz" | "result"
  >();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  // const [difficulty, setDifficulty] = useState<string>("");

  const StartTrivia = async () => {
    setStep("category");
  };

  const Difficulty = async () => {
    setStep("difficulty");
  };

  const fetchQuestions = async (difficulty: string) => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizQuestion(TOTAL_QUESTION, difficulty);
      setQuestions(newQuestions);
      setStep("quiz");
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
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
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button className="start" onClick={StartTrivia}>
          Start
        </button>
      ) : null}

      {step === "category" && (
        <CategoricalSelector setCategorical={Difficulty} />
      )}

      {step === "difficulty" && (
        <DifficultySelector setDifficulty={fetchQuestions} />
      )}

      {!gameOver ? <p className="score">Score: {score} </p> : null}
      {loading && <p>Loading Question...</p>}

      {step === "quiz" && !loading && !gameOver && questions[number] && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTION}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTION - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
