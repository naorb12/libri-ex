type props = {
  wordEntries: [string, number][];
};

export default function Words({ wordEntries }: props) {
  const getFontSize = (
    count: number,
    minCount: number,
    maxCount: number
  ): number => {
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
    return hash % 2 === 0 ? 0 : 90;
  };

  const counts =
    wordEntries.length > 0 ? wordEntries.map(([, count]) => count) : [];
  const minCount = counts.length > 0 ? Math.min(...counts) : 0;
  const maxCount = counts.length > 0 ? Math.max(...counts) : 0;

  return (
    <>
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
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </>
  );
}
