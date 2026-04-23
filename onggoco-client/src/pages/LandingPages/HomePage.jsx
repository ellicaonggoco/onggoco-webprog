import Button from "../../components/Button";
import logo from "../../assets/logo/ellicaimage.png";
import skillImg01 from "../../assets/logo/git.png";
import skillImg02 from "../../assets/logo/reactnext.png";
import skillImg03 from "../../assets/logo/tailwindcss.png";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-[#0b0b0b]">
      <section className="border-y border-white/10 px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-[16px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Hi I am
            </p>
            <h1 className="font-bold leading-[0.9] text-white">
              <span className="text-zinc-400 block text-6xl mb-4">
                Ellica Chris M. Onggoco
              </span>
              <span className="text-[#ff6b00] text-6xl sm:text-7xl lg:text-6.5xl block">
                Web Developer & <br /> Designer.
              </span>
            </h1>
            <p className="mt-10 max-w-lg text-lg leading-8 text-zinc-400">
              I create simple and responsive web designs using React and
              Tailwind. This site showcases my projects, skills, and learning
              journey in web development.
            </p>
            <div className="mt-12">
              <Button
                to="/about"
                variant="primary"
                className="px-10 py-4 text-sm"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative justify-self-center lg:justify-self-end">
            <div className="absolute inset-0 rounded-full bg-[#ff6b00]/5 blur-3xl"></div>
            <div className="relative rounded-full border border-white/10 bg-zinc-900/30 p-4 sm:p-8 shadow-2xl">
              <img
                src={logo}
                alt="My Photo"
                className="h-72 w-72 sm:h-96 sm:w-96 lg:h-[500px] lg:w-[500px] object-cover rounded-full grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            My Learning Journey
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-5 hover:border-[#ff6b00]/50 transition">
            <p className="text-2xl font-bold text-[#ff6b00]">05</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Projects
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-5 hover:border-[#ff6b00]/50 transition">
            <p className="text-2xl font-bold text-[#ff6b00]">02</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Completed Activities
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-5 hover:border-[#ff6b00]/50 transition">
            <p className="text-2xl font-bold text-[#ff6b00]">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Skills Learned
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-5 hover:border-[#ff6b00]/50 transition">
            <p className="text-2xl font-bold text-[#ff6b00]">01</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Ongoing Project
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Cards
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Skills</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-zinc-900/40 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-800/50 overflow-hidden p-6">
              <img
                src={skillImg02}
                alt="React and Next.js"
                className="h-full w-full object-contain grayscale"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              React & Next.js
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Building scalable single-page applications with robust component
              architecture and modern web standards.
            </p>
            <Button to="/NotFoundPage" className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border border-white/10 bg-zinc-900/40 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-800/50 overflow-hidden p-6">
              <img
                src={skillImg03}
                alt="Tailwind CSS"
                className="h-full w-full object-contain grayscale"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              Tailwind CSS
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Writing utility-first CSS to create custom, beautiful designs
              without bloated code and ensuring responsiveness.
            </p>
            <Button to="/NotFoundPage" className="mt-4" variant="primary">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border border-white/10 bg-zinc-900/40 p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-800/50 overflow-hidden p-10">
              <img
                src={skillImg01}
                alt="Git"
                className="h-full w-full object-contain grayscale"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              Git & Github
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Maintaining clean codebases and collaborating effectively through
              version control and branching strategies.
            </p>
            <Button to="/NotFoundPage" className="mt-4" variant="primary">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
