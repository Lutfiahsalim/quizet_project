// this file make is going to keep small function that we're going
// to use to randomize the answers to the question

// syntax untuk mengacak pilihan jawaban dari api
export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
