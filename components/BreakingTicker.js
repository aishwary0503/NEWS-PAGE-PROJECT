import Marquee from "react-fast-marquee";

export default function BreakingTicker({ text }) {
  return (
    <div className="bg-red-700 text-white flex items-center gap-6 px-4 py-2 w-full overflow-hidden">

      {/* BREAKING label */}
      <span className="font-bold text-white text-lg whitespace-nowrap">
        Breaking
      </span>

      {/* Ticker text */}
      <div className="flex-1 overflow-hidden">
        <Marquee gradient={false} pauseOnHover={true} speed={40}>
          <span className="text-white text-base px-4">{text}</span>
        </Marquee>
      </div>
    </div>
  );
}
