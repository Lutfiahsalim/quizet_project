import React from "react";
import "../style/questioncard.scss";

// Types
import { AnswerObject } from "../App";
// Styles
// import { Wrapper, ButtonqWrapper } format './QuestionCard.styles';

type Props = {
  question: string;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  userAnswer,
  questionNr,
  totalQuestions,
  callback,
}) => {
  return (
    <div className="questionCard">
      <div className="section-qs">
        <div className="describe-fetch">
          <p>Category: </p>
          <p>Difficulty: </p>
        </div>
        <div className="number">
          <p>
            Question: {questionNr} / {totalQuestions}
          </p>
        </div>
        <div className="question">
          <p dangerouslySetInnerHTML={{ __html: question }} />
        </div>
      </div>

      <div className="choice-wrap">
        {answers.map((answer, i) => (
          <div key={i}>
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
