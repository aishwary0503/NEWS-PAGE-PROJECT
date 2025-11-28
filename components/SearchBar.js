export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-4">
      <input
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  placeholder="Search articles..."
  className="
    w-full px-4 py-2 rounded-lg
    bg-white text-black
    border border-gray-300
    focus:border-red-500 focus:ring-2 focus:ring-red-400
    transition
  "
/>

    </div>
  );
}
