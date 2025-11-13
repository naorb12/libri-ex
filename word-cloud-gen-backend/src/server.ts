import express from "express";
import cors from "cors";
import { getRandomWord } from "./services/word-api";
const app = express();
const port: number = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", async (req, res) => {
  const amountOfTimes: number = 6000;

  try {
    const words = await getRandomWord(amountOfTimes);
    const wordsObject = Object.fromEntries(words);
    res.status(200).json(wordsObject);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res
      .status(500)
      .json({ error: "Failed to get random words", details: errorMessage });
  }
});

app.use((req, res, next) => {
  res.status(404).json("Oops! Error 404");
});
