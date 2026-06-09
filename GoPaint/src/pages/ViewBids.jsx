import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PROJECTS = {
  1: {
    id: 1,
    title: "Living Room & Master Bedroom Repaint",
    location: "Baneshwor, Kathmandu",
    budget: "NPR 25,000 – 40,000",
    totalBids: 6,
  },
  4: {
    id: 4,
    title: "Kids Room Accent Wall",
    location: "Patan, Lalitpur",
    budget: "NPR 8,000 – 15,000",
    totalBids: 2,
  },
};

const INITIAL_BIDS = [
  {
    id: 1,
    name: "Rajesh Shrestha",
    rating: 4.9,
    reviews: 127,
    verified: true,
    amount: "NPR 32,000",
    amountValue: 32000,
    timeline: "6 days",
    timelineDays: 6,
    initials: "RS",
    avatarBg: "from-teal-500 to-teal-600",
    description:
      "I have 8 years of experience in interior painting. I'll use premium Asian Paints for a smooth, long-lasting finish. Includes wall prep, 2 coats, and cleanup.",
  },
  {
    id: 2,
    name: "Suman Tamang",
    rating: 4.7,
    reviews: 89,
    verified: true,
    amount: "NPR 28,500",
    amountValue: 28500,
    timeline: "5 days",
    timelineDays: 5,
    initials: "ST",
    avatarBg: "from-amber-500 to-orange-500",
    description:
      "Specialized in residential repaints across Kathmandu Valley. I'll handle furniture covering, minor wall repairs, and a spotless handover. Free color consultation included.",
  },
  {
    id: 3,
    name: "Bikash Gurung",
    rating: 4.8,
    reviews: 156,
    verified: true,
    amount: "NPR 35,000",
    amountValue: 35000,
    timeline: "8 days",
    timelineDays: 8,
    initials: "BG",
    avatarBg: "from-violet-500 to-purple-600",
    description:
      "Certified painter with expertise in bedroom and living room projects. Using Berger Paints with primer coat included. 1-year workmanship warranty on all jobs.",
  },
];

const SORT_OPTIONS = [
  { value: "rating", label: "Sort by Rating" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "timeline", label: "Timeline: Fastest" },
];

function PinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
        strokeLinecap="round"
      />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
      title="Verified painter"
      aria-label="Verified painter"
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#FBBF24"
      aria-hidden
    >
      <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z" />
    </svg>
  );
}

