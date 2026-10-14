/**
 * CustomDropdown.jsx
 *
 * Reusable custom dropdown components:
 *  - FilterDropdown      → generic single-select with optional "all" sentinel
 *  - PackageDropdown     → searchable package picker with floating label
 *  - CountryCodeDropdown → compact flag + dial-code picker
 *  - DatePickerDropdown  → inline calendar grid with min-date enforcement
 *  - todayStr / formatDisplay → date helpers (exported for consumers)
 */

import { useEffect, useState } from "react";

/* ─── shared hook ────────────────────────────────────────────────────────── */

/** Closes the dropdown when user clicks outside the element with `data-attr`. */
function useOutsideClose(open, dataAttr, onClose) {
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (!e.target.closest(`[${dataAttr}]`)) onClose();
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open, dataAttr, onClose]);
}

/* ═══════════════════════════════════════════════════════════════════════════
   FilterDropdown
   Generic single-select replacement used on the Packages filter bar.

   Props:
     value       – current value string
     onChange    – (value: string) => void
     options     – Array<{ label: string, value: string }>
     placeholder – text shown when nothing is selected (default "Select")
     icon        – optional JSX to show inside the trigger on the right side
                   (pass the sort-arrow SVG for the Sort By dropdown)
═══════════════════════════════════════════════════════════════════════════ */

