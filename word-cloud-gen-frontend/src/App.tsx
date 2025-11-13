import { useState } from "react";
import "./App.css";
import Alert from "@mui/material/Alert";
import Words from "./Components/Words";

function App() {
  const [words, setWords] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorLabel, setErrorLabel] = useState<string>("");

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        const errText = await response.json();
        setErrorLabel(errText);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("setting words");
      setWords(data);
    } catch {
      setErrorLabel("Couldn't reach server");
    }
    setLoading(false);
  };

  const wordEntries = Object.entries(words);

  return (
    <div>
      <h1>Word Cloud Generator</h1>

      <button onClick={fetchWords} disabled={loading}>
        {loading ? "Loading..." : "Get Words"}
      </button>

      {wordEntries.length > 0 && errorLabel == "" && (
        <Words wordEntries={wordEntries} />
      )}
      {errorLabel && <Alert severity="error">{errorLabel}</Alert>}
    </div>
  );
}

export default App;
