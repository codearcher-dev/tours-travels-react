import { useEffect, useId, useMemo, useRef, useState } from "react";

// ---- Configuration -------------------------------------------------------

const DRAW_MS = 1200; // Time to draw + travel each segment
const PAUSE_MS = 350; // Pause at each point before continuing

const DEFAULT_POINTS = ["Point 1", "Point 2", "Point 3", "Point 4"];

const BREAKPOINT_CLASSES = {
    sm: { hideBelow: "hidden sm:block", hideAbove: "sm:hidden" },
    md: { hideBelow: "hidden md:block", hideAbove: "md:hidden" },
    lg: { hideBelow: "hidden lg:block", hideAbove: "lg:hidden" },
    xl: { hideBelow: "hidden xl:block", hideAbove: "xl:hidden" },
    "2xl": { hideBelow: "hidden 2xl:block", hideAbove: "2xl:hidden" },
};

// Helper: resolves whether input is a Tailwind class or raw CSS color (hex, rgb, named)
function resolveColor(value, type = "fill") {
    if (!value) return { className: "", style: {} };
    const isClass = value.startsWith("fill-") || value.startsWith("stroke-") || value.startsWith("text-");
    if (isClass) {
        return { className: value, style: {} };
    }
    return { className: "", style: { [type]: value } };
}

// Build curved path between two points
function curvedPath(p1, p2, flip) {
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const bend = Math.min(len * 0.35, 70) * (flip ? -1 : 1);
    const cx = mx + nx * bend;
    const cy = my + ny * bend;
    return `M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`;
}

// Auto-layout coordinates
function layoutPoints(names, orientation, viewW, viewH) {
    const n = names.length;
    const margin = 60;

    if (orientation === "vertical") {
        const usableH = viewH - margin * 2;
        const leftX = viewW * 0.28;
        const rightX = viewW * 0.72;
        return names.map((item, i) => {
            const label = typeof item === "string" ? item : item.label;
            return {
                x: typeof item === "object" && item.x != null ? item.x : i % 2 === 0 ? rightX : leftX,
                y: typeof item === "object" && item.y != null ? item.y : n === 1 ? viewH / 2 : margin + (usableH * i) / (n - 1),
                label,
            };
        });
    }

    const usableW = viewW - margin * 2;
    const highY = viewH * 0.28;
    const lowY = viewH * 0.78;
    return names.map((item, i) => {
        const label = typeof item === "string" ? item : item.label;
        return {
            x: typeof item === "object" && item.x != null ? item.x : n === 1 ? viewW / 2 : margin + (usableW * i) / (n - 1),
            y: typeof item === "object" && item.y != null ? item.y : i % 2 === 0 ? lowY : highY,
            label,
        };
    });
}

