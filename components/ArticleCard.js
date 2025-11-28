import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({ article, variant = "regular" }) {
  if (!article) return null;

  const readTime = article.readTime ? `${article.readTime} min read` : "";

  // Sidebar compact card
  if (variant === "compact") {
    return (
      <Link href={`/articles/${article.slug}`} className="flex gap-3 items-start p-2">
        <div className="relative w-28 h-20 flex-shrink-0 rounded overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
            {article.isTrending && <span className="text-red-600 text-xs">🔥</span>}
            {article.title}
          </h4>
          <p className="text-xs text-gray-500">{readTime}</p>
        </div>
      </Link>
    );
  }

  // MAIN CARD
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block border rounded overflow-hidden shadow hover:shadow-lg transition"
    >
      {/* IMAGE + Overlay Title */}
      <div className="relative w-full h-56">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />

        {/* dark fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

        {/* TITLE */}
        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-md flex items-center gap-2">
          {article.isTrending && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">🔥 Trending</span>
          )}
          {article.title}
        </h3>
      </div>

      {/* TEXT AREA */}
      <div className="p-4 bg-black text-gray-200">
        <div className="inline-block text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-200 mb-2">
          {article.category}
        </div>

        <p className="text-sm text-gray-300 mt-2">{article.summary}</p>

        <div className="mt-3 text-xs text-gray-400 flex justify-between">
          <span>{article.author}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </Link>
  );
}

