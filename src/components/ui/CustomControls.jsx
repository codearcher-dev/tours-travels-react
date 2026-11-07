import { useState, useEffect, useRef } from "react";
import { ChevronDown, Calendar, ChevronLeft, ChevronRight, Check, Search, Plus, Minus } from "lucide-react";

/* ── Click Outside Hook ────────────────────────────────────── */
function useClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

/* ══════════════════════════════════════════════════════════════
   1. CustomSelect (Custom Dropdown Picker)
   Replaces native <select> completely
══════════════════════════════════════════════════════════════ */
export function CustomSelect({
    id,
    label,
    "aria-label": ariaLabelProp,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    searchable = false,
    icon: IconComponent,
    className = "",
    disabled = false,
}) {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    const inputId = id || (label ? `select-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}` : undefined);
    const ariaLabel = ariaLabelProp || label || placeholder;

    useClickOutside(dropdownRef, () => {
        setOpen(false);
        setSearchTerm("");
    });

    const normalizedOptions = options.map((opt) =>
        typeof opt === "object" && opt !== null ? opt : { label: opt, value: opt }
    );

    const selectedOption = normalizedOptions.find(
        (opt) => String(opt.value).toLowerCase() === String(value).toLowerCase()
    );

    const filteredOptions = searchable
        ? normalizedOptions.filter((opt) =>
              opt.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : normalizedOptions;

    const handleSelect = (val) => {
        onChange(val);
        setOpen(false);
        setSearchTerm("");
    };

    return (
        <div className={`relative w-full text-left ${className}`} ref={dropdownRef}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
                    {label}
                </label>
            )}

            {/* Custom Trigger Button */}
            <button
                id={inputId}
                type="button"
                aria-label={ariaLabel}
                aria-haspopup="listbox"
                aria-expanded={open}
                disabled={disabled}
                onClick={() => !disabled && setOpen(!open)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    disabled
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        : open
                        ? "bg-white border-sky-600 ring-2 ring-sky-500/10 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-2xs"
                }`}>
                <div className="flex items-center gap-2 sm:gap-2.5 truncate">
                    {IconComponent && (
                        <IconComponent size={16} className="text-slate-400 shrink-0" />
                    )}
                    <span className={`truncate ${selectedOption ? "text-slate-900 font-semibold" : "text-slate-400 font-normal"}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>

                <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                        open ? "rotate-180 text-sky-600" : ""
                    }`}
                />
            </button>

            {/* Custom Dropdown Menu Panel */}
            {open && (
                <div className="absolute left-0 right-0 z-50 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden py-1.5 max-h-64 custom-scroll overflow-y-auto">
                    {searchable && (
                        <div className="p-2 border-b border-slate-100 sticky top-0 bg-white z-10">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    autoFocus
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full bg-slate-50 pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600"
                                />
                            </div>
                        </div>
                    )}

                    <div className="p-1">
                        {filteredOptions.length === 0 ? (
                            <div className="px-3 py-3 text-xs text-slate-400 text-center italic">
                                No options found
                            </div>
                        ) : (
                            filteredOptions.map((opt) => {
                                const isSelected =
                                    selectedOption &&
                                    String(selectedOption.value).toLowerCase() ===
                                        String(opt.value).toLowerCase();

                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleSelect(opt.value)}
                                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors text-left ${
                                            isSelected
                                                ? "bg-sky-50 text-sky-700 font-semibold"
                                                : "text-slate-700 hover:bg-slate-50"
                                        }`}>
                                        <span className="truncate">{opt.label}</span>
                                        {isSelected && <Check size={15} className="text-sky-600 shrink-0" />}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   2. CustomDatePicker (Custom Calendar Dropdown)
   Replaces native <input type="date"> completely
