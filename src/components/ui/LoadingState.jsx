import { Compass, RotateCcw, AlertCircle } from "lucide-react";

/* ── 1. Skeleton Card for Package Grid ─────────────────────── */
export function SkeletonPackageCard() {
    return (
        <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col h-full animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full aspect-[16/11] bg-slate-100 relative overflow-hidden skeleton-shimmer">
                <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 w-20 sm:w-24 h-6 sm:h-7 bg-slate-200 rounded-xl" />
                <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-16 sm:w-18 h-6 sm:h-7 bg-slate-200 rounded-xl" />
                <div className="absolute bottom-3 left-3 sm:bottom-3.5 sm:left-3.5 w-28 sm:w-32 h-5 sm:h-6 bg-slate-200 rounded-lg" />
            </div>

            {/* Content Body Placeholder */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3.5 sm:gap-4">
                <div className="space-y-2.5 sm:space-y-3">
                    <div className="h-5 sm:h-6 bg-slate-200 rounded-lg w-4/5 skeleton-shimmer" />
                    <div className="h-3.5 sm:h-4 bg-slate-100 rounded-md w-full skeleton-shimmer" />
                    <div className="h-3.5 sm:h-4 bg-slate-100 rounded-md w-3/4 skeleton-shimmer" />

                    <div className="flex gap-1.5 sm:gap-2 pt-1.5 sm:pt-2">
                        <div className="h-5 sm:h-6 w-14 sm:w-16 bg-slate-100 rounded-lg" />
                        <div className="h-5 sm:h-6 w-16 sm:w-20 bg-slate-100 rounded-lg" />
                        <div className="h-5 sm:h-6 w-12 sm:w-14 bg-slate-100 rounded-lg" />
                    </div>
                </div>

                {/* Price & Action Row */}
                <div className="pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="space-y-1 sm:space-y-1.5">
                        <div className="h-3 w-14 sm:w-16 bg-slate-100 rounded" />
                        <div className="h-6 sm:h-7 w-24 sm:w-28 bg-slate-200 rounded-lg skeleton-shimmer" />
                    </div>
                    <div className="h-9 sm:h-10 w-22 sm:w-26 bg-slate-200 rounded-xl sm:rounded-2xl skeleton-shimmer shrink-0" />
                </div>
            </div>
        </div>
    );
}

/* ── 2. Skeleton for Destination Chips ─────────────────────── */
export function SkeletonDestinationChip() {
    return (
        <div className="relative w-full h-[320px] xs:h-[350px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 animate-pulse flex flex-col justify-between p-4 sm:p-6 skeleton-shimmer">
            <div className="flex justify-between items-center">
                <div className="w-20 sm:w-22 h-6 sm:h-7 bg-slate-200 rounded-xl" />
                <div className="w-20 sm:w-24 h-4 bg-slate-200 rounded-md" />
            </div>
            <div className="space-y-2 sm:space-y-2.5">
                <div className="w-14 sm:w-16 h-3 sm:h-3.5 bg-slate-200 rounded" />
                <div className="w-36 sm:w-44 h-7 sm:h-8 bg-slate-200 rounded-xl" />
                <div className="w-full h-3.5 sm:h-4 bg-slate-200 rounded-md" />
            </div>
        </div>
    );
}

/* ── 3. Skeleton for Package Detail Page ───────────────────── */
export function SkeletonPackageDetail() {
    return (
        <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 py-6 sm:py-8 animate-pulse">
            <div className="w-32 sm:w-36 h-4 bg-slate-200 rounded mb-4 sm:mb-6" />
            <div className="w-full h-[240px] xs:h-[300px] sm:h-[420px] md:h-[500px] bg-slate-100 rounded-2xl sm:rounded-3xl skeleton-shimmer mb-4 sm:mb-6" />
            <div className="h-16 sm:h-20 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 mb-6 sm:mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div className="lg:col-span-8 space-y-5 sm:space-y-6">
                    <div className="h-40 sm:h-44 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 skeleton-shimmer" />
                    <div className="h-44 sm:h-48 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 skeleton-shimmer" />
                </div>
                <div className="lg:col-span-4">
                    <div className="h-80 sm:h-96 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 skeleton-shimmer" />
                </div>
            </div>
        </div>
    );
}

/* ── 4. Loading Spinner ───────────────────────────────────── */
export function LoadingSpinner({ size = "md", text }) {
    const sizeClasses = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-3">
            <div
                className={`${sizeClasses[size] || sizeClasses.md} border-slate-200 border-t-sky-600 rounded-full animate-spin`}
            />
            {text && <p className="text-xs font-semibold text-slate-500 tracking-wide">{text}</p>}
        </div>
    );
}

/* ── 5. Empty State ───────────────────────────────────────── */
export function EmptyState({
    title = "No packages found",
    message = "Try adjusting your search criteria or resetting filters to see available routes.",
    actionLabel = "Reset Filters",
    onAction,
}) {
    return (
        <div className="bg-white rounded-3xl p-8 sm:p-14 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-100">
                <Compass size={32} />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                {message}
            </p>
            {onAction && (
                <button type="button" onClick={onAction} className="btn btn-primary text-xs">
                    {actionLabel}
                </button>
            )}
        </div>
    );
}

/* ── 6. Error State with Retry ────────────────────────────── */
export function ErrorState({
    title = "Unable to load data",
    error,
    onRetry,
}) {
    const formatErrorMessage = (err) => {
        if (!err) return "Unable to load data at the moment. Please try again shortly.";
        const msg = typeof err === "string" ? err : err?.message || "";
        if (
            !msg ||
            /status code/i.test(msg) ||
            /request failed/i.test(msg) ||
            /network error/i.test(msg) ||
            /timeout/i.test(msg) ||
            /failed to fetch/i.test(msg) ||
            /axios/i.test(msg)
        ) {
            return "Unable to connect to the server right now. Please check your connection or try again shortly.";
        }
        return msg;
    };

    const displayError = formatErrorMessage(error);

    return (
        <div className="bg-white rounded-3xl p-8 text-center border border-red-200 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={28} />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
            {displayError && <p className="text-xs text-red-600 mb-5">{displayError}</p>}
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="btn btn-secondary text-xs inline-flex items-center gap-1.5">
                    <RotateCcw size={14} />
                    <span>Try Again</span>
                </button>
            )}
        </div>
    );
}
