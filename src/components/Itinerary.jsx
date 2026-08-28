import Cross from "./ui/icons/Cross.jsx";
import Tick from "./ui/icons/Tick.jsx";

const Timeline = ({ itinerary, className, style }) => {
    return (
        <div className={`w-full ${className}`} style={style}>
            <h2 className="font-display text-3xl mb-12 text-rust">The Route</h2>

            {!itinerary || itinerary.length === 0 ? (
                <div className="text-zinc-500 italic p-6 border border-zinc-200 bg-white">
                    Full day-by-day itinerary will be provided upon enquiry.
                </div>
            ) : (
                <div className="flex flex-col border-l border-zinc-200">
                    {itinerary.map((item, index) => {
                        return (
                            <div key={item.dayNumber || index} className="relative px-4  pb-16 last:pb-0">
                                {/* Marker */}
                                <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 bg-ink rounded-full"></div>

                                <div className="-mt-1.5">
                                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust block mb-2">Day {item.dayNumber}</span>
                                    <h3 className="font-display text-2xl mb-4 text-rust">{item.title}</h3>
                                    {item.description && <p className="text-zinc-600 font-sans leading-relaxed text-sm mb-6">{item.description}</p>}

                                    {item.activities && item.activities.length > 0 && (
                                        <div className="bg-paper p-6 rounded-md">
                                            <p className="font-mono text-xs uppercase tracking-widest text-rust mb-4">Agenda</p>
                                            <ul className="flex flex-col gap-3">
                                                {item.activities.map((activity, actIdx) => (
                                                    <li
                                                        key={activity._id || activity.name || actIdx}
                                                        className="flex items-start gap-3 text-zinc-700 text-sm">
                                                        <span className="w-1 h-1 bg-rust rounded-full mt-2 shrink-0"></span>
                                                        <span>{activity.name}</span>
                                                        {activity.isExtraCharge ? (
                                                            <span className="text-red-600">(+₹{activity.extraChargeAmount})</span>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </li>
                                                ))}
                                                <p className="font-mono text-xs uppercase tracking-widest text-rust">Additional Info</p>
                                                {item.mealsIncluded && (
                                                    <li className="flex flex-wrap items-start gap-3 text-zinc-700 text-sm">
                                                        <span className="w-1 h-1 bg-rust rounded-full mt-2 shrink-0"></span>
                                                        Breakfast {item.mealsIncluded.breakfast ? <Tick /> : <Cross />}
                                                        Lunch {item.mealsIncluded.lunch ? <Tick /> : <Cross />}
                                                        Dinner {item.mealsIncluded.dinner ? <Tick /> : <Cross />}
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Timeline;