export function FilterDropdown({ value, onChange, options, placeholder = "Select", icon }) {
    const [open, setOpen] = useState(false);

    const selected = options.find((o) => o.value === value);
    const closeDropdown = () => setOpen(false);
    useOutsideClose(open, "data-filter-dropdown", closeDropdown);

    return (
        <div className="relative w-full" data-filter-dropdown="">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`w-full text-left bg-paper border rounded-md px-3 py-3 text-sm transition-colors flex items-center justify-between gap-2 cursor-pointer
                    ${open ? "border-ink" : "border-zinc-200 hover:border-ink"}`}>
                <span className={selected ? "text-ink line-clamp-1" : "text-zinc-400"}>{selected ? selected.label : placeholder}</span>
                <span className="flex items-center gap-1 shrink-0">
                    {icon}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </span>
            </button>

            {/* Panel */}
            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-zinc-200 rounded-md shadow-lg overflow-hidden">
                    <ul className="max-h-56 overflow-y-auto">
                        {options.map((opt) => (
                            <li
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                }}
                                className={`px-3 py-2.5 text-sm cursor-pointer transition-colors
                                    ${value === opt.value ? "bg-zinc-100 font-medium text-ink" : "text-zinc-700 hover:bg-zinc-50"}`}>
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PackageDropdown
   Searchable list of packages with a floating label.
═══════════════════════════════════════════════════════════════════════════ */

export function PackageDropdown({ packages, value, onChange, disabled }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = packages.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    const handleSelect = (name) => {
        onChange(name);
        setOpen(false);
        setSearch("");
    };

    const closeDropdown = () => setOpen(false);
    useOutsideClose(open, "data-pkg-dropdown", closeDropdown);

    const isFloating = value || open;

    return (
        <div className="relative z-50" data-pkg-dropdown="">
            {/* Floating label */}
            <span
                className={`pointer-events-none absolute left-3 z-10 px-1 text-zinc-400 transition-all duration-150
                    ${
                        isFloating
                            ? "top-0 -translate-y-1/2 bg-white text-[10px] uppercase tracking-widest"
                            : "top-1/2 -translate-y-1/2 bg-transparent text-sm"
                    }`}>
                {isFloating ? "Package" : "Select Package"}
            </span>

            {/* Trigger */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setOpen((o) => !o)}
                className={`w-full text-left bg-zinc-50 border rounded-md px-2.5 py-2 text-base transition-colors flex items-center justify-between gap-2
                    ${
                        disabled
                            ? "bg-gray-300 cursor-not-allowed border-zinc-200 text-zinc-500"
                            : "border-zinc-200 text-ink cursor-pointer hover:border-ink hover:bg-white"
                    }
                    ${open ? "border-ink bg-white" : ""}
                `}>
                <span className={`truncate ${value ? "text-ink" : "text-transparent select-none"}`}>{value || "—"}</span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* Panel */}
            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-zinc-200 rounded-md shadow-lg overflow-hidden">
                    <div className="p-2 border-b border-zinc-100">
                        <input
                            autoFocus
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search packages…"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded px-2.5 py-1.5 text-sm text-ink focus:outline-none focus:border-ink"
                        />
                    </div>
                    <ul className="max-h-48 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <li className="px-3 py-2 text-sm text-zinc-400 italic">No packages found</li>
                        ) : (
                            filtered.map((p, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => handleSelect(p.name)}
                                    className={`px-3 py-2 text-sm cursor-pointer transition-colors
                                        ${value === p.name ? "bg-zinc-100 font-medium text-ink" : "text-zinc-700 hover:bg-zinc-50"}`}>
                                    {p.name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CountryCodeDropdown
   Compact flag + dial-code picker.
═══════════════════════════════════════════════════════════════════════════ */

export const COUNTRY_CODES = [
    { code: "91", label: "+91", flag: "🇮🇳", name: "India" },
    { code: "1", label: "+1", flag: "🇺🇸", name: "USA / Canada" },
    { code: "44", label: "+44", flag: "🇬🇧", name: "UK" },
    { code: "61", label: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "971", label: "+971", flag: "🇦🇪", name: "UAE" },
    { code: "65", label: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "60", label: "+60", flag: "🇲🇾", name: "Malaysia" },
    { code: "33", label: "+33", flag: "🇫🇷", name: "France" },
    { code: "49", label: "+49", flag: "🇩🇪", name: "Germany" },
    { code: "81", label: "+81", flag: "🇯🇵", name: "Japan" },
];

export function CountryCodeDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);

    const selected = COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];
    const closeDropdown = () => setOpen(false);
    useOutsideClose(open, "data-cc-dropdown", closeDropdown);

    return (
        <div className="relative shrink-0" data-cc-dropdown="">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`h-full bg-zinc-50 border rounded-md px-2.5 py-2 text-base transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap
                    ${open ? "border-ink bg-white" : "border-zinc-200 hover:border-ink hover:bg-white"}`}>
                <span className="text-lg leading-none">{selected.flag}</span>
                <span className="text-ink font-medium text-sm">{selected.label}</span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* Panel */}
            {open && (
                <div className="absolute z-50 mt-1 left-0 w-52 bg-white border border-zinc-200 rounded-md shadow-lg overflow-hidden">
                    <ul className="max-h-60 overflow-y-auto">
                        {COUNTRY_CODES.map((c) => (
                            <li
                                key={c.code}
                                onClick={() => {
                                    onChange(c.code);
                                    setOpen(false);
                                }}
                                className={`flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer transition-colors
                                    ${value === c.code ? "bg-zinc-100 font-medium text-ink" : "text-zinc-700 hover:bg-zinc-50"}`}>
                                <span className="text-base leading-none">{c.flag}</span>
                                <span className="font-medium text-ink w-9 shrink-0">{c.label}</span>
                                <span className="text-zinc-400 truncate">{c.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DatePickerDropdown
   Inline calendar grid with min-date enforcement and floating label.
═══════════════════════════════════════════════════════════════════════════ */

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePickerDropdown({ label, value, onChange, minDate }) {
    const [open, setOpen] = useState(false);

    const buildInitialView = () => {
        const base = minDate ? new Date(minDate + "T00:00:00") : new Date();
        return { year: base.getFullYear(), month: base.getMonth() };
    };

    const [view, setView] = useState(buildInitialView);

    // Advance view if minDate moves past the current month
    useEffect(() => {
        if (!minDate) return;
        const min = new Date(minDate + "T00:00:00");
        setView((v) => {
            const viewDate = new Date(v.year, v.month, 1);
            if (viewDate < new Date(min.getFullYear(), min.getMonth(), 1)) {
                return { year: min.getFullYear(), month: min.getMonth() };
            }
            return v;
        });
    }, [minDate]);

    const closeDropdown = () => setOpen(false);
    useOutsideClose(open, "data-date-dropdown", closeDropdown);

    const minDateObj = minDate ? new Date(minDate + "T00:00:00") : null;

    const prevMonth = () => setView((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 }));

    const nextMonth = () => setView((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 }));

    const isPrevDisabled = () => {
        if (!minDateObj) return false;
        return view.year < minDateObj.getFullYear() || (view.year === minDateObj.getFullYear() && view.month <= minDateObj.getMonth());
    };

    const firstDayOfWeek = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const cells = [...Array(firstDayOfWeek).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

    const toDateStr = (day) => {
        const mm = String(view.month + 1).padStart(2, "0");
        const dd = String(day).padStart(2, "0");
        return `${view.year}-${mm}-${dd}`;
    };

    const isDayDisabled = (day) => {
        if (!day) return true;
        if (!minDateObj) return false;
        return new Date(toDateStr(day) + "T00:00:00") < minDateObj;
    };
    const isDaySelected = (day) => day && value === toDateStr(day);
    const isDayToday = (day) => {
        if (!day) return false;
        const t = new Date();
        return day === t.getDate() && view.month === t.getMonth() && view.year === t.getFullYear();
    };

    const handleDayClick = (day) => {
        if (!day || isDayDisabled(day)) return;
        onChange(toDateStr(day));
        setOpen(false);
    };

    const isFloating = value || open;

    return (
        <div className="relative" data-date-dropdown="">
            {/* Floating label */}
            <span
                className={`pointer-events-none absolute left-3 z-10 px-1 text-zinc-400 transition-all duration-150
                    ${
                        isFloating
                            ? "top-0 -translate-y-1/2 bg-white text-[10px] uppercase tracking-widest"
                            : "top-1/2 -translate-y-1/2 bg-transparent text-sm"
                    }`}>
                {label}
            </span>

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className={`w-full text-left bg-zinc-50 border rounded-md px-2.5 py-2 text-base transition-colors flex items-center justify-between gap-2 cursor-pointer
                    ${open ? "border-ink bg-white" : "border-zinc-200 hover:border-ink hover:bg-white"}`}>
                <span className={value ? "text-ink" : "text-transparent select-none"}>{value ? formatDisplay(value) : "—"}</span>
                {/* Calendar icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-zinc-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            </button>

            {/* Calendar panel */}
            {open && (
                <div className="absolute z-50 mt-1 w-72 bg-white border border-zinc-200 rounded-md shadow-lg p-3 select-none">
                    {/* Month / Year nav */}
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={prevMonth}
                            disabled={isPrevDisabled()}
                            className="p-1 rounded hover:bg-zinc-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <span className="text-sm font-medium text-ink">
                            {MONTH_NAMES[view.month]} {view.year}
                        </span>
                        <button type="button" onClick={nextMonth} className="p-1 rounded hover:bg-zinc-100 transition-colors cursor-pointer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                        {DAY_HEADERS.map((d) => (
                            <div key={d} className="text-center text-[10px] uppercase tracking-widest text-zinc-400 py-1">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-y-0.5">
                        {cells.map((day, i) => {
                            const disabled = isDayDisabled(day);
                            const selected = isDaySelected(day);
                            const today = isDayToday(day);
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => handleDayClick(day)}
                                    className={`h-8 w-full text-xs rounded transition-colors
                                        ${!day ? "invisible pointer-events-none" : ""}
                                        ${
                                            selected
                                                ? "bg-ink text-white font-medium"
                                                : disabled
                                                  ? "text-zinc-300 cursor-not-allowed"
                                                  : today
                                                    ? "border border-rust text-rust font-medium hover:bg-rust/10 cursor-pointer"
                                                    : "text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                                        }`}>
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    {/* Clear */}
                    {value && (
                        <button
                            type="button"
                            onClick={() => {
                                onChange("");
                                setOpen(false);
                            }}
                            className="mt-3 w-full text-xs text-zinc-400 hover:text-rust transition-colors cursor-pointer">
                            Clear date
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

/* ─── date helpers ───────────────────────────────────────────────────────── */

/** Returns today's date as "YYYY-MM-DD" in local time. */
export function todayStr() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

/** Formats "YYYY-MM-DD" → "14 Oct 2026". */
export function formatDisplay(dateStr) {
    if (!dateStr) return "";
    const [y, m, day] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${months[parseInt(m, 10) - 1]} ${y}`;
}
