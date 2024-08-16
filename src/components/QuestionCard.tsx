import React from "react";
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
}) => (
  <div>
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />

    <div>
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

export default QuestionCard;
