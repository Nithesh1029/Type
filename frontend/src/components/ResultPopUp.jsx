import React from "react";
import { getResultMeme } from "./helper";
const ResultPopUp = ({ isOpen, wpm, accuracy, mistakes, next }) => {
  if (!isOpen) return null;

  const meme=getResultMeme(wpm);
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
    <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 text-center text-slate-200 shadow-2xl shadow-black/50">
      {/* Top glow/header */}
      <div className="border-b border-white/10 bg-linear-to-r from-cyan-500/10 via-slate-950 to-emerald-500/10 px-6 py-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Typing Arena
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Test Complete
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Here is your typing performance.
        </p>
      </div>

      <div className="p-5 sm:p-6">
        {/* Result stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-3 sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              WPM
            </p>
            <p className="mt-1 text-2xl font-bold text-cyan-300 sm:text-3xl">
              {wpm}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-3 sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Accuracy
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-300 sm:text-3xl">
              {accuracy}%
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-3 sm:p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Errors
            </p>
            <p className="mt-1 text-2xl font-bold text-rose-300 sm:text-3xl">
              {mistakes}
            </p>
          </div>
        </div>

        {/* Meme image */}
        <div className="mt-6 flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-2 shadow-inner">
          <img
            src={meme.image}
            alt={meme.title || "Typing test result meme"}
            className="h-full w-full rounded-xl object-contain"
          />
        </div>

        {/* Button */}
        <button
          onClick={next}
          className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300 active:scale-[0.98] cursor-pointer"
        >
          Next Test
        </button>
      </div>
    </div>
  </div>
);
};

export default ResultPopUp;