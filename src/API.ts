// this file make for create the logic fetching data from API

import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// mengambil pertanyaan dengan tepat untuk dikembalikan ke fetchQuizQUestion
export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestion = async (
  amount: number,
  difficulty: string
): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(endpoint);
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        await new Promise((res) =>
          setTimeout(res, retryAfter ? parseInt(retryAfter) * 1000 : 1000)
        );
        attempts++;
        continue; // Retry fetching data
      }

      // Ensure response is OK
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();

      return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      attempts++;
    }
  }

  throw new Error("Max attempts reached. Unable to fetch quiz questions.");
};

// };
