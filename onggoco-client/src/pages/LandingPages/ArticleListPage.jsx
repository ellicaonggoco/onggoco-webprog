import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button";
import ArticleList from "../../components/ArticleList";

// Log the API_URL to confirm it's correct on the live site
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log("ArticleListPage - API_URL used:", API_URL);

// Temporary static data (remove once API works)
const FALLBACK_ARTICLES = [
  {
    slug: "welcome",
    title: "Welcome to Our Blog",
    paragraphs: ["This is a fallback article while we fix the API connection."],
    preview: "A temporary article to show that the component works.",
    image: "",
  },
];

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    console.log("ArticleListPage - useEffect running");
    const fetchArticles = async () => {
      try {
        console.log("Fetching from:", `${API_URL}/articles/active`);
        const { data } = await axios.get(`${API_URL}/articles/active`);
        console.log("API response:", data);
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map((article) => ({
            ...article,
            paragraphs: Array.isArray(article.paragraphs)
              ? article.paragraphs
              : [],
            preview:
              article.preview ||
              article.paragraphs?.[0]?.substring(0, 150) ||
              "",
          }));
          setArticles(normalized);
          setUsingFallback(false);
        } else {
          // No data from API, use fallback for testing
          console.warn("API returned empty, using fallback articles");
          setArticles(FALLBACK_ARTICLES);
          setUsingFallback(true);
        }
      } catch (err) {
        console.error("Error fetching active articles:", err);
        // Use fallback on error
        setArticles(FALLBACK_ARTICLES);
        setUsingFallback(true);
        setError("Failed to load articles from server. Showing fallback.");
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
          {usingFallback && (
            <p className="text-yellow-400 text-sm mt-2">
              ⚠️ Using fallback articles – API connection issue
            </p>
          )}
        </div>

        {loading && <p className="text-zinc-400">Loading articles...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <ArticleList articles={articles} />}
      </section>
    </div>
  );
};

export default ArticleListPage;