function BidCard({ bid, status, onAccept, onReject }) {
  const isAccepted = status === "accepted";
  const isRejected = status === "rejected";
  const isDisabled = status === "disabled";

  if (isRejected) return null;

  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 md:p-6 ${
        isAccepted
          ? "border-emerald-200 ring-2 ring-emerald-100"
          : isDisabled
            ? "border-neutral-100 opacity-60"
            : "border-neutral-100 hover:border-neutral-200 hover:shadow-md"
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
        <div className="flex shrink-0 items-start gap-3 sm:gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white sm:h-16 sm:w-16 sm:text-base ${bid.avatarBg}`}
            aria-hidden
          >
            {bid.initials}
          </div>
          <div className="min-w-0 lg:hidden">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="font-heading text-base font-bold text-slate-900">
                {bid.name}
              </h3>
              {bid.verified && <VerifiedBadge />}
            </div>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 sm:text-sm">
              <StarIcon />
              <span className="font-semibold text-slate-700">{bid.rating}</span>
              <span>({bid.reviews} reviews)</span>
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="hidden lg:block">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="font-heading text-lg font-bold text-slate-900">
                {bid.name}
              </h3>
              {bid.verified && <VerifiedBadge />}
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <StarIcon />
              <span className="font-semibold text-slate-700">{bid.rating}</span>
              <span>({bid.reviews} reviews)</span>
            </p>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            {bid.description}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-4 border-t border-neutral-100 pt-4 sm:flex-row sm:items-end sm:justify-between lg:w-52 lg:flex-col lg:items-stretch lg:border-t-0 lg:pt-0 xl:w-56">
          <div>
            <p className="text-xs font-medium text-slate-500">Bid Amount</p>
            <p className="mt-0.5 font-heading text-xl font-bold text-slate-900 sm:text-2xl">
              {bid.amount}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Timeline: {bid.timeline}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            {isAccepted ? (
              <span className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Accepted
              </span>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onAccept(bid.id)}
                  disabled={isDisabled}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => onReject(bid.id)}
                  disabled={isDisabled}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      strokeLinecap="round"
                    />
                  </svg>
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ViewBids() {
  const { projectId } = useParams();
  const project = PROJECTS[projectId] ?? PROJECTS[1];

  const [bids, setBids] = useState(INITIAL_BIDS);
  const [bidStatuses, setBidStatuses] = useState({});
  const [acceptedBidId, setAcceptedBidId] = useState(null);
  const [sortBy, setSortBy] = useState("rating");
  const [notice, setNotice] = useState(null);

  const sortedBids = useMemo(() => {
    const list = [...bids];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.amountValue - b.amountValue);
      case "price-desc":
        return list.sort((a, b) => b.amountValue - a.amountValue);
      case "timeline":
        return list.sort((a, b) => a.timelineDays - b.timelineDays);
      default:
        return list.sort((a, b) => b.rating - a.rating);
    }
  }, [bids, sortBy]);

  const visibleCount = sortedBids.filter(
    (b) => bidStatuses[b.id] !== "rejected"
  ).length;

  const handleAccept = (bidId) => {
    const bid = bids.find((b) => b.id === bidId);
    setAcceptedBidId(bidId);
    setBidStatuses((prev) => {
      const next = { ...prev, [bidId]: "accepted" };
      bids.forEach((b) => {
        if (b.id !== bidId && next[b.id] !== "rejected") {
          next[b.id] = "disabled";
        }
      });
      return next;
    });
    setNotice({
      type: "success",
      message: `You accepted ${bid?.name}'s bid of ${bid?.amount}. The painter will be notified.`,
    });
  };

  const handleReject = (bidId) => {
    const bid = bids.find((b) => b.id === bidId);
    setBidStatuses((prev) => ({ ...prev, [bidId]: "rejected" }));
    setNotice({
      type: "info",
      message: `${bid?.name}'s bid has been rejected.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header forceScrolled isLoggedIn />

      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-[#FF8022]">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link to="/user-dashboard" className="transition hover:text-[#FF8022]">
              Dashboard
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link to="/user-projects" className="transition hover:text-[#FF8022]">
              Projects
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-slate-800">Bids</span>
          </nav>

          <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h1 className="font-heading text-xl font-bold text-slate-900 sm:text-2xl">
                  {project.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                  <PinIcon />
                  {project.location}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                <p className="text-sm font-medium text-slate-700">
                  Budget: {project.budget}
                </p>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#FF8022]">
                  {project.totalBids} bids
                </span>
              </div>
            </div>
          </div>

          {notice && (
            <div
              role="status"
              className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
                notice.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-blue-200 bg-blue-50 text-blue-800"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p>{notice.message}</p>
                <button
                  type="button"
                  onClick={() => setNotice(null)}
                  className="shrink-0 text-current opacity-60 transition hover:opacity-100"
                  aria-label="Dismiss notification"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-lg font-bold text-slate-900">
              {visibleCount} Bid{visibleCount !== 1 ? "s" : ""} Received
            </h2>
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl border border-neutral-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 transition focus:border-[#FF8022] focus:outline-none focus:ring-2 focus:ring-[#FF8022]/20 sm:min-w-[180px]"
                aria-label="Sort bids"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {visibleCount === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-10 text-center">
                <p className="text-sm font-medium text-slate-600">
                  {acceptedBidId
                    ? "All other bids have been handled."
                    : "No bids to display. All bids have been rejected."}
                </p>
                <Link
                  to="/user-projects"
                  className="mt-4 inline-block text-sm font-semibold text-[#FF8022] hover:underline"
                >
                  Back to Projects
                </Link>
              </div>
            ) : (
              sortedBids.map((bid) => (
                <BidCard
                  key={bid.id}
                  bid={bid}
                  status={bidStatuses[bid.id]}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/user-projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-[#FF8022]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Projects
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
