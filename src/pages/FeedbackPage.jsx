import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLinkByToken, submitFeedback } from "../services/feedback.services";

/* ── star rating ─────────────────────────────────────────── */
function StarRating({ value, onChange, disabled }) {
    const [hovered, setHovered] = useState(0);
    const active = hovered || value;

    const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-1.5 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={disabled}
                        onClick={() => !disabled && onChange(star)}
                        onMouseEnter={() => !disabled && setHovered(star)}
                        onMouseLeave={() => !disabled && setHovered(0)}
                        aria-label={`Rate ${star} out of 5`}
                        className="focus:outline-none disabled:cursor-not-allowed transition-transform hover:scale-110">
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill={star <= active ? "#e07a5f" : "none"}
                            stroke={star <= active ? "#e07a5f" : "#cbd5e1"}
                            strokeWidth="1.5"
                            className="transition-colors duration-150">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </button>
                ))}
            </div>
            {active > 0 && <span className="text-[11px] uppercase tracking-widest text-rust font-mono">{labels[active]}</span>}
        </div>
    );
}

/* ── states ──────────────────────────────────────────────── */
const STATE = { LOADING: "loading", FORM: "form", SUBMITTING: "submitting", SUCCESS: "success", INVALID: "invalid", ERROR: "error" };

