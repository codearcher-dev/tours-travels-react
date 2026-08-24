import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/packages", label: "Packages" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];

    const useLightText = !scrolled;

    return (
        <>
            <header
                className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-out flex justify-center select-none ${scrolled ? "top-1" : "top-0"}`}>
                <div
                    className={`flex items-center justify-between transition-all duration-500 ease-out px-4 md:px-6 py-2 ${
                        scrolled
                            ? "bg-white backdrop-blur-md shadow-md w-[95%] md:w-[90%] max-w-[1000px] rounded-full"
                            : "bg-transparent w-full max-w-[1200px]"
                    }`}>
                    <NavLink to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Prime Traveller Logo" className="h-12" />
                        <span className={`tracking-tight whitespace-nowrap ${useLightText ? "text-white" : "text-ink"}`}>
                            <p className="font-sans font-bold uppercase text-xl">Prime Traveller</p>
                            <p className="font-display font-semibold italic text-xs text-center">All over India tour package</p>
                        </span>
                    </NavLink>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/"}
                                className={({ isActive }) => `
                                    px-5 py-2 text-[14px] font-sans transition-colors rounded-full
                                    ${
                                        isActive
                                            ? useLightText
                                                ? "bg-white text-ink"
                                                : "bg-ink text-paper"
                                            : useLightText
                                              ? "text-white/80 hover:text-white hover:bg-white/10"
                                              : "text-ink-soft hover:text-ink hover:bg-paper-dim/50"
                                    }
                                `}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="hidden md:block">
                        <NavLink
                            to="/contact"
                            className={`text-[13px] font-medium tracking-wide uppercase px-6 py-2.5 rounded-full border transition-colors shadow-sm ${
                                useLightText
                                    ? "bg-transparent text-white border-white hover:bg-white hover:text-ink"
                                    : "bg-ink text-paper border-ink hover:bg-transparent hover:text-ink"
                            }`}>
                            Enquire
                        </NavLink>
                    </div>

                    <button className={`md:hidden p-2 ${useLightText ? "text-white" : "text-ink"}`} onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X size={24} color="black" className="cursor-pointer" /> : <Menu size={24} className="cursor-pointer" />}
                    </button>
                </div>
            </header>

            {mobileOpen && (
                <div className="fixed inset-0 z-[99] bg-paper pt-28 px-8 md:hidden select-none">
                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/"}
                                className={({ isActive }) =>
                                    `text-4xl font-display tracking-tight transition-colors ${isActive ? "text-gold" : "text-ink"}`
                                }>
                                {link.label}
                            </NavLink>
                        ))}
                        <div className="mt-12">
                            <NavLink to="/contact" className="btn btn-primary w-full text-lg">
                                Start an Enquiry
                            </NavLink>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
