import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ShieldCheck, Heart } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
    const destinationsList = [
        "North Sikkim",
        "Darjeeling",
        "Gangtok",
        "Kalimpong",
        "Mirik",
        "Pelling",
    ];

    return (
        <footer className="bg-slate-950 text-white pt-14 sm:pt-20 pb-10 sm:pb-12 border-t border-slate-800 select-none">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-slate-800">
                    {/* Brand Info (Col 1 - 5) */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <Link to="/" className="flex items-center gap-3 mb-4 inline-flex">
                                <img src={logo} alt="Prime Traveller Logo" className="h-9 sm:h-10 w-auto object-contain" />
                                <div>
                                    <span className="font-display font-black text-lg sm:text-xl uppercase tracking-tight block text-white">
                                        Prime <span className="text-sky-400">Traveller</span>
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium tracking-wider block">
                                        All India & Himalayan Tours
                                    </span>
                                </div>
                            </Link>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm font-normal mb-6">
                                We plan easy, memorable holidays across Sikkim, Darjeeling, and India. Clean hotels, safe local drivers, and 24/7 support throughout your trip.
                            </p>

                            {/* Trust Badge */}
                            <div className="inline-flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 max-w-full">
                                <ShieldCheck size={16} className="text-sky-400 shrink-0" />
                                <span className="leading-tight text-[11px] sm:text-xs">Govt. Authorized Tour Operator · Sikkim & West Bengal</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Navigation (Col 6 - 7) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-display text-xs uppercase tracking-wider text-sky-400 font-bold mb-4">
                            Explore
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                            <li>
                                <Link to="/" className="hover:text-sky-400 transition-colors inline-block">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/packages" className="hover:text-sky-400 transition-colors inline-block">
                                    Tour Packages
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-sky-400 transition-colors inline-block">
                                    About Prime Traveller
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-sky-400 transition-colors inline-block">
                                    Plan a Custom Trip
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="hover:text-sky-400 transition-colors inline-block">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-and-conditions" className="hover:text-sky-400 transition-colors inline-block">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Destinations (Col 8 - 9) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-display text-xs uppercase tracking-wider text-sky-400 font-bold mb-4">
                            Destinations
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                            {destinationsList.map((dest) => (
                                <li key={dest}>
                                    <Link
                                        to={`/packages?dest=${encodeURIComponent(dest)}`}
                                        className="hover:text-sky-400 transition-colors inline-flex items-center gap-1 group">
                                        <span>{dest}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Desk (Col 10 - 12) */}
                    <div className="lg:col-span-3">
                        <h4 className="font-display text-xs uppercase tracking-wider text-sky-400 font-bold mb-4">
                            Contact Us
                        </h4>
                        <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-300">
                            <li className="flex items-start gap-2.5">
                                <MapPin size={16} className="text-sky-400 mt-0.5 shrink-0" />
                                <span className="leading-snug text-xs">
                                    Maithon, Dhanbad, Jharkhand, India · 828207
                                </span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={15} className="text-sky-400 shrink-0" />
                                <a href="tel:+919142234213" className="hover:text-sky-400 transition-colors text-xs font-semibold">
                                    +91 91422 34213
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={15} className="text-sky-400 shrink-0" />
                                <a
                                    href="mailto:primetraveler2773@gmail.com"
                                    className="hover:text-sky-400 transition-colors text-xs truncate font-medium">
                                    primetraveler2773@gmail.com
                                </a>
                            </li>
                        </ul>

                        <div className="mt-5">
                            <a
                                href="https://wa.me/919142234213?text=Hi%20Prime%20Traveller%2C%20I%20want%20to%20plan%20a%20tour."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary bg-white/10 border-white/20 hover:bg-white/20 text-xs py-2.5 px-4 w-full text-center">
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                        <span>© {new Date().getFullYear()} Prime Traveller. Built with</span>
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        <span>for travelers everywhere.</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-2">
                        <Link to="/privacy-policy" className="hover:text-sky-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-and-conditions" className="hover:text-sky-400 transition-colors">
                            Terms & Conditions
                        </Link>
                        <a
                            href="https://www.instagram.com/prime_traveller_india"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sky-400 transition-colors">
                            Instagram
                        </a>
                        <Link to="/contact" className="hover:text-sky-400 transition-colors">
                            Support & FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