function Diagram({ points, orientation, initialColor, finalColor, initialStroke, finalStroke }) {
    const isVertical = orientation === "vertical";
    const VIEW_W = isVertical ? 360 : 620;
    const VIEW_H = isVertical ? 620 : 360;

    const rawUid = useId();
    const uid = useMemo(() => rawUid.replace(/[^a-zA-Z0-9-_]/g, ""), [rawUid]);
    const gradientId = `pj-line-${uid}-${orientation}`;
    const glowId = `pj-glow-${uid}-${orientation}`;

    // Serialize points key to prevent recreation on inline array re-renders
    const pointsKey = JSON.stringify(points);
    const resolvedPoints = useMemo(() => {
        const source = points && points.length ? points : DEFAULT_POINTS;
        return layoutPoints(source, orientation, VIEW_W, VIEW_H);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pointsKey, orientation, VIEW_W, VIEW_H]);

    const segmentCount = resolvedPoints.length - 1;
    const pathRefs = useRef([]);
    const travelerRef = useRef(null);
    const [litPoints, setLitPoints] = useState(() => resolvedPoints.map((_, i) => i === 0));

    const rafRef = useRef(null);
    const timeoutRef = useRef(null);

    // Parse color props to support both classes and raw hex/rgb values
    const initFill = resolveColor(initialColor, "fill");
    const activeFill = resolveColor(finalColor, "fill");
    const initStroke = resolveColor(initialStroke, "stroke");
    const activeStroke = resolveColor(finalStroke, "stroke");

    useEffect(() => {
        setLitPoints(resolvedPoints.map((_, i) => i === 0));

        pathRefs.current.forEach((el) => {
            if (!el) return;
            try {
                const len = el.getTotalLength() || 0;
                el.style.strokeDasharray = `${len}`;
                el.style.strokeDashoffset = `${len}`;
            } catch {
                // Fallback for non-rendered SVG containers
            }
        });

        let segIndex = 0;

        const runSegment = () => {
            if (segIndex >= segmentCount) return;

            const pathEl = pathRefs.current[segIndex];
            const traveler = travelerRef.current;
            if (!pathEl) return;

            const len = pathEl.getTotalLength() || 0;
            if (len === 0) return;

            const start = performance.now();

            const step = (now) => {
                const t = Math.min((now - start) / DRAW_MS, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                pathEl.style.strokeDashoffset = `${len * (1 - eased)}`;

                if (traveler) {
                    const pt = pathEl.getPointAtLength(len * eased);
                    traveler.setAttribute("cx", String(pt.x));
                    traveler.setAttribute("cy", String(pt.y));
                    traveler.setAttribute("opacity", t < 1 ? "1" : "0");
                }

                if (t < 1) {
                    rafRef.current = requestAnimationFrame(step);
                } else {
                    setLitPoints((prev) => {
                        const next = [...prev];
                        next[segIndex + 1] = true;
                        return next;
                    });
                    segIndex += 1;
                    timeoutRef.current = setTimeout(runSegment, PAUSE_MS);
                }
            };

            if (traveler) traveler.setAttribute("opacity", "1");
            rafRef.current = requestAnimationFrame(step);
        };

        timeoutRef.current = setTimeout(runSegment, 300);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pointsKey, segmentCount, orientation]);

    return (
        <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full h-auto"
            role="img"
            aria-label="Animated diagram connecting points with curved paths">
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2={isVertical ? "0%" : "100%"} y2={isVertical ? "100%" : "0%"}>
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
                <radialGradient id={glowId}>
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                    <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Ghost connecting paths */}
            {resolvedPoints.slice(0, -1).map((p, i) => (
                <path key={`ghost-${i}`} d={curvedPath(p, resolvedPoints[i + 1], i % 2 === 1)} fill="none" stroke="#1e293b" strokeWidth={2} />
            ))}

            {/* Animated paths */}
            {resolvedPoints.slice(0, -1).map((p, i) => (
                <path
                    key={`seg-${i}`}
                    ref={(el) => {
                        pathRefs.current[i] = el;
                    }}
                    d={curvedPath(p, resolvedPoints[i + 1], i % 2 === 1)}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={3}
                    strokeLinecap="round"
                />
            ))}

            {/* Glow dot traveler */}
            <circle ref={travelerRef} r={14} fill={`url(#${glowId})`} opacity={0} />

            {/* Points & Labels */}
            {resolvedPoints.map((p, i) => {
                const isLit = litPoints[i];
                const strokeConfig = isLit ? activeStroke : initStroke;
                const fillConfig = isLit ? activeFill : initFill;

                return (
                    <g key={`pt-${i}`}>
                        {/* Outer ring */}
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={16}
                            className={`transition-all duration-500 fill-slate-900 ${strokeConfig.className}`}
                            style={strokeConfig.style}
                            strokeWidth={2.5}
                        />

                        {/* Center dot */}
                        <circle cx={p.x} cy={p.y} r={5} className={`transition-all duration-500 ${fillConfig.className}`} style={fillConfig.style} />

                        {/* Text label */}
                        <text
                            x={isVertical ? p.x + (p.x > VIEW_W / 2 ? 26 : -26) : p.x}
                            y={isVertical ? p.y + 4 : p.y - 26}
                            textAnchor={isVertical ? (p.x > VIEW_W / 2 ? "start" : "end") : "middle"}
                            className={`text-[13px] font-medium transition-all duration-500 ${fillConfig.className}`}
                            style={fillConfig.style}>
                            {p.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export default function ProcessPath({
    points,
    orientation = "responsive",
    breakpoint = "md",
    className = "",
    initialColor = "#475569", // Slate-600 (supports hex, rgb, or 'fill-slate-600')
    finalColor = "#67e8f9", // Cyan-300 (supports hex, rgb, or 'fill-cyan-300')
    initialStroke = "#334155", // Slate-700 (supports hex, rgb, or 'stroke-slate-700')
    finalStroke = "#22d3ee", // Cyan-400 (supports hex, rgb, or 'stroke-cyan-400')
}) {
    const colorProps = { initialColor, finalColor, initialStroke, finalStroke };
    const mobileWrapClass = "max-w-xs sm:max-w-sm mx-auto";
    const desktopWrapClass = "max-w-3xl mx-auto";

    if (orientation !== "responsive") {
        const isVertical = orientation === "vertical";
        return (
            <div className={`w-full ${isVertical ? mobileWrapClass : desktopWrapClass} ${className}`}>
                <Diagram points={points} orientation={orientation} {...colorProps} />
            </div>
        );
    }

    const bpClasses = BREAKPOINT_CLASSES[breakpoint] || BREAKPOINT_CLASSES.md;

    return (
        <div className={`w-full ${className}`}>
            <div className={`w-full ${mobileWrapClass} ${bpClasses.hideAbove}`}>
                <Diagram points={points} orientation="vertical" {...colorProps} />
            </div>
            <div className={`w-full ${desktopWrapClass} ${bpClasses.hideBelow}`}>
                <Diagram points={points} orientation="horizontal" {...colorProps} />
            </div>
        </div>
    );
}
