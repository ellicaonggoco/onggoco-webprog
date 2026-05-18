import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button";
import ArticleList from "../../components/ArticleList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/articles/active`);
        const normalized = data.map((article) => ({
          ...article,
          paragraphs: Array.isArray(article.paragraphs)
            ? article.paragraphs
            : [],
          preview:
            article.preview || article.paragraphs?.[0]?.substring(0, 150) || "",
        }));
        setArticles(normalized);
      } catch (err) {
        console.error("Error fetching active articles:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

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

        {loading && <p className="text-zinc-400">Loading articles...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <ArticleList articles={articles} />}
      </section>
    </div>
  );
};

export default ArticleListPage;
