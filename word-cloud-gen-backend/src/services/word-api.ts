export const RANDOM_WORD_API_URL: string =
  "https://random-word-api.vercel.app/api";
export const WORD_PARAM: number = 1;

export async function getRandomWord(
  amountOfTimes: number
): Promise<Map<string, number>> {
  const words: Map<string, number> = new Map<string, number>();
  const batchSize: number = 600;

  for (let i = 0; i < amountOfTimes; i += batchSize) {
    const promises: Promise<string[]>[] = [];
    const currentBatchSize: number = Math.min(batchSize, amountOfTimes - i);

    for (let j = 0; j < currentBatchSize; j++) {
      const promise: Promise<string[]> = fetch(
        `${RANDOM_WORD_API_URL}?words=${WORD_PARAM}`
      ).then((response) => response.json() as Promise<string[]>);
      promises.push(promise);
    }

    const results = await Promise.allSettled(promises);
    const filtered = results
      .filter((res) => res.status != "rejected")
      .map((res) => res.value);
    for (let k = 0; k < filtered.length; k++) {
      const word: string = filtered[k][0];
      words.set(word, (words.get(word) || 0) + 1);
    }
  }

  return words;
}
