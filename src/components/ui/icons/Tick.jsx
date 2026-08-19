import React from "react";

const Tick = ({ className, color, fill = "none" }) => {
    return (
        <svg
            className={className || "w-4 h-4 mt-0.5 shrink-0 text-green-600"}
            viewBox="0 0 24 24"
            fill={fill}
            color={color}
            stroke="currentColor"
            strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
        </svg>
    );
};

export default Tick;
