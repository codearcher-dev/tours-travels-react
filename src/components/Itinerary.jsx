import { Check, X, Coffee, Utensils, Moon, Calendar } from "lucide-react";

export default function Timeline({ itinerary, className = "", style }) {
    if (!itinerary || itinerary.length === 0) {
        return (
            <div className={`w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 text-center ${className}`} style={style}>
                <Calendar className="mx-auto text-slate-400 mb-2" size={28} />
                <p className="text-slate-600 text-xs sm:text-sm">
                    Detailed day-by-day itinerary will be customized for your dates upon enquiry.
                </p>
            </div>
        );
    }

    return (
        <div className={`w-full ${className}`} style={style}>
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-8 pb-3.5 border-b border-slate-100">
                <div>
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest text-sky-600 font-semibold block">
                        Day-by-Day Schedule
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                        Detailed Itinerary
                    </h3>
                </div>
                <span className="self-start xs:self-auto text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 bg-slate-50 text-slate-700 rounded-full border border-slate-200">
                    {itinerary.length} Days Planned
                </span>
            </div>

            <div className="relative pl-5 sm:pl-8 border-l-2 border-sky-500/40 ml-2.5 sm:ml-4 flex flex-col gap-6 sm:gap-8">
                {itinerary.map((item, index) => {
                    const dayNum = item.dayNumber || index + 1;
                    const meals = item.mealsIncluded || {};

                    return (
                        <div key={item._id || dayNum} className="relative group">
                            {/* Step Marker on line */}
                            <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-900 text-white border-2 border-white shadow-md flex items-center justify-center text-[10px] sm:text-xs font-bold group-hover:bg-sky-600 transition-colors">
                                {dayNum < 10 ? `0${dayNum}` : dayNum}
                            </div>

                            {/* Card Content */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                    <span className="text-[11px] uppercase tracking-wider text-sky-600 font-bold">
                                        Day {dayNum}
                                    </span>
                                </div>

                                <h4 className="font-display text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-2">
                                    {item.title}
                                </h4>

                                {item.description && (
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-3 sm:mb-4">
                                        {item.description}
                                    </p>
                                )}

                                {/* Activities List */}
                                {item.activities && item.activities.length > 0 && (
                                    <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-100">
                                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                                            Activities & Sightseeing
                                        </span>
                                        <ul className="flex flex-col gap-2">
                                            {item.activities.map((act, actIdx) => (
                                                <li
                                                    key={act._id || actIdx}
                                                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                                                    <span className="flex-1 leading-snug">
                                                        {act.name}
                                                        {act.isExtraCharge && act.extraChargeAmount > 0 && (
                                                            <span className="ml-1.5 text-amber-700 font-medium text-[11px]">
                                                                (+₹{act.extraChargeAmount})
                                                            </span>
                                                        )}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Meals Breakdown */}
                                {(meals.breakfast !== undefined || meals.lunch !== undefined || meals.dinner !== undefined) && (
                                    <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                                        <span className="text-[11px] text-slate-500 font-medium mr-1">Meals:</span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-medium ${
                                                meals.breakfast ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-slate-100 text-slate-400"
                                            }`}>
                                            <Coffee size={12} className="shrink-0" />
                                            <span>Breakfast</span> {meals.breakfast ? <Check size={12} /> : <X size={12} />}
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-medium ${
                                                meals.lunch ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-slate-100 text-slate-400"
                                            }`}>
                                            <Utensils size={12} className="shrink-0" />
                                            <span>Lunch</span> {meals.lunch ? <Check size={12} /> : <X size={12} />}
                                        </span>
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-medium ${
                                                meals.dinner ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-slate-100 text-slate-400"
                                            }`}>
                                            <Moon size={12} className="shrink-0" />
                                            <span>Dinner</span> {meals.dinner ? <Check size={12} /> : <X size={12} />}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
