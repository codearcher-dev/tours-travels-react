import { useEffect, useState } from "react";
import icon from "../assets/whatsapp-icon.png";
import { usePackages } from "../context/PackageContext";
import coverImage from "../assets/contact-cover.png";
import { useSearchParams } from "react-router-dom";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const { packages, loading } = usePackages();

    const [searchParams] = useSearchParams();
    const id = searchParams.get("for");
    const p = packages.find((item) => item.slug === id);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [adults, setAdults] = useState();
    const [kids, setKids] = useState();
    const [packageName, setPackageName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            phone,
            package: packageName,
            adults,
            kids,
            message,
        };
        console.log(formData);
        setSubmitted(true);
    };
    useEffect(() => {
        console.log("Setting ", p);
        setPackageName(p?.name);
    }, [p]);

    return (
        <main className="pt-20 pb-16 min-h-screen bg-paper-dim select-none relative">
            <div className="absolute inset-0 z-0 w-full bg-ink">
                <div className="w-full h-full">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 mix-blend-multiply"></div>
                </div>
            </div>
            <div className="relative z-10 max-w-[1040px] mx-auto px-4 sm:px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* LEFT COLUMN: Title and Info */}
                    <div className="lg:col-span-4" data-aos="fade-right">
                        <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                            <div className="flex flex-col gap-3">
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust block">Contact Us</span>
                                <h1 className="font-display text-4xl sm:text-5xl font-medium leading-[1.05] text-white">
                                    Start the
                                    <br />
                                    <span className="italic text-rust">conversation.</span>
                                </h1>

                                <p className="text-white font-sans text-sm font-light leading-relaxed max-w-sm">
                                    Reach out to our travel designers for a tailored itinerary, expert guidance, or any questions about your next
                                    journey.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 border-t border-zinc-300/70 pt-5">
                                <div>
                                    <div className="text-[10px] uppercase text-rust font-mono tracking-widest mb-1">Call the desk</div>
                                    <a href="tel:+919876543210" className="text-sm font-medium text-white hover:text-rust transition-colors">
                                        +91 91422 34213
                                    </a>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase text-rust font-mono tracking-widest mb-1">Email</div>
                                    <a
                                        href="mailto:fly@meridianjourneys.com"
                                        className="text-sm font-medium text-white hover:text-rust transition-colors break-words">
                                        primetraveler2773@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase text-rust font-mono tracking-widest mb-1">Studio</div>
                                    <div className="text-sm font-medium text-white leading-snug">
                                        Maithon, Dhanbad
                                        <br />
                                        Jharkhand, India
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Form */}
                    <div className="lg:col-span-8" data-aos="fade-left" data-aos-delay="200">
                        <div className="bg-white/80 rounded-xl p-5 sm:p-8 shadow-sm border border-zinc-100">
                            <div className="flex items-end justify-between gap-4 mb-7">
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rust mb-2">Plan your escape</p>
                                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink">Send an enquiry</h3>
                                </div>
                                <span className="hidden sm:block text-xs text-zinc-400">We reply within one working day.</span>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="relative">
                                    <input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors peer placeholder-transparent"
                                        type="text"
                                        placeholder="Your Name"
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                        Full Name
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <input
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors peer placeholder-transparent"
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors peer placeholder-transparent"
                                            type="tel"
                                            placeholder="Phone Number"
                                        />
                                        <label
                                            htmlFor="phone"
                                            className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                            Phone Number
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <select
                                            id="destination"
                                            value={packageName}
                                            disabled={id && p ? true : false}
                                            onChange={(e) => setPackageName(e.target.value)}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors appearance-none cursor-pointer disabled:bg-gray-300">
                                            <option value="" disabled selected>
                                                Select Package
                                            </option>
                                            {packages.map((pkg, idx) => (
                                                <option value={pkg.name} key={idx}>
                                                    {pkg.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-3.5 pointer-events-none text-zinc-400">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                id="adults"
                                                value={adults}
                                                onChange={(e) => setAdults(e.target.value)}
                                                className="contact-number w-full appearance-none bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors peer placeholder-transparent"
                                                type="number"
                                                min="1"
                                                placeholder="Adults"
                                            />
                                            <label
                                                htmlFor="adults"
                                                className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                                Adults
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="kids"
                                                value={kids}
                                                onChange={(e) => setKids(e.target.value)}
                                                className="contact-number w-full appearance-none bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors peer placeholder-transparent"
                                                type="number"
                                                min="0"
                                                placeholder="Kids"
                                            />
                                            <label
                                                htmlFor="kids"
                                                className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                                Kids
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-md px-3.5 py-3 text-base text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors peer placeholder-transparent resize-y"
                                        rows="3"
                                        placeholder="Tell us about the trip"></textarea>
                                    <label
                                        htmlFor="message"
                                        className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                        Tell us about the trip (Dates, occasion, budget...)
                                    </label>
                                </div>

                                <div className="flex flex-col gap-3 pt-1">
                                    <button
                                        className="w-full bg-ink text-white py-3.5 px-6 font-mono text-xs uppercase tracking-widest hover:bg-rust transition-colors flex items-center justify-center gap-3 rounded-md cursor-pointer"
                                        type="submit">
                                        {submitted ? "Enquiry Sent ✓" : "Submit Enquiry"}
                                        {!submitted && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-zinc-200 flex-1"></div>
                                        <span className="text-xs uppercase tracking-widest font-mono text-zinc-400">Or</span>
                                        <div className="h-px bg-zinc-200 flex-1"></div>
                                    </div>

                                    <a
                                        href="https://wa.me/919142234213?text=Hello!%20I'm%20interested%20in%20booking%20a%20journey%20with%20Prime%20Traveller."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full border border-zinc-200 text-ink hover:text-white py-3.5 px-6 font-mono text-xs uppercase tracking-widest bg-white hover:bg-green-600 transition-colors flex items-center justify-center gap-3 rounded-md">
                                        Enquire via WhatsApp
                                        <img src={icon} alt="" className="w-6 h-6" />
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
