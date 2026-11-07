import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLinkByToken, submitFeedback } from "../services/feedback.services";

/* ── star rating ─────────────────────────────────────────── */
const colors = ["", "#ef4444", "#f97316", "#facc15", "#22c55e", "#16a34a"];
function StarRating({ value, onChange, disabled }) {
    const [hovered, setHovered] = useState(0);
    const active = hovered || value;

    const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-1 sm:gap-1.5 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={disabled}
                        onClick={() => !disabled && onChange(star)}
                        onMouseEnter={() => !disabled && setHovered(star)}
                        onMouseLeave={() => !disabled && setHovered(0)}
                        aria-label={`Rate ${star} out of 5`}
                        className="focus:outline-none disabled:cursor-not-allowed transition-transform hover:scale-110 p-0.5">
                        <svg
                            viewBox="0 0 24 24"
                            fill={star <= active ? colors[active] : "none"}
                            stroke={star <= active ? colors[active] : "#cbd5e1"}
                            strokeWidth="1.5"
                            className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-150">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </button>
                ))}
            </div>
            {active === 1 && <span className="text-[11px] uppercase tracking-widest text-red-600 font-semibold">{labels[active]}</span>}
            {active === 2 && <span className="text-[11px] uppercase tracking-widest text-orange-500 font-semibold">{labels[active]}</span>}
            {active === 3 && <span className="text-[11px] uppercase tracking-widest text-yellow-500 font-semibold">{labels[active]}</span>}
            {active === 4 && <span className="text-[11px] uppercase tracking-widest text-green-500 font-semibold">{labels[active]}</span>}
            {active === 5 && <span className="text-[11px] uppercase tracking-widest text-green-600 font-semibold">{labels[active]}</span>}
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
        return Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));
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
            const rawMsg = err?.response?.data?.message || err?.message || "";
            const cleanMsg =
                !rawMsg || /status code/i.test(rawMsg) || /request failed/i.test(rawMsg) || /network error/i.test(rawMsg)
                    ? "Unable to submit your feedback right now. Please try again in a moment."
                    : rawMsg;
            setErrorMsg(cleanMsg);
            setState(STATE.ERROR);
        }
    };

    /* ── render helpers ───────────────────────────────────── */
    if (state === STATE.LOADING) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-50 select-none">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-slate-400 font-semibold uppercase tracking-widest">Loading…</p>
                </div>
            </main>
        );
    }

    if (state === STATE.INVALID) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 select-none px-4">
                <div className="text-5xl">⚠️</div>
                <h1 className="font-display text-2xl sm:text-3xl text-slate-900 text-center">This link is no longer valid</h1>
                <p className="text-xs sm:text-sm text-slate-500 text-center max-w-sm">
                    The feedback link has expired or has already been used. Please contact us if you think this is a mistake.
                </p>
                <Link to="/" className="btn btn-primary text-xs sm:text-sm">
                    Go Home
                </Link>
            </main>
        );
    }

    if (state === STATE.SUCCESS) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 select-none px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl text-slate-900 text-center">Thank you for your feedback!</h1>
                <p className="text-xs sm:text-sm text-slate-500 text-center max-w-sm">Your response has been recorded. We truly appreciate your time.</p>
                <Link to="/" className="btn btn-primary text-xs sm:text-sm">
                    Explore More Packages
                </Link>
            </main>
        );
    }

    if (state === STATE.ERROR) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 select-none px-4">
                <div className="text-5xl">😕</div>
                <h1 className="font-display text-2xl sm:text-3xl text-slate-900 text-center">Submission Failed</h1>
                <p className="text-xs sm:text-sm text-red-500 text-center max-w-sm">{errorMsg}</p>
                <button onClick={() => setState(STATE.FORM)} className="btn btn-primary text-xs sm:text-sm cursor-pointer">
                    Try Again
                </button>
            </main>
        );
    }

    /* ── form ─────────────────────────────────────────────── */
    const isSubmitting = state === STATE.SUBMITTING;

    return (
        <main className="min-h-screen bg-slate-50 select-none py-8 sm:py-12 px-3.5 sm:px-6">
            <div className="max-w-[680px] mx-auto flex flex-col gap-6 sm:gap-8">
                {/* header */}
                <div data-aos="fade-down" className="text-center flex flex-col gap-2">
                    <span className="font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-sky-600">Your Experience Matters</span>
                    <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                        Share Your <span className="italic text-sky-600">Feedback</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                        Package: <span className="font-semibold text-slate-900">{linkData?.package}</span>
                    </p>
                </div>

                {/* card */}
                <form
                    onSubmit={handleSubmit}
                    data-aos="fade-up"
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-8 flex flex-col gap-5 sm:gap-7">
                    {/* name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                            Your Name <span className="text-sky-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="Full Name"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors disabled:opacity-60"
                        />
                    </div>

                    {/* divider */}
                    <div className="border-t border-slate-100" />

                    {/* per-question ratings */}
                    {(linkData?.questions || []).length > 0 && (
                        <div className="flex flex-col gap-5 sm:gap-6">
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                                Rate Each Aspect <span className="text-sky-600">*</span>
                            </p>
                            {linkData.questions.map((question, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                    <p className="text-xs sm:text-sm text-slate-900 font-medium leading-snug">
                                        <span className="text-sky-600 mr-1.5 font-bold text-xs">{String(idx + 1).padStart(2, "0")}.</span>
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
                        <div className="rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s, i) => (
                                    <svg
                                        key={i}
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill={s <= overallRating ? colors[Math.floor(overallRating)] : "none"}
                                        stroke={s <= overallRating ? colors[Math.floor(overallRating)] : "#cbd5e1"}
                                        strokeWidth="1.5">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <div>
                                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold">Overall Rating</span>
                                <p className="text-xs sm:text-sm font-semibold text-slate-900">{overallRating} / 5</p>
                            </div>
                        </div>
                    )}

                    {/* divider */}
                    <div className="border-t border-slate-100" />

                    {/* written review */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                            Written Review <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            disabled={isSubmitting}
                            rows={4}
                            placeholder="Tell us more about your experience — what you loved, what could be improved..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white transition-colors resize-y disabled:opacity-60"
                        />
                    </div>

                    {/* error */}
                    {formError && <p className="text-xs sm:text-sm text-red-500">{formError}</p>}

                    {/* submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-blue w-full py-3 sm:py-3.5 px-6 text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2.5 rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shadow-md">
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Submitting…</span>
                            </>
                        ) : (
                            <>
                                <span>Submit Feedback</span>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400 pb-4">Your feedback is anonymous and helps us improve future journeys.</p>
            </div>
        </main>
    );
}
