// components/Header.js
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        
        <Link href="/" className="text-3xl font-serif font-bold text-amber-800">
          MAGAZINE DAILY
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-700">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          <Link href="/" className="hover:text-amber-700">Culture</Link>
          <Link href="/" className="hover:text-amber-700">Features</Link>
        </nav>
      </div>
    </header>
  );
}
