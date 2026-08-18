import React from "react";
import { usePackages } from "../context/PackageContext";

export const Timeline = ({ itinerary, className, style }) => {
    const { packages } = usePackages();

    return (
        <div className={`w-full text-[#121212] px-8 pt-12 lg:pt-33 ${className}`} style={{ style }}>
            <div>
                <h2 className="font-display text-ink-soft text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] mb-[28px]">Itinerary</h2>
            </div>
            <div className="flex flex-col">
                {itinerary?.map((item, index) => {
                    const isLast = index === itinerary.length - 1;

                    return (
                        <div key={item.dayNumber || index} className="flex items-stretch">
                            {/* Left Column: Circle + Dynamic Line + Arrow */}
                            <div className="flex flex-col items-center mr-6">
                                {/* Circle Node */}
                                <div className="w-10 h-10 shrink-0 rounded-full border-2 border-gray-400 bg-transparent flex items-center justify-center font-semibold text-sm">
                                    {item.dayNumber}
                                </div>

                                {/* Dynamic Connecting Line & Arrow */}
                                {!isLast && (
                                    <div className="flex flex-col items-center flex-1 my-1 w-full min-h-[56px]">
                                        <div className="w-0.5 flex-1 min-h-[48px] bg-gray-500" />
                                        {/* Downward Arrow Icon */}
                                        <svg className="w-4 h-4 text-gray-500 shrink-0 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Item Label & Dynamic Content */}
                            <div className="pt-2 pb-6 flex-1">
                                <h3 className="text-xl font-medium tracking-wide">Day {item.dayNumber}</h3>
                                {item.title && <p className="text-gray-500 text-sm mt-1">{item.title}</p>}
                                {item.description && <p className="text-gray-500 text-sm mt-1">{item.description}</p>}
                                {item.activities && item.activities.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 font-bold">Activities</p>
                                        <ul className="list-disc pl-4 text-ink-soft">
                                            {item.activities.map((activity, actIdx) => (
                                                <li>
                                                    <p key={activity._id || activity.name || actIdx} className="text-sm mt-1">
                                                        {activity.name}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timeline;
