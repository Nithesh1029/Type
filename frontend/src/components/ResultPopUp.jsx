import React from "react";
import { getResultMeme } from "./helper";
const ResultPopUp = ({ isOpen, wpm, accuracy, mistakes, next }) => {
  if (!isOpen) return null;

  const meme = getResultMeme(wpm);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-black text-center text-white shadow-2xl shadow-white/5">
        <div className="border-b border-white/20 px-6 py-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Typing Arena
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Test Complete
          </h1>

          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-400">
            Press
            <kbd className="rounded-lg border border-white/20 bg-linear-to-b from-neutral-700 to-neutral-900 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
              ⇥ TAB
            </kbd>
            <span>or</span>
            <kbd className="rounded-lg border border-white/20 bg-linear-to-b from-neutral-700 to-neutral-900 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
              ↵ ENTER
            </kbd>
            <span>to continue</span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-white/20 bg-black p-3 sm:p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                WPM
              </p>

              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {wpm}
              </p>
            </div>

            <div className="rounded-lg border border-white/20 bg-black p-3 sm:p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Accuracy
              </p>

              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {accuracy}%
              </p>
            </div>

            <div className="rounded-lg border border-white/20 bg-black p-3 sm:p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Errors
              </p>

              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {mistakes}
              </p>
            </div>
          </div>

          <div className="mt-6 flex h-52 w-full items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-black p-2">
            <img
              src={meme.image}
              alt={meme.title || "Typing test result meme"}
              className="h-full w-full rounded-md object-contain"
            />
          </div>

          <button
            onClick={next}
            className="mt-6 w-full cursor-pointer rounded-lg bg-white px-4 py-3 font-semibold text-black transition hover:bg-neutral-200 active:scale-[0.98]"
          >
            Next Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopUp;
