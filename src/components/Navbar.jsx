import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [shrink, setShrink] = useState(false);

    useEffect(() => {
        const onScroll = () => setShrink(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const linkClass = ({ isActive }) =>
        "font-mono text-[13px] uppercase px-4 py-[9px] rounded-[20px] transition-all duration-250 relative " +
        (isActive
            ? "text-ink bg-paper-dim after:content-[''] after:absolute after:bottom-[3px] after:left-4 after:right-4 after:h-[2px] after:bg-gold"
            : "text-ink-soft hover:text-ink hover:bg-paper-dim");

    return (
        <>
            <div className="bg-ink text-paper text-[12px] py-[7px] text-center tracking-[0.08em] font-mono">
                FLAT <b className="text-gold">12% OFF</b> ON ALL 2026 EARLY-BIRD BOOKINGS &nbsp;·&nbsp; MADE WITH MERIDIAN JOURNEYS
            </div>

            <header
                className={`sticky top-0 z-[100] bg-[rgba(247,244,238,0.92)] backdrop-blur-[10px] border-b border-line transition-[padding,box-shadow] duration-350 ease-out ${shrink ? "shadow-[0_6px_24px_rgba(18,35,46,0.06)]" : ""}`}>
                <div
                    className={`max-w-[1200px] mx-auto flex items-center justify-between px-8 transition-[padding] duration-350 ease-out ${shrink ? "py-3" : "py-[22px]"}`}>
                    <NavLink to="/" className="flex items-center gap-[10px] text-[19px] font-semibold">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[26px] h-[26px]">
                            <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z" />
                        </svg>
                        Meridian Journeys
                    </NavLink>

                    <nav className="hidden lg:flex gap-[6px] items-center">
                        <NavLink to="/" end className={linkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/packages" className={linkClass}>
                            Packages
                        </NavLink>
                        <NavLink to="/about" className={linkClass}>
                            About
                        </NavLink>
                        <NavLink to="/contact" className={linkClass}>
                            Contact
                        </NavLink>
                    </nav>

                    <NavLink to="/contact" className="btn btn-primary gap-2 rounded-sm px-[22px] py-[12px]">
                        Enquire Now
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </NavLink>
                </div>
            </header>
        </>
    );
}
