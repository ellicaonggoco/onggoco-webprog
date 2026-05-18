import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";

function ArticlePage() {
  const { name } = useParams(); // name is the slug
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch all active articles and find by slug (or implement single article endpoint)
        const { data } = await axios.get(
          "http://localhost:5000/api/articles/active",
        );
        const found = data.find((a) => a.slug === name);
        if (!found) throw new Error("Article not found");
        setArticle(found);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [name]);

  if (loading) return <div className="text-white p-8">Loading article...</div>;
  if (error || !article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">
              Article not found
            </h1>
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-white/10 bg-zinc-900/40 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles" variant="primary">
              Back to Articles
            </Button>
          </div>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-300">
            Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-100 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {article.slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </div>
      </section>

      <section className="border-y-2 border-white/10 bg-zinc-900/40 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] border-2 border-white/10 bg-zinc-900 overflow-hidden mb-8">
            <img
              src={article.image || "/placeholder.png"}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {(article.paragraphs || []).map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-7 text-zinc-200 whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-9 border-t-1 border-zinc-500 pt-6">
            <Button to="/articles" variant="primary">
              Back to Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
