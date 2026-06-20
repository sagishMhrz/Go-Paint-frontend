import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";

const SPECIALTIES = [
  "Interior",
  "Exterior",
  "Decorative",
  "Texture",
  "Waterproofing",
  "Industrial",
  "Luxury Finish",
  "Faux",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

function PersonIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PaintRollerIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="3" width="20" height="5" rx="1.5" />
      <path d="M6 8v2a2 2 0 0 0 2 2h1v9" />
      <path d="M14 8v2a2 2 0 0 0 2 2h1v9" />
      <path d="M9 19h6" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M1 1l22 22" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
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
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-[#F8FAFC] px-3 py-2 text-sm text-slate-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-300 focus:bg-white";

function ProgressBar({ step }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="flex flex-1 gap-1.5">
        <div
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            step >= 1 ? "bg-[#FF8022]" : "bg-gray-200"
          }`}
        />
        <div
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            step >= 2 ? "bg-[#FF8022]" : "bg-gray-200"
          }`}
        />
      </div>
      <span className="shrink-0 text-xs text-gray-400">Step {step} of 2</span>
    </div>
  );
}

export default function PainterSignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [experience, setExperience] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const roleBtnClass = (active) =>
    `flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-semibold transition-all ${
      active
        ? "border border-[#E07B39] bg-white text-[#E07B39] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
        : "border border-transparent bg-transparent text-gray-500"
    }`;

  const toggleSpecialty = (name) => {
    setSpecialties((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );
  };

  const handleCreateAccount = () => {
    console.log({
      fullName,
      email,
      phone,
      password,
      location,
      specialties,
      experience,
      agreedToTerms,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden items-center justify-center bg-[#F3F4F6] p-4 font-heading">
      <div className="grid h-[calc(100vh-2rem)] w-full max-w-[720px] overflow-hidden rounded-2xl bg-white shadow-xl sm:grid-cols-2">
        <div className="relative hidden h-full sm:block">
          <img
            src={loginImage}
            alt="Painter applying orange paint to a wall"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-xl font-bold leading-snug tracking-tight">
              Join GoPaint Today
            </h2>
            <p className="mt-2 max-w-[240px] text-xs font-normal leading-relaxed text-white/85">
              Nepal&apos;s smartest platform connecting property owners with
              professional painters
            </p>
          </div>
        </div>

        <div className="relative flex h-full min-h-0 flex-col px-6 py-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute right-4 top-4 z-10 text-xl font-light leading-none text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close"
          >
            ×
          </button>

          <div className="flex-shrink-0">
            <div className="mb-3">
              <h1 className="text-xl font-bold tracking-tight text-[#1B2559]">
                Create Account
              </h1>
              <p className="mt-0.5 text-xs text-gray-400">
                Join Nepal&apos;s smartest paint platform
              </p>
            </div>
          </div>

          <ProgressBar step={step} />

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1">
              {step === 1 ? (
                <>
                  <div className="mb-3 flex rounded-full bg-gray-100 p-1">
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      className={roleBtnClass(false)}
                    >
                      <PersonIcon className="text-gray-400" />
                      Property Owner
                    </button>
                    <button type="button" className={roleBtnClass(true)}>
                      <PaintRollerIcon className="text-[#E07B39]" />
                      Professional Painter
                    </button>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="painter-name"
                      className="mb-1 block text-xs font-medium text-gray-600"
                    >
                      Full Name
                    </label>
                    <input
                      id="painter-name"
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="painter-email"
                      className="mb-1 block text-xs font-medium text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      id="painter-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="painter-phone"
                      className="mb-1 block text-xs font-medium text-gray-600"
                    >
                      Phone Number
                    </label>
                    <input
                      id="painter-phone"
                      type="tel"
                      placeholder="+977 98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-2">
                    <div>
                      <label
                        htmlFor="painter-password"
                        className="mb-1 block text-xs font-medium text-gray-600"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="painter-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`${inputClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="painter-confirm"
                        className="mb-1 block text-xs font-medium text-gray-600"
                      >
                        Confirm Password
                      </label>
                      <input
                        id="painter-confirm"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label
                      htmlFor="painter-location"
                      className="mb-1 block text-xs font-medium text-gray-600"
                    >
                      Your Location
                    </label>
                    <input
                      id="painter-location"
                      type="text"
                      placeholder="e.g. Kathmandu, Lalitpur"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-3">
                    <span className="mb-1 block text-xs font-medium text-gray-600">
                      Specialties
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {SPECIALTIES.map((name) => {
                        const selected = specialties.includes(name);
                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => toggleSpecialty(name)}
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                              selected
                                ? "border-[#E07B39] bg-orange-50 text-[#E07B39]"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="painter-experience"
                      className="mb-1 block text-xs font-medium text-gray-600"
                    >
                      Years of Experience
                    </label>
                    <div className="relative">
                      <select
                        id="painter-experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 ${
                          !experience ? "text-gray-400" : ""
                        }`}
                      >
                        <option value="" disabled>
                          Select experience
                        </option>
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="text-slate-800"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>

                  <label className="mb-4 flex cursor-pointer items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6]/30"
                    />
                    <span className="text-xs leading-relaxed text-gray-500">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="font-medium text-[#E07B39] hover:text-[#c96a2f]"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="font-medium text-[#E07B39] hover:text-[#c96a2f]"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </>
              )}
            </div>

            {/* Footer: keep buttons + sign-in link always visible */}
            <div className="mt-auto flex flex-col gap-2">
              {step === 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3B82F6] py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2563EB]"
                >
                  Continue
                  <ArrowRightIcon />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <ArrowLeftIcon />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateAccount}
                    className="flex-1 rounded-lg bg-[#3B82F6] py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2563EB]"
                  >
                    Create Account
                  </button>
                </div>
              )}

              <p className="text-center text-xs text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="font-bold text-[#1B2559] transition-colors hover:text-[#3B82F6]"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
