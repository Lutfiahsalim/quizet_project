import React from "react";

interface Props {
  setDifficulty: (difficulty: string) => void;
  // setQuestions: (question: any[]) => void;
}

const DifficultySelector: React.FC<Props> = ({ setDifficulty }) => {
  return (
    <div>
      <h2>Select Difficult</h2>
      <button onClick={() => setDifficulty("easy")}>Easy</button>
      <button onClick={() => setDifficulty("medium")}>Medium</button>
      <button onClick={() => setDifficulty("hard")}>Hard</button>
    </div>
  );
};

export default DifficultySelector;
