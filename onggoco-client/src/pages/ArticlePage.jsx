import Button from "../components/Button";
import gunita from "../assets/logo/gunita.jpg";
import nc from "../assets/logo/ncII.jpg";
import mitigate from "../assets/logo/mitigate.jpg";
import lugawan from "../assets/logo/fourelugawan.jpg";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-10 bg-[#0b0b0b] text-white">
      <section className="border-y border-white/10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
          Articles
        </p>

        <h1 className="max-w-xl text-4xl sm:text-5xl font-extrabold leading-tight text-white">
          Insights on Code, Design, and Development
        </h1>

        <p className="mt-4 max-w-lg text-white/70 leading-7">
          A collection of articles detailing my journey through the MERN stack,
          UI/UX experiments, and the technical challenges I’ve solved along the
          way.
        </p>

        <div className="mt-6">
          <Button to="/" variant="primary">
            Back Home
          </Button>
        </div>
      </section>

      <section className="border-y border-white/10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
            Featured Articles
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-white">
            Articles that showcase my technical and design insights.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <article
            className="group rounded-2xl border border-white/10 bg-[#111] p-5
            hover:border-orange-500 transition hover:-translate-y-1"
          >
            <div className="relative flex aspect-video w-full items-center justify-center rounded-xl bg-[#0b0b0b] border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[#ff6b00]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={mitigate}
                alt="MitigatePlus"
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Article 01
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Beyond the Mobile App: Migrating MitigatePlus to MERN
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/70">
              A deep dive into transitioning from Flutter to a full-stack web
              ecosystem for disaster risk management.
            </p>

            <Button className="mt-4 w-full" variant="primary">
              Read More
            </Button>
          </article>

          <article
            className="group rounded-2xl border border-white/10 bg-[#111] p-5
            hover:border-orange-500 transition hover:-translate-y-1"
          >
            <div className="relative flex aspect-video w-full items-center justify-center rounded-xl bg-[#0b0b0b] border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[#ff6b00]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={lugawan}
                alt="UX Design"
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Article 02
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Heuristic Evaluation: Redesigning UX
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/70">
              Applying Jakob Nielsen’s 10 Usability Heuristics to improve
              digital interfaces and user flow.
            </p>

            <Button className="mt-4 w-full" variant="primary">
              Read More
            </Button>
          </article>

          <article
            className="group rounded-2xl border border-white/10 bg-[#111] p-5
            hover:border-orange-500 transition hover:-translate-y-1"
          >
            <div className="relative flex aspect-video w-full items-center justify-center rounded-xl bg-[#0b0b0b] border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[#ff6b00]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={nc}
                alt="IT Certification"
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Article 03
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Standards of Excellence: NCII Journey
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/70">
              Reflecting on my technical certification journey and its impact on
              my development workflow at National University.
            </p>

            <Button className="mt-4 w-full" variant="primary">
              Read More
            </Button>
          </article>

          <article
            className="group rounded-2xl border border-white/10 bg-[#111] p-5
            hover:border-orange-500 transition hover:-translate-y-1"
          >
            <div className="relative flex aspect-video w-full items-center justify-center rounded-xl bg-[#0b0b0b] border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[#ff6b00]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={gunita}
                alt="Gunita Studios"
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
              Article 04
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Creative Direction in Digital Storytelling
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/70">
              Insights from managing Gunita Studios and the visual marketing of
              the short film "Masarap Pag Buo".
            </p>

            <Button className="mt-4 w-full" variant="primary">
              Read More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
