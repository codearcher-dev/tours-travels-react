import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
    Phone,
    Mail,
    MapPin,
    MessageCircle,
    CheckCircle2,
    Send,
    Clock,
    AlertCircle,
    Package,
} from "lucide-react";
import { usePackages } from "../context/PackageContext";
import {
    CustomSelect,
    CustomDatePicker,
    CustomCounter,
    CustomCountryCodeSelect,
} from "../components/ui/CustomControls";
import coverImage from "../assets/contact-cover.png";
import { countWhatsappClicks, initiateNotification, sendEnquiry } from "../services/enquiry.services";
import { countPagevisit } from "../services/initial.services";

const todayString = new Date().toISOString().split("T")[0];

export default function Contact() {
    const { packages } = usePackages();
    const [searchParams] = useSearchParams();
    const enqSlug = searchParams.get("enq");

    const matchedPkg = packages.find(
        (p) => p.slug === enqSlug || p.id === enqSlug || String(p._id) === enqSlug
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [selectedPkg, setSelectedPkg] = useState(matchedPkg?.name || "");
    const [adults, setAdults] = useState("2");
    const [kids, setKids] = useState("0");
    const [arrivalDate, setArrivalDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [message, setMessage] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const phoneNumber = "919142234213";

    useEffect(() => {
        if (matchedPkg?.name) {
            setSelectedPkg(matchedPkg.name);
        } else if (enqSlug === "custom") {
            setSelectedPkg("Custom Himalayan Tour");
            const stops = searchParams.get("stops");
            const duration = searchParams.get("duration");
            const vehicle = searchParams.get("vehicle");
            if (stops || duration || vehicle) {
                setMessage(
                    `Custom Tour Request:\n• Destinations: ${stops || "Flexible"}\n• Target Duration: ${duration || "Flexible"}\n• Preferred Vehicle: ${vehicle || "Standard 4x4"}`
                );
            }
        }
    }, [matchedPkg, enqSlug, searchParams]);

    useEffect(() => {
        const visit = async () => {
            try {
                await countPagevisit();
            } catch {
                // Ignore tracking error
            }
        };
        visit();
    }, []);

    const packageOptions = [
        { label: "-- Select a Package --", value: "" },
        ...packages.map((p) => ({ label: p.name, value: p.name })),
        { label: "Other / Custom Himalayan Tour", value: "Custom Himalayan Tour" },
    ];

    const validateForm = () => {
        if (!name.trim()) {
            setError("Please enter your name.");
            return false;
        }
        if (!phone.trim()) {
            setError("Please enter your phone number.");
            return false;
        }
        if (!selectedPkg) {
            setError("Please select a package.");
            return false;
        }
        if (!arrivalDate) {
            setError("Please select your arrival date.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setSubmitting(true);
        const formData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            package: selectedPkg,
            adults: Number(adults) || 1,
            kids: Number(kids) || 0,
            arrivalDate,
            returnDate,
            message: message.trim() || `Enquiry for ${selectedPkg}`,
            countryCode: countryCode.replace("+", ""),
        };

        try {
            await sendEnquiry(formData);
            try {
                await initiateNotification({
                    title: "New Tour Enquiry",
                    body: `Name: ${formData.name}\nPhone: ${formData.phone}\nPackage: ${formData.package}\nAdults: ${formData.adults}\nDate: ${formData.arrivalDate}`,
                });
            } catch {
                // Ignore notification failure
            }

            setSubmitted(true);
        } catch (err) {
            console.error("Enquiry submission error:", err);
            // Show graceful acknowledgement
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleWhatsAppSubmit = async () => {
        if (!name.trim()) {
            setError("Please enter your name before opening WhatsApp.");
            return;
        }
        setError("");

        const waMsg = `Hello Prime Traveller! 👋\n\n*Name:* ${name}\n*Package:* ${selectedPkg || "Custom Himalayan Route"}\n*Travelers:* ${adults} Adults, ${kids} Children\n*Preferred Date:* ${arrivalDate || "Flexible"}\n*Phone:* ${phone || "N/A"}\n*Notes:* ${message || "Please share itinerary & enquiry details."}`;

        try {
            await countWhatsappClicks();
        } catch {
            // Ignore analytics error
        }

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMsg)}`, "_blank");
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-16 sm:pb-20 select-none overflow-x-hidden">
            {/* HERO BANNER */}
            <div className="relative w-full min-h-[190px] xs:min-h-[220px] sm:min-h-[320px] flex items-center justify-center py-7 xs:py-9 sm:py-14 px-3.5 sm:px-6 md:px-8 bg-slate-950 overflow-hidden">
                <img
                    src={coverImage}
                    alt="Himalayan Mountain Path"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 bg-breathe"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30" />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-sky-400 font-bold block mb-1">
                        Contact Us
                    </span>
                    <h1 className="font-display text-xl xs:text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                        Get in Touch
                    </h1>
                    <p className="mt-1.5 text-[11px] sm:text-sm text-slate-300 font-normal leading-relaxed max-w-lg mx-auto">
                        Reach out to our local team. We are here to help you plan a smooth and memorable holiday.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT WRAPPER */}
            <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 -mt-4 sm:-mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                    {/* LEFT COLUMN: Contact Details */}
                    <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 xs:p-4 sm:p-6 md:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-sky-600 font-bold block mb-0.5 sm:mb-1">
                                    Direct Contact
                                </span>
                                <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">
                                    We're Here to Help
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal mb-3.5 sm:mb-5">
                                    Have questions about roads, weather, permits, or traveling with family? We are here to help.
                                </p>

                                <div className="space-y-2.5 sm:space-y-4">
                                    {/* Phone Card */}
                                    <div className="flex items-start gap-2.5 sm:gap-3.5">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                                            <Phone size={15} className="sm:w-[18px] sm:h-[18px]" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                                                Call Us
                                            </span>
                                            <a
                                                href="tel:+919142234213"
                                                className="text-xs sm:text-base font-bold text-slate-900 hover:text-sky-600 transition-colors block truncate">
                                                +91 91422 34213
                                            </a>
                                            <span className="block text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                                                Open daily: 8:00 AM – 10:00 PM
                                            </span>
                                        </div>
                                    </div>

                                    {/* WhatsApp Card */}
                                    <div className="flex items-start gap-2.5 sm:gap-3.5">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                                            <MessageCircle size={15} className="sm:w-[18px] sm:h-[18px]" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                                                WhatsApp
                                            </span>
                                            <a
                                                href="https://wa.me/919142234213?text=Hi%20Prime%20Traveller%2C%20I%20have%20an%20enquiry."
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs sm:text-base font-bold text-emerald-700 hover:underline block truncate">
                                                Chat on WhatsApp
                                            </a>
                                            <span className="block text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                                                Quick reply in 15 minutes
                                            </span>
                                        </div>
                                    </div>

                                    {/* Email Card */}
                                    <div className="flex items-start gap-2.5 sm:gap-3.5">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0">
                                            <Mail size={15} className="sm:w-[18px] sm:h-[18px]" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                                                Email Us
                                            </span>
                                            <a
                                                href="mailto:primetraveler2773@gmail.com"
                                                className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors break-all block">
                                                primetraveler2773@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Office Card */}
                                    <div className="flex items-start gap-2.5 sm:gap-3.5">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0">
                                            <MapPin size={15} className="sm:w-[18px] sm:h-[18px]" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                                                Our Office
                                            </span>
                                            <p className="text-[11px] sm:text-sm text-slate-600 font-normal leading-relaxed">
                                                New Colony, Amkura Basti, Maithon, Dhanbad, Jharkhand, India · 828207
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
                                <Clock size={13} className="text-slate-500 shrink-0" />
                                <span>Free enquiry with no obligation.</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Custom Designed Form (No native select or date inputs) */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 xs:p-4 sm:p-6 md:p-7 border border-slate-200/90 shadow-xs">
                            {submitted ? (
                                <div className="text-center py-6 sm:py-12">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        <CheckCircle2 size={28} className="sm:w-9 sm:h-9" />
                                    </div>
                                    <h3 className="font-display text-lg sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-2">
                                        Enquiry Received!
                                    </h3>
                                    <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-5 sm:mb-8 font-normal leading-relaxed">
                                        Thank you, <strong className="text-slate-900">{name || "Traveler"}</strong>. Our team will review your request for <strong className="text-slate-900">{selectedPkg}</strong> and contact you via phone or WhatsApp within 24 hours.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setSubmitted(false)}
                                            className="btn btn-secondary text-xs sm:text-sm w-full sm:w-auto py-2.5 sm:py-3">
                                            Send Another Enquiry
                                        </button>
                                        <Link to="/packages" className="btn btn-primary text-xs sm:text-sm w-full sm:w-auto py-2.5 sm:py-3">
                                            Explore More Packages
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-3.5 font-sans">
                                    <div>
                                        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-sky-600 font-bold block mb-0.5 sm:mb-1">
                                            Tour Enquiry
                                        </span>
                                        <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-slate-900">
                                            Send a Tour Enquiry
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-slate-500 font-normal mt-0.5">
                                            Fill in your trip details below. Fields with * are required.
                                        </p>
                                    </div>

                                    {/* Error Banner */}
                                    {error && (
                                        <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                                            <AlertCircle size={15} className="shrink-0" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    {/* Row 1: Name & Phone with Custom Country Select */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                                        <div>
                                            <label htmlFor="contact-name" className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                id="contact-name"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your name"
                                                className="w-full bg-slate-50 hover:bg-white focus:bg-white px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-500/10 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="contact-phone" className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                                                Phone Number *
                                            </label>
                                            <div className="flex gap-1.5 sm:gap-2">
                                                <CustomCountryCodeSelect
                                                    value={countryCode}
                                                    onChange={setCountryCode}
                                                />
                                                <input
                                                    id="contact-phone"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="Phone number"
                                                    className="w-full bg-slate-50 hover:bg-white focus:bg-white px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-500/10 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2: Email & Custom Package Selector */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                                        <div>
                                            <label htmlFor="contact-email" className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                                                Email (Optional)
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email address"
                                                className="w-full bg-slate-50 hover:bg-white focus:bg-white px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-500/10 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <CustomSelect
                                                label="Select Package *"
                                                icon={Package}
                                                value={selectedPkg}
                                                onChange={setSelectedPkg}
                                                options={packageOptions}
                                                searchable={true}
                                                placeholder="Choose a package"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Custom Date Pickers (2 fields in 1 line on mobile & desktop) */}
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
                                        <CustomDatePicker
                                            label="Arrival Date *"
                                            value={arrivalDate}
                                            onChange={setArrivalDate}
                                            minDate={todayString}
                                            placeholder="Select date"
                                            align="left"
                                        />

                                        <CustomDatePicker
                                            label="Return Date"
                                            value={returnDate}
                                            onChange={setReturnDate}
                                            minDate={arrivalDate || todayString}
                                            placeholder="Select date"
                                            align="right"
                                        />
                                    </div>

                                    {/* Row 4: Custom Steppers for Guests (2 fields in 1 line on mobile & desktop) */}
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
                                        <CustomCounter
                                            label="Adults"
                                            subtitle="12+ years"
                                            value={adults}
                                            onChange={setAdults}
                                            min={1}
                                            max={20}
                                        />

                                        <CustomCounter
                                            label="Children"
                                            subtitle="Under 12"
                                            value={kids}
                                            onChange={setKids}
                                            min={0}
                                            max={10}
                                        />
                                    </div>

                                    {/* Row 5: Notes */}
                                    <div>
                                        <label htmlFor="contact-message" className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                                            Special Requests or Questions
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            rows={2}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Tell us about your trip plans, places you want to visit, or any questions..."
                                            className="w-full bg-slate-50 hover:bg-white focus:bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-500/10 resize-none transition-colors sm:rows-3"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-1.5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="btn btn-blue w-full sm:flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold shadow-sm disabled:opacity-50">
                                            {submitting ? "Sending..." : "Submit Enquiry"}
                                            <Send size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleWhatsAppSubmit}
                                            className="btn btn-secondary w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
                                            <MessageCircle size={15} className="text-emerald-600" />
                                            <span>Chat on WhatsApp</span>
                                        </button>
                                    </div>

                                    <p className="text-[10px] sm:text-[11px] text-slate-400 text-center mt-0.5">
                                        Your details are kept safe and will only be used to reply to your enquiry.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
