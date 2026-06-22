import React, { useEffect, useRef, useState } from "react";
import { paragraphs } from "../data/paragraphs";

const TypingArea = () => {
  const getRandomPara = () => {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
  };

  const [currentPara, setCurrentPara] = useState(() => getRandomPara());
  const [typedChara, setTypedChara] = useState([]);
  const [mistake, setMistake] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const inputRef = useRef(null);

  const changeCurrentPara = () => {
    let newPara;

    do {
      newPara = getRandomPara();
    } while (newPara.id === currentPara.id);

    setCurrentPara(newPara);
    setTypedChara([]);
    setCurrentIndex(0);
    setMistake(0);

    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        setTypedChara((prev) => prev.slice(0, -1));
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (e.key.length !== 1) return;

      if (currentIndex >= currentPara.text.length) return;

      setTypedChara((prev) => [...prev, e.key]);

      if (e.key !== currentPara.text[currentIndex]) {
        setMistake((prev) => prev + 1);
      }

      setCurrentIndex((prev) => prev + 1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, currentPara]);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="max-w-3xl mx-auto p-6 border rounded-lg cursor-text"
    >
      <div className="text-xl leading-relaxed">
        {currentPara.text.split("").map((char, index) => {
          let className = "";

          if (index < typedChara.length) {
            className =
              typedChara[index] === char ? "text-green-500" : "text-red-500";
          }

          if (index === currentIndex) {
            className += " border-l-2 border-yellow-400 animate-pulse";
          }

          return (
            <span className={className} key={index}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        className="absolute opacity-0"
        autoFocus
      />

      <div className="mt-4 flex items-center gap-4">
        <p>Mistakes: {mistake}</p>

        <button
          onClick={changeCurrentPara}
          className="border px-4 py-2 rounded"
        >
          Change Text
        </button>
      </div>
    </div>
  );
};

export default TypingArea;