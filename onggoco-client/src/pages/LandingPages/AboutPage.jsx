import Button from "../../components/Button";
import mestudying from "../../assets/logo/mestudying.png";
import ncII from "../../assets/logo/ncII.jpg";
import award from "../../assets/logo/award.jpg";
import techfiesta from "../../assets/logo/techfiesta.jpg";
import mitigate from "../../assets/logo/mitigate.jpg";
import aboutimage from "../../assets/logo/about.webp";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-[#0b0b0b]">
      {/* Hero Section */}
      <section className="border-y border-white/10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Rectangular Image Holder */}
          <div className="w-full rounded-3xl border border-white/10 bg-[#111] p-2 shadow-lg">
            <div className="flex aspect-video items-center justify-center rounded-2xl overflow-hidden">
              <img
                src={aboutimage}
                alt="Ellica Chris"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Hero Content Block - Increased Sizes */}
          <div>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-white/40">
              About Section
            </p>

            <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Web Developer & IT Student.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              I am a student at National University Manila pursuing a BS in
              Information Technology. I specialize in full-stack web development
              and user-centric design.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/" variant="primary" className="px-8 py-3 text-lg">
                Back Home
              </Button>
              <Button to="/articles" className="px-8 py-3 text-lg">
                Open Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Overview Section */}
      <section className="border-y border-white/10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Quick summary blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#111] p-5 hover:border-orange-500 transition duration-300 hover:-translate-y-1">
            <p className="text-3xl font-bold text-orange-500">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Years in Tech
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111] p-5 hover:border-orange-500 transition duration-300 hover:-translate-y-1">
            <p className="text-3xl font-bold text-orange-500">05</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Projects
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111] p-5 hover:border-orange-500 transition duration-300 hover:-translate-y-1">
            <p className="text-3xl font-bold text-orange-500">01</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Clients
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111] p-5 hover:border-orange-500 transition duration-300 hover:-translate-y-1">
            <p className="text-3xl font-bold text-orange-500">02</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Focus Areas
            </p>
          </div>
        </div>
      </section>

      {/* Experience & Background Section */}
      <section className="border-y border-white/10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Section Flow
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Experience & Background
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-2xl border border-white/10 bg-[#111] p-5 hover:border-orange-500 transition">
                <h3 className="text-lg font-semibold text-white">
                  MitigatePlus Development
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Lead developer for a Community-Based Disaster Risk Management
                  (CBDRM) system. Successfully transitioned the platform from
                  Flutter to a full-stack MERN ecosystem (MongoDB, Express,
                  React, Node.js), focusing on system architecture, threat
                  modeling, and real-time public safety notifications.
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-[#111] p-5 hover:border-orange-500 transition">
                <h3 className="text-lg font-semibold text-white">
                  Gunita Studios & Media
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Managed digital branding and commercial photography for Gunita
                  Studios. Served as the social media manager and set
                  photographer for the short film "Masarap Pag Buo,"
                  orchestrating character reveals and marketing campaigns
                  leading up to its October 2025 premiere.
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-[#111] p-5 hover:border-orange-500 transition">
                <h3 className="text-lg font-semibold text-white">
                  Academic Focus
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Currently pursuing a degree in Information Technology at
                  National University Manila. I specialize in full-stack
                  development and system architecture, focusing on building
                  scalable, user-centric solutions. Through projects like
                  MitigatePlus, I apply my technical expertise in the MERN stack
                  and UI/UX principles to create robust platforms that address
                  real-world community challenges and disaster risk management.
                </p>
              </article>
            </div>
          </div>

          {/* Project Gallery Sidebar */}
          <div className="rounded-2xl border border-white/10 bg-[#111] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Project Gallery
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {[ncII, award, techfiesta, mitigate].map((img, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-black"
                >
                  <img
                    src={img}
                    alt="Project Highlight"
                    className="h-full w-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>
              ))}
            </div>

            <Button
              to="/NotFoundPage"
              className="mt-5 w-full"
              variant="primary"
            >
              View Section
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
