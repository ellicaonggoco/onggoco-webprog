import Button from "../../components/Button";
import ArticleList from "../../components/ArticleList";
import articles from "../../assets/article-content.js";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-[#0b0b0b] min-h-screen">
      <section className="border-y border-white/10 bg-zinc-900/50 px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
          Featured articles in a simple card grid
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
          Insights on technical and design workflows, featuring my work with
          MitigatePlus and UI/UX redesigns.
        </p>
        <div className="mt-6">
          <Button to="/" variant="primary">
            Back Home
          </Button>
        </div>
      </section>

      <section className="border-y border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Article card grid
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;
