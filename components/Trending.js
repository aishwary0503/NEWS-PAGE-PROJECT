import Link from "next/link";
import Image from "next/image";

export default function Trending({ items }) {
  if (!items || !items.length) return null;

  return (
    <div className="p-4 rounded shadow bg-white">
      <h3 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
        🔥 Trending
      </h3>

      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.id} className="flex gap-3 items-start">
            <Link href={`/articles/${it.slug}`} className="flex gap-3 items-start">
              <div className="w-20 h-12 relative flex-shrink-0 rounded overflow-hidden">
                <Image src={it.image} alt={it.title} fill className="object-cover" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  {it.isTrending && <span className="text-red-600 text-xs">🔥</span>}
                  {it.title}
                </div>
                <div className="text-xs text-gray-500">{it.views} views • {it.readTime} min read</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
