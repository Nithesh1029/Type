import React, { useEffect, useRef, useState } from "react";
import { paragraphs } from "../data/paragraphs";
import { calculateCorrectness, wordsPerMinute } from "../utils/wpm";
import { Accuracy } from "../utils/accuracy";
import ResultPopUp from "./ResultPopUp";
const TypingArea = () => {
  const getRandomPara = () => {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
  };

  const [currentPara, setCurrentPara] = useState(() => getRandomPara());
  const [typedChara, setTypedChara] = useState([]);
  const [mistake, setMistake] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedTime, setSelectedTime] = useState(60);

  const correctCal = calculateCorrectness(typedChara, currentPara.text);
  const eTime = selectedTime - timeLeft;
  const wpm = wordsPerMinute(correctCal, eTime);
  const acc = Accuracy(correctCal, typedChara.length);

  const inputRef = useRef(null);

  const changeCurrentPara = (newTime = selectedTime) => {
    let newPara;

    do {
      newPara = getRandomPara();
    } while (newPara.id === currentPara.id);

    setCurrentPara(newPara);
    setTypedChara([]);
    setCurrentIndex(0);
    setMistake(0);
    setIsFinished(false);
    setIsStarted(false);
    setTimeLeft(newTime);

    inputRef.current?.focus();
  };

  const changeTime = (time) => {
    setSelectedTime(time);

    changeCurrentPara(time);
  };

  const handleKeyDown = (e) => {
    if (isFinished) {
      return;
    }
    if (e.key === "Backspace") {
      setTypedChara((prev) => prev.slice(0, -1));
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (e.key.length !== 1) return;

    if (currentIndex >= currentPara.text.length) {
      setIsStarted(false);
      setIsFinished(true);
      <ResultPopUp wpm={wpm} mistakes={mistake} accuracy={acc} next={()=>changeCurrentPara(selectedTime)}/>
      return;
    }
    if (!isStarted) {
      setIsStarted(true);
    }
    setTypedChara((prev) => [...prev, e.key]);

    if (e.key !== currentPara.text[currentIndex]) {
      setMistake((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;

    setCurrentIndex(nextIndex);
    if (nextIndex === currentPara.text.length) {
      setIsStarted(false);
      setIsFinished(true);
    }
  };
  useEffect(() => {
    if (!isStarted || isFinished) return;

    const timeOut = setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          setIsStarted(false);
          <ResultPopUp isOpen={isFinished} wpm={wpm} mistakes={mistake} accuracy={acc} next={()=>changeCurrentPara(selectedTime)}/>
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [timeLeft, isStarted, isFinished]);
return (
  <>
    <div
      onClick={() => inputRef.current?.focus()}
      className="max-w-3xl mx-auto mt-10 p-6 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg cursor-text shadow-lg"
    >
      <div className="text-xl leading-relaxed">
        {currentPara.text.split("").map((char, index) => {
          let className = "";

          if (index < typedChara.length) {
            className =
              typedChara[index] === char
                ? "text-green-500"
                : "text-red-500";
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
        type="text"
        value=""
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 pointer-events-none"
        autoFocus
      />

      <div className="mt-4 flex items-center gap-4">
        <p>Mistakes: {mistake}</p>

        <button
          onClick={() => changeCurrentPara(selectedTime)}
          className="border border-gray-600 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded cursor-pointer"
        >
          Change Text
        </button>

        <div className="flex justify-evenly gap-2">
          <button
            onClick={() => changeTime(30)}
            className={`px-4 py-2 rounded cursor-pointer ${
              selectedTime === 30
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 border border-gray-600"
            }`}
          >
            30 sec
          </button>

          <button
            onClick={() => changeTime(60)}
            className={`px-4 py-2 rounded cursor-pointer ${
              selectedTime === 60
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 border border-gray-600"
            }`}
          >
            60 sec
          </button>
        </div>

        <p>Time: {timeLeft}</p>
        <p>WPM: {wpm}</p>
        <p>Accuracy: {acc}%</p>
      </div>
    </div>

    <ResultPopUp
      isOpen={isFinished}
      wpm={wpm}
      accuracy={acc}
      mistakes={mistake}
      next={() => changeCurrentPara(selectedTime)}
    />
  </>
);
};

export default TypingArea;
