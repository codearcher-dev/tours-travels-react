import React from "react";

const Cross = ({ className, color, fill = "none" }) => {
    return (
        <svg
            className={className || "w-4 h-4 mt-0.5 shrink-0 text-red-600"}
            color={color}
            viewBox="0 0 24 24"
            fill={fill}
            stroke="currentColor"
            strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
};

export default Cross;
