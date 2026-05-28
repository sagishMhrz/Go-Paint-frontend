import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Colors", href: "/colors" },
  { label: "Find Painters", href: "/find-painters" },
  { label: "How It Works", href: "/how-it-works" },
];

export default function Header({ forceScrolled = false } = {}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeOnWide = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", closeOnWide);
    return () => mq.removeEventListener("change", closeOnWide);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const effectiveScrolled = forceScrolled || scrolled;

  const navLinkClass = effectiveScrolled
    ? "text-sm font-medium text-slate-600 transition hover:text-slate-900"
    : "text-sm font-medium text-white/90 transition hover:text-white";

  const menuBtnClass = effectiveScrolled
    ? "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 text-slate-700 md:hidden"
    : "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 text-white md:hidden";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        effectiveScrolled
          ? "border-b border-neutral-200 bg-white shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="GoPaint home"
          className="shrink-0 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF8022]"
        >
          <span className="font-heading text-2xl font-bold tracking-tight">
            <span
              className={`transition-colors duration-300 ${
                effectiveScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              Go
            </span>
            <span className="text-[#FF8022]">Paint</span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={navLinkClass}
              onClick={(e) => {
                if (item.href.startsWith("/")) {
                  e.preventDefault();
                  navigate(item.href);
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={goToLogin}
            className="rounded-lg bg-[#FF8022] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
          >
            Sign In
          </button>
        </div>

        <button
          type="button"
          className={menuBtnClass}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">Toggle menu</span>
          {menuOpen ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t px-4 py-4 md:hidden ${
          effectiveScrolled
            ? "border-neutral-200 bg-white"
            : "border-white/15 bg-black/50 backdrop-blur-md"
        } ${menuOpen ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-lg px-2 py-2.5 text-sm font-medium ${
                effectiveScrolled
                  ? "text-slate-700 hover:bg-neutral-50"
                  : "text-white/90 hover:bg-white/10"
              }`}
              onClick={(e) => {
                if (item.href.startsWith("/")) {
                  e.preventDefault();
                  navigate(item.href);
                }
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={goToLogin}
            className="mt-2 w-full rounded-lg bg-[#FF8022] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#e8721a]"
          >
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
}
