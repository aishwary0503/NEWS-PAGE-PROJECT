
import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import ArticleCard from "../components/ArticleCard";
import BreakingTicker from "../components/BreakingTicker";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import { getAllArticles } from "../lib/api";

const CATEGORIES = ["All", "Sports", "National", "Business", "Lifestyle", "Trending"];

export default function Home({ articles }) {
  // client state
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  // filter + search
  const filtered = useMemo(() => {
    let list = articles;

    // CATEGORY FILTER FIXED
    if (category === "Trending") {
      list = list.filter((a) => a.isTrending === true);
    } else if (category !== "All") {
      list = list.filter((a) => a.category === category);
    }

    // SEARCH FILTER
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.summary || "").toLowerCase().includes(q) ||
          (a.content || "").toLowerCase().includes(q)
      );
    }

    // SORT BY NEWEST FIRST
    return list.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }, [articles, category, query]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  // trending sidebar
  const trending = useMemo(() => {
    const t = articles.filter((a) => a.isTrending === true);
    if (t.length > 0) return t.slice(0, 5);

    return [...articles]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);
  }, [articles]);

  // category + search handlers
  const onCategory = (c) => {
    setCategory(c);
    setPage(1);
  };
  const onSearch = (q) => {
    setQuery(q);
    setPage(1);
  };

  return (
    <Layout title="Latest News - LiveHindustan Clone">
      <div className="w-full bg-red-700 text-white py-2 px-4 mb-2">
        <BreakingTicker text="City Marathon Sees Thousands Running for a Cause • Monsoon Rains Bring Relief • Tech Startup Raises Series A Funding" />
      </div>

      <div className="container mx-auto px-4">
        
        {/* Search */}
        <SearchBar value={query} onChange={onSearch} />

        {/* Categories */}
        <div className="flex gap-3 flex-wrap my-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {pageItems.length === 0 ? (
              <div className="p-6 bg-white/5 rounded">No articles found.</div>
            ) : (
              pageItems.map((a) => <ArticleCard key={a.id} article={a} />)
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div>
                Page {page} of {totalPages}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded border bg-white/5"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded border bg-white/5"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Trending items={trending} />

            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold mb-3 text-gray-900">Top Stories</h3>
              <ul className="text-sm space-y-2">
                {articles.slice(0, 5).map((article) => (
                  <li key={article.id}>
                    <a href={`/articles/${article.slug}`} className="hover:underline text-gray-800">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles();
  return {
    props: { articles },
    revalidate: 60,
  };
}
