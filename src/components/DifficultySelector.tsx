import React from "react";
import "../style/difficulty.scss";

import { Icon } from "@iconify/react";
import type { SVGProps } from "react";

export function PhBrainThin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="black"
        d="M244 124a52.1 52.1 0 0 0-32-48v-4a44 44 0 0 0-84-18.3A44 44 0 0 0 44 72v4a52 52 0 0 0 0 96v4a44 44 0 0 0 84 18.3a44 44 0 0 0 84-18.3v-4a52.07 52.07 0 0 0 32-48M88 212a36 36 0 0 1-36-36v-1.41A52 52 0 0 0 64 176h8a4 4 0 0 0 0-8h-8a44 44 0 0 1-14.67-85.5A4 4 0 0 0 52 78.73V72a36 36 0 0 1 72 0v78.75A44 44 0 0 0 88 132a4 4 0 0 0 0 8a36 36 0 0 1 0 72m104-44h-8a4 4 0 0 0 0 8h8a52 52 0 0 0 12-1.41V176a36 36 0 1 1-36-36a4 4 0 0 0 0-8a44 44 0 0 0-36 18.75V72a36 36 0 0 1 72 0v6.73a4 4 0 0 0 2.67 3.77A44 44 0 0 1 192 168m12-56a4 4 0 0 1-4 4h-4a32 32 0 0 1-32-32v-4a4 4 0 0 1 8 0v4a24 24 0 0 0 24 24h4a4 4 0 0 1 4 4M92 84a32 32 0 0 1-32 32h-4a4 4 0 0 1 0-8h4a24 24 0 0 0 24-24v-4a4 4 0 0 1 8 0Z"
      ></path>
    </svg>
  );
}

interface Props {
  setDifficulty: (difficulty: string) => void;
  // setQuestions: (question: any[]) => void;
}

const DifficultySelector: React.FC<Props> = ({ setDifficulty }) => {
  return (
    <div className="difficulty-content">
      <h2>Difficulty Option</h2>
      <p>Choose your difficulty level</p>
      <div className="button-wrap">
        <button onClick={() => setDifficulty("easy")}>
          <Icon className="responsive-icon" icon="ph:brain-thin" /> EASY
        </button>
        <button onClick={() => setDifficulty("medium")}>
          <Icon className="responsive-icon" icon="ph:brain" />
          MEDIUM
        </button>
        <button onClick={() => setDifficulty("hard")}>
          <Icon className="responsive-icon" icon="ph:brain-fill" /> HARD
        </button>
      </div>
    </div>
  );
};

export default DifficultySelector;
