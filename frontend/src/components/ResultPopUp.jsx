import React from "react";
import { getResultMeme } from "./helper";
const ResultPopUp = ({ isOpen, wpm, accuracy, mistakes, next }) => {
  if (!isOpen) return null;

  const meme=getResultMeme(wpm);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-700 bg-gray-800 p-6 text-center text-gray-200 shadow-xl">
        <h1 className="mb-6 text-2xl font-bold text-yellow-400">
          Test Complete
        </h1>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400">WPM</p>
            <p className="text-2xl font-bold text-green-400">{wpm}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Accuracy</p>
            <p className="text-2xl font-bold text-blue-400">{accuracy}%</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Mistakes</p>
            <p className="text-2xl font-bold text-red-400">{mistakes}</p>
          </div>
        </div>
        <div className="mt-6 h-48 w-full overflow-hidden rounded-lg">
  <img
    src={meme.image}
    alt={meme.title || "Typing test result meme"}
    className="h-full w-full object-contain"
  />
</div>


        <button
          onClick={next}
          className="mt-6 w-full rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300 cursor-pointer"
        >
          Next Test
        </button>
      </div>
    </div>
  );
};

export default ResultPopUp;