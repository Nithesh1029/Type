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
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [timeLeft, isStarted, isFinished]);
return (
  <>
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6">
      <section
        onClick={() => inputRef.current?.focus()}
        className="w-full cursor-text overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col gap-5 border-b border-white/10 bg-white/3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Typing Arena
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Test your typing speed
            </h1>
          </div>

          <div
            className={`rounded-2xl border px-5 py-3 text-center ${
              timeLeft <= 10 && isStarted
                ? "border-red-400/50 bg-red-500/10 text-red-300"
                : "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wider opacity-70">
              Time Left
            </p>

            <p className="text-3xl font-bold tabular-nums">{timeLeft}s</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 px-5 pt-6 sm:gap-5 sm:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-3 text-center sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              WPM
            </p>

            <p className="mt-1 text-2xl font-bold text-cyan-300 sm:text-3xl">
              {wpm}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-3 text-center sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Accuracy
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-300 sm:text-3xl">
              {acc}%
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-3 text-center sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Errors
            </p>

            <p className="mt-1 text-2xl font-bold text-rose-300 sm:text-3xl">
              {mistake}
            </p>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-5 shadow-inner sm:p-7">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Click here and start typing
            </p>

            <div className="font-mono text-lg leading-9 tracking-wide text-slate-500 sm:text-xl sm:leading-10">
              {currentPara.text.split("").map((char, index) => {
                let className = "transition-colors duration-150";

                if (index < typedChara.length) {
                  className +=
                    typedChara[index] === char
                      ? " text-emerald-400"
                      : " rounded bg-rose-500/25 text-rose-300";
                }

                if (index === currentIndex && !isFinished) {
                  className +=
                    " border-l-2 border-cyan-300 bg-cyan-300/10 animate-pulse";
                }

                return (
                  <span className={className} key={index}>
                    {char}
                  </span>
                );
              })}
            </div>
          </div>

          <input
            ref={inputRef}
            type="text"
            value=""
            onKeyDown={handleKeyDown}
            className="absolute h-px w-px opacity-0"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 bg-white/2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-slate-400">Duration:</span>

            <button
              onClick={() => changeTime(30)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                selectedTime === 30
                  ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200"
              }`}
            >
              30 sec
            </button>

            <button
              onClick={() => changeTime(60)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                selectedTime === 60
                  ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200"
              }`}
            >
              60 sec
            </button>
          </div>

          <button
            onClick={() => changeCurrentPara(selectedTime)}
            className="rounded-xl border border-white/10 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200 cursor-pointer"
          >
            New Paragraph
          </button>
        </div>
      </section>
    </main>

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