══════════════════════════════════════════════════════════════ */
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CustomDatePicker({
    id,
    label,
    "aria-label": ariaLabelProp,
    value,
    onChange,
    minDate,
    placeholder = "Select date",
    className = "",
    disabled = false,
    align = "auto",
}) {
    const [open, setOpen] = useState(false);
    const datePickerRef = useRef(null);

    const inputId = id || (label ? `date-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}` : undefined);
    const ariaLabel = ariaLabelProp || label || placeholder;

    useClickOutside(datePickerRef, () => setOpen(false));

    // Base view date
    const initialDate = value ? new Date(value + "T00:00:00") : new Date();
    const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
    const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

    const minDateObj = minDate ? new Date(minDate + "T00:00:00") : null;

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    const calendarCells = [];
    for (let i = 0; i < firstDayIndex; i++) {
        calendarCells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        calendarCells.push(d);
    }

    const formatISO = (day) => {
        const mm = String(currentMonth + 1).padStart(2, "0");
        const dd = String(day).padStart(2, "0");
        return `${currentYear}-${mm}-${dd}`;
    };

    const isDateDisabled = (day) => {
        if (!day || !minDateObj) return false;
        const cellDate = new Date(`${formatISO(day)}T00:00:00`);
        return cellDate < minDateObj;
    };

    const isDateSelected = (day) => {
        if (!day || !value) return false;
        return formatISO(day) === value;
    };

    const handleSelectDay = (day) => {
        if (!day || isDateDisabled(day)) return;
        onChange(formatISO(day));
        setOpen(false);
    };

    const formattedDisplay = value
        ? new Date(value + "T00:00:00").toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "";

    const alignClass =
        align === "left"
            ? "left-0"
            : align === "right"
            ? "right-0"
            : "left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0";

    return (
        <div className={`relative w-full text-left min-w-0 ${className}`} ref={datePickerRef}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5 truncate"
                    title={label}>
                    {label}
                </label>
            )}

            {/* Custom Trigger */}
            <button
                id={inputId}
                type="button"
                aria-label={ariaLabel}
                aria-haspopup="dialog"
                aria-expanded={open}
                disabled={disabled}
                onClick={() => !disabled && setOpen(!open)}
                className={`w-full flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    disabled
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        : open
                        ? "bg-white border-sky-600 ring-2 ring-sky-500/10 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-2xs"
                }`}>
                <div className="flex items-center gap-1.5 sm:gap-2.5 truncate">
                    <Calendar size={14} className="text-slate-400 shrink-0 sm:w-4 sm:h-4" />
                    <span className={`truncate text-[11px] sm:text-sm ${formattedDisplay ? "text-slate-900 font-semibold" : "text-slate-400 font-normal"}`}>
                        {formattedDisplay || placeholder}
                    </span>
                </div>

                <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                        open ? "rotate-180 text-sky-600" : ""
                    }`}
                />
            </button>

            {/* Custom Interactive Calendar Dropdown */}
            {open && (
                <div className={`absolute ${alignClass} z-50 mt-1.5 w-[calc(100vw-2.5rem)] max-w-[290px] sm:max-w-[320px] sm:w-80 bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-xl p-2.5 sm:p-3.5 select-none`}>
                    {/* Header: Month/Year and navigation */}
                    <div className="flex items-center justify-between mb-2 sm:mb-2.5 px-1">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {MONTHS[currentMonth]} {currentYear}
                        </span>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={prevMonth}
                                className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                                <ChevronLeft size={15} />
                            </button>
                            <button
                                type="button"
                                onClick={nextMonth}
                                className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-1">
                        {WEEKDAYS.map((w) => (
                            <span key={w} className="text-[10px] sm:text-[11px] font-semibold text-slate-400 py-0.5">
                                {w}
                            </span>
                        ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarCells.map((day, idx) => {
                            if (day === null) {
                                return <div key={`empty-${idx}`} className="h-6 sm:h-8" />;
                            }

                            const disabledDay = isDateDisabled(day);
                            const selectedDay = isDateSelected(day);

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    disabled={disabledDay}
                                    onClick={() => handleSelectDay(day)}
                                    className={`h-6 sm:h-8 w-full rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                                        disabledDay
                                            ? "text-slate-300 cursor-not-allowed"
                                            : selectedDay
                                            ? "bg-slate-900 text-white shadow-sm font-bold"
                                            : "text-slate-800 hover:bg-slate-100"
                                    }`}>
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   3. CustomCounter (Numeric Plus/Minus Picker)
   For Adults / Children count
══════════════════════════════════════════════════════════════ */
export function CustomCounter({
    label,
    value,
    onChange,
    min = 0,
    max = 20,
    subtitle,
}) {
    const num = Number(value) || 0;

    const handleIncrement = () => {
        if (num < max) onChange(String(num + 1));
    };

    const handleDecrement = () => {
        if (num > min) onChange(String(num - 1));
    };

    return (
        <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 bg-white shadow-2xs min-w-0">
            <div className="min-w-0 pr-1">
                <span className="block text-[11px] sm:text-xs font-semibold text-slate-800 truncate">{label}</span>
                {subtitle && <span className="block text-[9px] sm:text-[10px] text-slate-400 truncate">{subtitle}</span>}
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button
                    type="button"
                    disabled={num <= min}
                    onClick={handleDecrement}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95">
                    <Minus size={11} className="sm:w-3 sm:h-3" />
                </button>

                <span className="font-bold text-xs sm:text-sm text-slate-900 w-3.5 sm:w-5 text-center">{num}</span>

                <button
                    type="button"
                    disabled={num >= max}
                    onClick={handleIncrement}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95">
                    <Plus size={11} className="sm:w-3 sm:h-3" />
                </button>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   4. CustomCountryCodeSelect
   Replaces native country select
══════════════════════════════════════════════════════════════ */
const COUNTRIES = [
    { code: "+91", label: "+91", flag: "🇮🇳", name: "India" },
    { code: "+1", label: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+44", label: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+977", label: "+977", flag: "🇳🇵", name: "Nepal" },
    { code: "+971", label: "+971", flag: "🇦🇪", name: "UAE" },
    { code: "+65", label: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "+61", label: "+61", flag: "🇦🇺", name: "Australia" },
];

export function CustomCountryCodeSelect({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useClickOutside(ref, () => setOpen(false));

    const selected = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];

    return (
        <div className="relative shrink-0" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="h-full flex items-center gap-1 sm:gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium hover:border-sky-500/60 transition-colors">
                <span className="text-sm sm:text-base leading-none">{selected.flag}</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-900">{selected.code}</span>
                <ChevronDown size={13} className="text-slate-400" />
            </button>

            {open && (
                <div className="absolute left-0 top-full mt-2 z-50 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 overflow-hidden">
                    {COUNTRIES.map((c) => (
                        <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                                onChange(c.code);
                                setOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-left transition-colors ${
                                c.code === value ? "bg-sky-50 font-bold text-sky-800" : "text-slate-700 hover:bg-slate-50"
                            }`}>
                            <span className="text-base leading-none">{c.flag}</span>
                            <span className="font-semibold">{c.code}</span>
                            <span className="text-slate-400 truncate text-[11px]">{c.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
