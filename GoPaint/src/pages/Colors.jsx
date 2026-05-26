import { useMemo, useState } from "react";

const TONE_TABS = ["All Colors", "Warm", "Cool", "Pastel", "Neutral"];

const ALL_COLORS = [
  { name: "Terracotta Bliss", hex: "#C4714A", tones: ["Warm", "Neutral"] },
  { name: "Sage Whisper", hex: "#8FAF8A", tones: ["Cool", "Pastel"] },
  { name: "Dusty Rose", hex: "#D4A5A5", tones: ["Pastel", "Warm"] },
  { name: "Midnight Slate", hex: "#3D4A5C", tones: ["Cool", "Neutral"] },
  {
    name: "Warm Ivory",
    hex: "#F5ECD7",
    tones: ["Warm", "Neutral", "Pastel"],
  },
  { name: "Forest Moss", hex: "#5C7A4E", tones: ["Cool"] },
  { name: "Peach Sorbet", hex: "#F4A97F", tones: ["Warm", "Pastel"] },
  { name: "Lavender Mist", hex: "#C5BBD8", tones: ["Pastel", "Cool"] },
  { name: "Charcoal Smoke", hex: "#5A5A5A", tones: ["Neutral", "Cool"] },
  { name: "Coral Reef", hex: "#E8735A", tones: ["Warm"] },
  { name: "Sky Haze", hex: "#A8C5D8", tones: ["Cool", "Pastel"] },
  { name: "Butter Cream", hex: "#F7E8B0", tones: ["Warm", "Pastel"] },
];

const FEATURED_PALETTES = [
  {
    name: "Himalayan Sunrise",
    colors: ["#C4714A", "#F4A97F", "#F5ECD7", "#D4A5A5"],
    likes: 342,
  },
  {
    name: "Urban Minimal",
    colors: ["#3D4A5C", "#5A5A5A", "#F5ECD7", "#8FAF8A"],
    likes: 218,
  },
  {
    name: "Garden Fresh",
    colors: ["#5C7A4E", "#8FAF8A", "#F7E8B0", "#F5ECD7"],
    likes: 195,
  },
  {
    name: "Pastel Dreams",
    colors: ["#C5BBD8", "#D4A5A5", "#F4A97F", "#F7E8B0"],
    likes: 287,
  },
];

function HeartIcon({ filled = false }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#FF7A30" : "none"}
      stroke={filled ? "#FF7A30" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function Colors() {
  const [activeTone, setActiveTone] = useState("All Colors");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => new Set());

  const filteredColors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tone = activeTone === "All Colors" ? null : activeTone;

    return ALL_COLORS.filter((c) => {
      const matchesTone = tone ? c.tones.includes(tone) : true;
      if (!matchesTone) return false;

      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.hex.toLowerCase().includes(q)
      );
    });
  }, [activeTone, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-20 sm:h-24" aria-hidden />

      <section className="scroll-mt-24 bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Color Explorer
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              Discover trending colors, create palettes, and find the perfect
              shade for your space.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <label className="relative block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colors by name..."
                className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#FF7A30] focus:ring-0"
              />
            </label>
          </div>

          <div className="mx-auto mt-6 flex flex-wrap justify-center gap-2">
            {TONE_TABS.map((tab) => {
              const selected = activeTone === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTone(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selected
                      ? "bg-[#FF7A30] text-white shadow-sm"
                      : "border border-neutral-200 bg-white text-slate-600 hover:bg-neutral-50"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-slate-900">
              {activeTone}
            </h2>
            <span className="text-xs font-medium text-slate-500">
              {filteredColors.length} colors
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6">
            {filteredColors.map((c) => {
              const fav = favorites.has(c.hex);
              return (
                <article
                  key={c.hex}
                  className="group relative overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
                >
                  <div
                    className="aspect-[5/4] w-full rounded-t-xl"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    aria-label={fav ? "Remove favorite" : "Add favorite"}
                    onClick={() => {
                      setFavorites((prev) => {
                        const next = new Set(prev);
                        if (next.has(c.hex)) next.delete(c.hex);
                        else next.add(c.hex);
                        return next;
                      });
                    }}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm"
                  >
                    <HeartIcon filled={fav} />
                  </button>
                  <div className="p-3">
                    <p className="font-body text-sm font-semibold text-slate-900">
                      {c.name}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">
                      {c.hex}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Featured Palettes
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-1 font-body text-sm font-semibold text-[#FF7A30] transition hover:text-[#e86d28]"
              onClick={(e) => e.preventDefault()}
            >
              View All
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PALETTES.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-xl border border-neutral-100 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-2">
                  {p.colors.map((hex) => (
                    <div
                      key={hex}
                      className="h-10 flex-1 rounded-lg ring-1 ring-black/5"
                      style={{ backgroundColor: hex }}
                      title={hex}
                      aria-hidden
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-body text-sm font-semibold text-slate-900">
                    {p.name}
                  </p>
                  <span className="flex items-center gap-1 font-body text-xs text-slate-400">
                    <span aria-hidden className="text-[#FF7A30]">
                      ♥
                    </span>
                    {p.likes}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#121212] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create Your Own Palette
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            Mix and match colors, save your favorites and share your unique
            palettes with the community.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FF7A30] px-8 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-[#e86d28]"
          >
            Try AI Design
          </button>
        </div>
      </section>
    </div>
  );
}
