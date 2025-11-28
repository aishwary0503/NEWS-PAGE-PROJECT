// components/TopGrid.js
import Link from "next/link";
import Image from "next/image";

export default function TopGrid({ topArticles = [] }) {
  if (!topArticles || topArticles.length === 0) return null;

  const hero = topArticles[0];
  const others = topArticles.slice(1, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      {/* Hero */}
      <Link
        href={`/articles/${hero.slug}`}
        className="col-span-1 md:col-span-2 block rounded overflow-hidden shadow-lg"
      >
        <div className="relative h-64 md:h-96">
          <Image src={hero.image} alt={hero.title} fill style={{ objectFit:"cover" }} />
        </div>
        <div className="p-4 bg-white">
          <h2 className="text-2xl md:text-3xl font-bold">{hero.title}</h2>
          <p className="text-sm text-gray-600 mt-2 hidden md:block">{hero.summary}</p>
        </div>
      </Link>

      {/* Right small cards */}
      <div className="space-y-4">
        {others.map((a) => (
          <Link
            key={a.id}
            href={`/articles/${a.slug}`}
            className="flex gap-3 items-center p-2 border rounded hover:shadow"
          >
            <div className="relative w-24 h-16 flex-shrink-0">
              <Image src={a.image} alt={a.title} fill style={{ objectFit: "cover" }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{a.title}</h3>
              <p className="text-xs text-gray-500">
                {a.author} • {new Date(a.publishedAt).toISOString().split("T")[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
