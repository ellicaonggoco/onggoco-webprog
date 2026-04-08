// src/pages/NotFoundPage.jsx
import React from "react";
import Button from "../components/Button";
import notFoundImage from "../assets/logo/notfound.png"; // Import your meme image

const NotFoundPage = () => {
  return (
    // 1. New horizontal flex container
    <div className="flex min-h-screen items-center bg-[#0b0b0b] px-6 lg:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row">
        <div className="w-full max-w-lg flex-shrink-0 lg:w-1/2">
          <img
            src={notFoundImage}
            alt="404 Meme: Aggressive Rage Face"
            className="w-full h-full object-contain"
          />
        </div>

        {/* TEXT ON THE RIGHT (STILL CENTERED IN THE ROW) */}
        {/* 4. This new div contains all your text and button. */}
        <div className="flex flex-1 flex-col items-center justify-center text-center lg:items-start lg:text-left">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-500">
            404 ERROR
          </p>

          <h1 className="max-w-xl text-5xl font-bold leading-tight text-white sm:text-7xl">
            <span className="text-orange-500">Ooops!</span> Page Not Found
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
            The link you followed might be broken or the page has been moved.
            Let's get you back on track.
          </p>

          <div className="mt-10">
            <Button to="/" variant="primary">
              RETURN HOME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
