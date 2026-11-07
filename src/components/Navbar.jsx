import { useEffect, useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
        document.body.style.overflow = "";
    }, [location.pathname]);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/packages", label: "Tours & Packages" },
        { path: "/about", label: "About Us" },
        { path: "/contact", label: "Contact & Enquiry" },
    ];

    return (
        <>
            {/* Top-Anchored Full-Width Solid Navigation Bar (Strictly In-Flow & NOT Floating) */}
            <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
                <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 xl:gap-4">
                    {/* Brand Logo & Name */}
                    <NavLink to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0 group focus:outline-none">
                        <div className="relative shrink-0">
                            <img
                                src={logo}
                                alt="Prime Traveller Logo"
                                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-center leading-tight min-w-0">
                            <span className="font-display font-extrabold tracking-tight text-base sm:text-xl text-slate-900 truncate">
                                Prime <span className="text-sky-600">Traveller</span>
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase hidden xs:block lg:hidden xl:block truncate">
                                Himalayan & India Expeditions
                            </span>
                        </div>
                    </NavLink>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/"}
                                className={({ isActive }) => `
                                    relative px-2.5 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-150
                                    ${isActive ? "text-sky-600 bg-sky-50 font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"}
                                `}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop Direct Contact & CTA Button */}
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                            <a
                                href="tel:+919142234213"
                                className="flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs text-xs font-semibold whitespace-nowrap"
                                title="Call Travel Desk: +91 91422 34213"
                                aria-label="Call Travel Desk">
                                <Phone size={14} className="text-sky-600 shrink-0" />
                                <span className="hidden xl:inline">+91 91422 34213</span>
                            </a>

                            <NavLink
                                to="/contact"
                                className="btn btn-blue text-xs xl:text-sm px-3 xl:px-4 py-1.5 xl:py-2 font-bold shadow-sm whitespace-nowrap">
                                <span>Enquire Now</span>
                                <ArrowRight size={14} />
                            </NavLink>
                        </div>

                        {/* Mobile & Tablet Quick Enquire Button */}
                        {/* <NavLink
                            to="/contact"
                            className="btn btn-blue text-xs py-1.5 px-3 sm:py-2 sm:px-3.5 font-bold shadow-2xs hidden xs:inline-flex lg:hidden">
                            Enquire
                        </NavLink> */}

                        {/* Mobile Hamburger Toggle */}
                        <div className="flex items-center lg:hidden">
                            <button
                                type="button"
                                aria-label={mobileOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none">
                                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer & Backdrop */}
            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />

                    <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] sm:max-w-[340px] z-50 bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between p-4 sm:p-6 lg:hidden overflow-y-auto">
                        {/* Drawer Header */}
                        <div>
                            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                                <div className="flex items-center gap-2.5">
                                    <img src={logo} alt="Prime Traveller" className="h-8 w-auto" />
                                    <span className="font-display font-bold text-base text-slate-900">
                                        Prime <span className="text-sky-600">Traveller</span>
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMobileOpen(false)}
                                    aria-label="Close menu"
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex flex-col gap-1.5 mt-6">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        end={link.path === "/"}
                                        className={({ isActive }) => `
                                            flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-colors
                                            ${isActive ? "bg-slate-900 text-white shadow-xs" : "text-slate-700 hover:bg-slate-100"}
                                        `}>
                                        <span>{link.label}</span>
                                        <ArrowRight size={15} className="opacity-60" />
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        {/* Drawer Bottom Actions */}
                        <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Direct Travel Desk</span>
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href="tel:+919142234213"
                                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold">
                                    <Phone size={14} className="text-slate-600" />
                                    <span>Call</span>
                                </a>
                                <a
                                    href="https://wa.me/919142234213?text=Hi%20Prime%20Traveller%2C%20I%20would%20like%20to%20plan%20a%20tour."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold">
                                    <MessageCircle size={14} className="text-emerald-600" />
                                    <span>WhatsApp</span>
                                </a>
                            </div>

                            <Link to="/contact" className="btn btn-primary w-full py-3 text-xs sm:text-sm font-bold mt-1">
                                Plan Custom Trip
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
