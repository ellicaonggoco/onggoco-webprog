import { Link } from "react-router-dom";
import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="rounded-3xl border-2 border-white/10 bg-zinc-900/40 p-4"
        >
          <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-800 overflow-hidden">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="h-12 w-12 border-2 border-zinc-700 bg-zinc-800" />
            )}
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-50">
            Article {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-200">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {article.content[0].substring(0, 150)}...
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4 w-full" variant="primary">
              Read More
            </Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
