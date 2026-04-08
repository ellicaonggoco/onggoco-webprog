import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-zinc-950 bg-zinc-850 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-100">
            National University <span className="text-zinc-500">| IT</span>
          </h2>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            Web Progression Lab with Sir Cy
          </p>
        </div>

        <div className="text-center sm:text-right">
          <p className="text-sm text-zinc-400">
            © 2026 Ellica Chris M. Onggoco
          </p>
          <p className="text-[10px] text-zinc-500 mt-1">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
