import Layout from "../../components/Layout";
import Image from "next/image";
import fs from "fs";
import path from "path";

export default function ArticlePage({ article }) {
  return (
    <Layout title={article.title} description={article.summary} ogImage={article.image}>
      <article className="max-w-4xl mx-auto px-6 py-10">

        {/* Trending badge */}
        {article.isTrending && (
          <div className="inline-block mb-4 px-3 py-1 text-sm bg-red-600 text-white rounded-full">
            🔥 Trending
          </div>
        )}

        {/* Category + Date + Read time */}
        <div className="text-sm text-amber-800 mb-3 uppercase tracking-wide">
          {article.category} • {new Date(article.publishedAt).toDateString()} • {article.readTime || 4} min read
        </div>

        {/* Title */}
        <h1 className="text-5xl font-serif font-bold text-black leading-tight mb-6">
          {article.title}
        </h1>

        {/* Main Image */}
        <div className="relative w-full h-96 rounded overflow-hidden mb-6 shadow-xl">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Author */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-sm text-gray-700">
          Written by <strong className="text-black">{article.author}</strong>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "articles.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const paths = data.map((a) => ({
    params: { slug: a.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "data", "articles.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const article = data.find((a) => a.slug === params.slug);

  return {
    props: { article }
  };
}
    