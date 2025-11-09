import { useState } from 'react';
import './App.css';

function App() {
  const [words, setWords] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWords = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/');
    const data = await response.json();
    setWords(data);
    setLoading(false);
  };

  const getFontSize = (count: number, minCount: number, maxCount: number): number => {
    const minSize = 12;
    const maxSize = 64;
    if (maxCount === minCount) return minSize;
    const ratio = (count - minCount) / (maxCount - minCount);
    return minSize + (maxSize - minSize) * ratio;
  };

  const getWordColor = (word: string): string => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash += word.charCodeAt(i);
    }
    const hue = hash % 360;
    const saturation = 40 + (hash % 50);
    const lightness = 25 + (hash % 50);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const getWordRotation = (word: string): number => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash += word.charCodeAt(i);
    }
    return (hash % 2 === 0) ? 0 : 90;
  };

  const wordEntries = Object.entries(words);
  const counts = wordEntries.length > 0 ? wordEntries.map(([, count]) => count) : [];
  const minCount = counts.length > 0 ? Math.min(...counts) : 0;
  const maxCount = counts.length > 0 ? Math.max(...counts) : 0;

  return (
    <div>
      <h1>Word Cloud Generator</h1>
      
      <button onClick={fetchWords} disabled={loading}>
        {loading ? 'Loading...' : 'Get Words'}
      </button>

      {wordEntries.length > 0 && (
        <div className="words">
          {wordEntries.map(([word, count]) => {
            const fontSize = getFontSize(count, minCount, maxCount);
            const color = getWordColor(word);
            const rotation = getWordRotation(word);
            return (
              <span
                key={word}
                className="word-item"
                style={{ 
                  fontSize: `${fontSize}px`, 
                  color,
                  transform: `rotate(${rotation}deg)`
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
