import { useEffect, useState } from "react";
import icon from "../assets/whatsapp-icon.png";
import { usePackages } from "../context/PackageContext";
import coverImage from "../assets/contact-cover.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { countWhatsappClicks, sendEnquiry } from "../services/enquiry.services";
import { countPagevisit } from "../services/initial.services";

export default function Contact() {
    const [submitted, setSubmitted] = useState(Boolean(localStorage.getItem("submitted")) || false);
    const { packages, loading } = usePackages();
    const navigate = useNavigate();
    const phoneNumber = "919142234213";
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    const id = searchParams.get("enq");
    const p = packages.find((item) => item.slug === id);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [adults, setAdults] = useState();
    const [kids, setKids] = useState();
    const [pkg, setPkg] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (submitted) {
            return;
        }
        const formData = {
            name,
            email,
            phone,
            package: pkg,
            adults,
            kids,
            message,
        };

        try {
            const data = await sendEnquiry(formData);
            setName("");
            setEmail("");
            setPhone("");
            setPkg("");
            setAdults("");
            setKids("");
            setMessage("");
            localStorage.setItem("submitted", true);
            setSubmitted(true);
            if (id) {
                navigate("/contact");
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    };

    const handleWhatsAppEnquiry = async (e) => {
        e.preventDefault();
        setError("");
        if (!name || !pkg || !adults || !kids || !phone || !message) {
            setError("All fields are required");
            return;
        }

        try {
            const whatsappMessage = `Hey! I am *_${name}_* and I want to enquire about a package.\nPackage : *_${pkg}_*\nAdults : ${adults}\nKids :${kids}\nPhone no. : ${phone}`;
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
            await countWhatsappClicks();
            setName("");
            setEmail("");
            setPhone("");
            setPkg("");
            setAdults("");
            setKids("");
            setMessage("");
        } catch (error) {
            console.error(error.message);
        }

        if (id) {
            navigate("/contact");
        }
    };

    useEffect(() => {
        setPkg(p?.name);
    }, [p]);

    useEffect(() => {
        const visit = async () => {
            try {
                await countPagevisit();
            } catch (error) {
                console.log(error.message);
            }
        };

        visit();
    }, []);

    return (
        <main className="pt-20 pb-16 min-h-screen bg-paper-dim select-none relative overflow-x-clip">
            <div className="absolute inset-0 z-0 w-full bg-ink">
                <div className="w-full h-full">
                    <img src={coverImage} alt="Cover" className="bg-breathe w-full h-full object-cover opacity-70" />
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
                                        href="mailto:primetraveler2773@gmail.com"
                                        className="text-sm font-medium text-white hover:text-rust transition-colors break-words">
                                        primetraveler2773@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase text-rust tracking-widest mb-1">Studio</div>
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
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-rust mb-2">Plan your escape</p>
                                    <h3 className="text-2xl sm:text-3xl font-medium text-ink">Send an enquiry</h3>
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
                                        className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
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
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                            Email Address {"(Optional)"}
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
                                            required
                                        />
                                        <label
                                            htmlFor="phone"
                                            className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                            Phone Number
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <select
                                            id="destination"
                                            value={pkg}
                                            disabled={id && p ? true : false}
                                            onChange={(e) => setPkg(e.target.value)}
                                            required
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
                                                required
                                                placeholder="Adults"
                                            />
                                            <label
                                                htmlFor="adults"
                                                className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
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
                                                className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
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
                                        className="absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[10px] uppercase tracking-widest text-zinc-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-ink cursor-text">
                                        Tell us about the trip (Dates, occasion, budget...)
                                    </label>
                                </div>

                                {error && (
                                    <div>
                                        <span className="text-red-600">{error}</span>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3 pt-1">
                                    <button
                                        className={`w-full text-white py-3.5 px-6 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-3 rounded-md cursor-pointer disabled:cursor-not-allowed ${submitted ? "bg-slate-500" : "bg-slate-700 hover:bg-rust"}`}
                                        type="submit"
                                        disabled={submitted}>
                                        {submitted ? "Enquiry Completed ✓" : "Submit Enquiry"}
                                        {!submitted && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-zinc-200 flex-1"></div>
                                        <span className="text-xs uppercase tracking-widest text-zinc-400">Or</span>
                                        <div className="h-px bg-zinc-200 flex-1"></div>
                                    </div>

                                    <button
                                        onClick={handleWhatsAppEnquiry}
                                        rel="noopener noreferrer"
                                        className="w-full border border-zinc-200 text-ink hover:text-white py-3.5 px-6 text-xs uppercase tracking-widest bg-white hover:bg-green-600 transition-colors flex items-center justify-center gap-3 rounded-md">
                                        <img src={icon} alt="" className="w-6 h-6" />
                                        Enquire via WhatsApp
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
