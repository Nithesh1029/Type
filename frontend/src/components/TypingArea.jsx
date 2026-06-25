import React, { useEffect, useRef, useState } from "react";
import { paragraphs } from "../data/paragraphs";
import { calculateCorrectness, wordsPerMinute } from "../utils/wpm";
import { Accuracy } from "../utils/accuracy";
import ResultPopUp from "./ResultPopUp";
import CapsAlert from "./CapsAlert";
const TypingArea = () => {
  const getRandomPara = () => {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
  };

  const clickSound = useRef(new Audio("/sound/click1.mp3"));
  const spaceBar = useRef(new Audio("/sound/spaceBar.mp3"));

  const [isAudio, setIsAudio] = useState(true);
  const [currentPara, setCurrentPara] = useState(() => getRandomPara());
  const [typedChara, setTypedChara] = useState([]);
  const [mistake, setMistake] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedTime, setSelectedTime] = useState(30);
  const [isCapsOn, setIsCapsOn] = useState(false);

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
    if(isAudio){

      if (e.key === "Backspace") {
        spaceBar.current.currentTime = 0;
        spaceBar.current.play();
      } else {
        clickSound.current.currentTime = 0;
        clickSound.current.play();
      }
    }

    setIsCapsOn(e.getModifierState("CapsLock"));
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
    <div className="min-h-screen bg-black">
      <h1 className=" w-full max-w-5xl px-4 pt-4 text-2xl font-bold font-[Helvetica] text-white sm:px-6">
        TYPE ARENA
      </h1>

      <main className="mx-auto flex w-full max-w-5xl items-center bg-black px-4 py-5 text-white sm:px-6">
        <section
          onClick={() => inputRef.current?.focus()}
          className="w-full cursor-text overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl shadow-white/5"
        >
          <div className="flex flex-col gap-4 border-b border-white/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                Typing Arena
              </p>

              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Test your typing speed
              </h1>
            </div>

            <div
              className={`rounded-lg border px-4 py-2 text-center ${
                timeLeft <= 10 && isStarted
                  ? "border-white bg-white text-black"
                  : "border-white/30 bg-black text-white"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-wider opacity-70">
                Time Left
              </p>

              <p className="text-2xl font-bold tabular-nums">{timeLeft}s</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 px-5 pt-5 sm:gap-4 sm:px-8">
            <div className="rounded-lg border border-white/20 bg-black p-3 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                WPM
              </p>

              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {wpm}
              </p>
            </div>

            <div className="rounded-lg border border-white/20 bg-black p-3 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Accuracy
              </p>

              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {acc}%
              </p>
            </div>

            <div className="rounded-lg border border-white/20 bg-black p-3 text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Errors
              </p>

              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {mistake}
              </p>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-8 sm:py-6">
            <div className="rounded-lg border border-white/20 bg-black p-4 sm:p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                Click here and start typing
              </p>

              <div className="font-mono text-base leading-8 tracking-wide text-neutral-500 sm:text-lg sm:leading-9">
                {currentPara.text.split("").map((char, index) => {
                  let className = "transition-colors duration-150";

                  if (index < typedChara.length) {
                    className +=
                      typedChara[index] === char
                        ? " text-white"
                        : " rounded bg-white text-black";
                  }

                  if (index === typedChara.length && !isFinished) {
                    className +=
                      " border-l-2 border-white bg-white/10 animate-pulse";
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

          <div className="flex flex-col gap-3 border-t border-white/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-neutral-400">Duration:</span>

              <button
                onClick={() => changeTime(30)}
                className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  selectedTime === 30
                    ? "bg-white text-black"
                    : "border border-white/30 bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                30 sec
              </button>

              <button
                onClick={() => changeTime(60)}
                className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  selectedTime === 60
                    ? "bg-white text-black"
                    : "border border-white/30 bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                60 sec
              </button>
            </div>
            <button className="cursor-pointer" onClick={()=>{setIsAudio(!isAudio)}}>
              {isAudio ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M12.5493 4.50005C11.3193 4.04005 8.70926 5.49996 6.54926 7.40996H4.94922C3.88835 7.40996 2.87093 7.83145 2.12079 8.58159C1.37064 9.33174 0.949219 10.3491 0.949219 11.41V13.41C0.949219 14.4708 1.37064 15.4883 2.12079 16.2385C2.87093 16.9886 3.88835 17.41 4.94922 17.41H6.54926C8.65926 19.35 11.2693 20.78 12.5493 20.33C14.6493 19.55 14.9992 15.33 14.9992 12.41C14.9992 9.48996 14.6493 5.28005 12.5493 4.50005Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M20.6602 6.71997C22.1593 8.22011 23.0015 10.2542 23.0015 12.375C23.0015 14.4958 22.1593 16.5299 20.6602 18.03"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M18.5391 15.95C19.4764 15.0123 20.003 13.7407 20.003 12.4149C20.003 11.0891 19.4764 9.81764 18.5391 8.88"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M10.9395 17.72C12.9395 19.5 15.3895 20.72 16.5495 20.33C18.6495 19.55 18.9995 15.3299 18.9995 12.4099C18.9995 11.5999 18.9995 10.68 18.8895 9.77002"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M18.1292 6.28008C18.0012 5.89129 17.795 5.53273 17.5233 5.22661C17.2516 4.9205 16.9201 4.67327 16.5493 4.50005C15.3193 4.04005 12.7093 5.49996 10.5493 7.40996H8.94922C7.88835 7.40996 6.87093 7.83145 6.12079 8.58159C5.37064 9.33174 4.94922 10.3491 4.94922 11.41V13.41C4.9489 14.1811 5.17151 14.936 5.59021 15.5835C6.00892 16.2311 6.60585 16.7438 7.3092 17.06"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M22 2.42004L2 22.42"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              )}
            </button>

            <button
              onClick={() => changeCurrentPara(selectedTime)}
              className="cursor-pointer rounded-lg border border-white/30 bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              New Paragraph
            </button>
          </div>
        </section>
      </main>

      {isCapsOn && <CapsAlert />}

      <ResultPopUp
        isOpen={isFinished}
        wpm={wpm}
        accuracy={acc}
        mistakes={mistake}
        next={() => changeCurrentPara(selectedTime)}
      />
    </div>
  );
};

export default TypingArea;