/* ── main page ───────────────────────────────────────────── */
export default function FeedbackPage() {
    const { token } = useParams();

    const [state, setState] = useState(STATE.LOADING);
    const [linkData, setLinkData] = useState(null); // { package, questions }
    const [errorMsg, setErrorMsg] = useState("");

    const [name, setName] = useState("");
    const [ratings, setRatings] = useState({}); // { [question]: 0..5 }
    const [review, setReview] = useState("");
    const [formError, setFormError] = useState("");

    /* fetch link on mount */
    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getLinkByToken(token);
                if (!data?.link.isValid) {
                    setState(STATE.INVALID);
                    return;
                }
                setLinkData(data.link);
                const initialRatings = {};
                (data.link.questions || []).forEach((q) => {
                    initialRatings[q] = 0;
                });
                setRatings(initialRatings);
                setState(STATE.FORM);
            } catch {
                setState(STATE.INVALID);
            }
        };
        fetch();
    }, [token]);

    /* compute overall rating as average of all question ratings */
    const overallRating = (() => {
        const values = Object.values(ratings).filter(Boolean);
        if (!values.length) return 0;
        return Math.round(values.reduce((a, b) => a + b, 0)) / values.length;
    })();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!name.trim()) {
            setFormError("Please enter your name.");
            return;
        }
        const unanswered = (linkData?.questions || []).filter((q) => !ratings[q]);
        if (unanswered.length) {
            setFormError("Please rate all questions before submitting.");
            return;
        }

        setState(STATE.SUBMITTING);
        const payload = {
            name: name.trim(),
            package: linkData.package,
            feedback: (linkData.questions || []).map((q) => ({ question: q, rating: ratings[q] })),
            review: review.trim(),
        };

        try {
            await submitFeedback(payload, token);
            setState(STATE.SUCCESS);
        } catch (err) {
            setErrorMsg(err?.response?.data?.message || "Something went wrong. Please try again.");
            setState(STATE.ERROR);
        }
    };

    /* ── render helpers ───────────────────────────────────── */
    if (state === STATE.LOADING) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-paper-dim select-none">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-rust border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest">Loading…</p>
                </div>
            </main>
        );
    }

    if (state === STATE.INVALID) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-paper-dim select-none px-4">
                <div className="text-5xl">⚠️</div>
                <h1 className="font-display text-3xl text-ink text-center">This link is no longer valid</h1>
                <p className="text-sm text-zinc-500 text-center max-w-sm">
                    The feedback link has expired or has already been used. Please contact us if you think this is a mistake.
                </p>
                <Link to="/" className="btn btn-primary text-sm">
                    Go Home
                </Link>
            </main>
        );
    }

    if (state === STATE.SUCCESS) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-paper-dim select-none px-4">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>
                <h1 className="font-display text-3xl text-ink text-center">Thank you for your feedback!</h1>
                <p className="text-sm text-zinc-500 text-center max-w-sm">Your response has been recorded. We truly appreciate your time.</p>
                <Link to="/" className="btn btn-primary text-sm">
                    Explore More Packages
                </Link>
            </main>
        );
    }

    if (state === STATE.ERROR) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-paper-dim select-none px-4">
                <div className="text-5xl">😕</div>
                <h1 className="font-display text-3xl text-ink text-center">Submission Failed</h1>
                <p className="text-sm text-red-500 text-center max-w-sm">{errorMsg}</p>
                <button onClick={() => setState(STATE.FORM)} className="btn btn-primary text-sm cursor-pointer">
                    Try Again
                </button>
            </main>
        );
    }

    /* ── form ─────────────────────────────────────────────── */
    const isSubmitting = state === STATE.SUBMITTING;

    return (
        <main className="min-h-screen bg-paper-dim select-none py-16 px-4">
            <div className="max-w-[680px] mx-auto flex flex-col gap-8">
                {/* header */}
                <div data-aos="fade-down" className="text-center flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-rust">Your Experience Matters</span>
                    <h1 className="font-display text-4xl sm:text-5xl font-medium text-ink leading-tight">
                        Share Your <span className="italic text-rust">Feedback</span>
                    </h1>
                    <p className="text-sm text-zinc-500 font-light mt-1">
                        Package: <span className="font-medium text-ink">{linkData?.package}</span>
                    </p>
                </div>

                {/* card */}
                <form
                    onSubmit={handleSubmit}
                    data-aos="fade-up"
                    className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 sm:p-8 flex flex-col gap-7">
                    {/* name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
                            Your Name <span className="text-rust">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="e.g. Priya Sharma"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors disabled:opacity-60"
                        />
                    </div>

                    {/* divider */}
                    <div className="border-t border-zinc-100" />

                    {/* per-question ratings */}
                    {(linkData?.questions || []).length > 0 && (
                        <div className="flex flex-col gap-6">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
                                Rate Each Aspect <span className="text-rust">*</span>
                            </p>
                            {linkData.questions.map((question, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                    <p className="text-sm text-ink font-medium leading-snug">
                                        <span className="text-rust mr-1.5 font-mono text-xs">{String(idx + 1).padStart(2, "0")}.</span>
                                        {question}
                                    </p>
                                    <StarRating
                                        value={ratings[question] || 0}
                                        onChange={(val) => setRatings((prev) => ({ ...prev, [question]: val }))}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* overall rating display */}
                    {overallRating > 0 && (
                        <div className="rounded-xl bg-paper-dim px-5 py-4 flex items-center gap-4">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <svg
                                        key={s}
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill={s <= overallRating ? "#e07a5f" : "none"}
                                        stroke={s <= overallRating ? "#e07a5f" : "#cbd5e1"}
                                        strokeWidth="1.5">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <div>
                                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Overall Rating</span>
                                <p className="text-sm font-medium text-ink">{overallRating} / 5</p>
                            </div>
                        </div>
                    )}

                    {/* divider */}
                    <div className="border-t border-zinc-100" />

                    {/* written review */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
                            Written Review <span className="text-zinc-300">(Optional)</span>
                        </label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            disabled={isSubmitting}
                            rows={4}
                            placeholder="Tell us more about your experience — what you loved, what could be improved..."
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors resize-y disabled:opacity-60"
                        />
                    </div>

                    {/* error */}
                    {formError && <p className="text-sm text-red-500">{formError}</p>}

                    {/* submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-slate-700 hover:bg-rust text-white py-3.5 px-6 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-3 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-70">
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Submitting…
                            </>
                        ) : (
                            <>
                                Submit Feedback
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-zinc-400 pb-4">Your feedback is anonymous and helps us improve future journeys.</p>
            </div>
        </main>
    );
}
