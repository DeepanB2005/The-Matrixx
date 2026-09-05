import {
  ExternalLink,
  Newspaper,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import tech1 from "./tech1.jpg";
import tech2 from "./tech2.jpg";
import tech3 from "./tech3.jpg";
import tech4 from "./tech4.jpg";

const fallbackImages = [tech1, tech2, tech3, tech4];
const cacheKey = "matrixx-tech-news-newsdata";
const cacheDuration = 15 * 60 * 1000;

export default function LiveTechNews() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  const loadNews = useCallback(async (forceRefresh = false) => {
    const key = import.meta.env.VITE_NEWS_DATA_API;

    if (!key) {
      setStatus("missing");
      return;
    }

    const cached = sessionStorage.getItem(cacheKey);
    if (!forceRefresh && cached) {
      try {
        const { articles: cachedArticles, savedAt } = JSON.parse(cached);
        if (Array.isArray(cachedArticles) && Date.now() - savedAt < cacheDuration) {
          setArticles(cachedArticles);
          setStatus("ready");
          return;
        }
      } catch { sessionStorage.removeItem(cacheKey); }
    }

    setStatus("loading");
    setRateLimited(false);

    try {
      const query = new URLSearchParams({
        apikey: key,
        category: "computer Science",
        language: "en",
        country: "in",
        size: "5",
      });

      const response = await fetch(
        `https://newsdata.io/api/1/latest?${query.toString()}`
      );

      if (response.status === 429) {
        setRateLimited(true);
        throw new Error("NewsData rate limited this request");
      }
      const result = await response.json();

      if (
        !response.ok ||
        result.error ||
        !Array.isArray(result.results)
      ) {
        throw new Error("Unable to fetch news");
      }

      setArticles(result.results);
      sessionStorage.setItem(cacheKey, JSON.stringify({ articles: result.results, savedAt: Date.now() }));
      setCurrentIndex(0);
      setStatus("ready");
    } catch (error) {
      console.error("NewsData error:", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (
      status !== "ready" ||
      articles.length <= 1 ||
      isPaused
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === articles.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length, status, isPaused]);

  const nextArticle = () => {
    setCurrentIndex((prev) =>
      prev === articles.length - 1 ? 0 : prev + 1
    );
  };

  const previousArticle = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? articles.length - 1 : prev - 1
    );
  };

  const currentArticle = articles[currentIndex];
  const fallbackImage = fallbackImages[currentIndex % fallbackImages.length];

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
            <Newspaper size={15} />
          Latest technology updates from India and around the world.

          </p>
        </div>

        <button 
          type="button"
          onClick={() => loadNews(true)}
          disabled={status === "loading" || rateLimited}
          aria-label="Refresh technology news"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <RefreshCw
            size={8}
            className={status === "loading" ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Loading */}
      {status === "loading" && (
        <div className="mt-3 h-[220px] animate-pulse overflow-hidden rounded-3xl bg-slate-100" />
      )}

      {/* News Slider */}
      {status === "ready" && currentArticle && (
        <div
          className="relative mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
        <div className="min-h-[110px] flex ">
              {/* Image */}
            <div className="relative min-h-[70px] overflow-hidden bg-slate-200 md:min-h-[110px] w-70">
              <img
                src={currentArticle.image_url || fallbackImage}
                alt={currentArticle.title || "Technology news"}
                className="absolute inset-0 h-full w-full object-cover transition duration-700"
                onError={(event) => {
                  if (!event.currentTarget.dataset.usingFallback) {
                    event.currentTarget.dataset.usingFallback = "true";
                    event.currentTarget.src = fallbackImage;
                  }
                }}
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Live badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                LIVE
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-5 sm:p-6 w-400">

              <div>
                {/* Source */}
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    {currentArticle.source_name || "Technology"}
                  </span>

                </div>

                {/* Title */}
                <h3 className="mt-3 text-lg font-bold leading-7 text-slate-900 sm:text-xl">
                  {currentArticle.title}
                </h3>

                {/* Description */}
                {currentArticle.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {currentArticle.description}
                  </p>
                )}
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between gap-4">

                {/* Read article */}
                {currentArticle.link && (
                  <a
                    href={currentArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Read full article
                    <ExternalLink size={14} />
                  </a>
                )}

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={previousArticle}
                    aria-label="Previous news"
                    className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-600"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={nextArticle}
                    aria-label="Next news"
                    className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-600"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slider indicators */}
          {articles.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/20 px-3 py-2 backdrop-blur">
              {articles.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Show news ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-7 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="mt-6 rounded-2xl bg-red-50 p-5 text-sm text-red-600">
          {rateLimited ? "NewsData has temporarily rate-limited this key. Please try again shortly." : "Live news is temporarily unavailable. Try refreshing shortly."}
        </div>
      )}

      {/* Missing API key */}
      {status === "missing" && (
        <div className="mt-6 rounded-2xl bg-amber-50 p-5 text-sm text-amber-700">
          Set VITE_NEWS_DATA_API in your environment file to enable live news.
        </div>
      )}

    </section>
  );
}
