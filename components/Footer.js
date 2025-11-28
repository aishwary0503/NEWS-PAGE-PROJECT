// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="font-bold">Demo News</div>
            <div>Built with Next.js • For educational assignment</div>
          </div>
          <div className="flex gap-4">
            <a className="hover:underline">About</a>
            <a className="hover:underline">Contact</a>
            <a className="hover:underline">Privacy</a>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">© {new Date().getFullYear()} Demo News</div>
      </div>
    </footer>
  );
}
