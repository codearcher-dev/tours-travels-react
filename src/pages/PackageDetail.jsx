import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePackages } from "../context/PackageContext";
import Timeline from "../components/Itinerary";
import { SkeletonPackageDetail } from "../components/ui/LoadingState";
import { MapPin, Check, X, MessageCircle, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { countPagevisit } from "../services/initial.services";

export default function PackageDetail() {
    const { packages, loading } = usePackages();
    const { slug } = useParams();
    const navigate = useNavigate();

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const pkg = packages.find((p) => p.slug === slug || p.id === slug || String(p._id) === slug);

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

    if (loading) {
        return <SkeletonPackageDetail />;
    }

    if (!pkg) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center bg-slate-50">
                <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
                    <MapPin size={32} />
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Journey Not Found</h1>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mb-6 font-normal">
                    The requested tour package may have moved or been updated. Explore our available collection of Himalayan routes.
                </p>
                <Link to="/packages" className="btn btn-primary text-xs">
                    Return to Packages
                </Link>
            </main>
        );
    }

    const imgUrl =
        typeof pkg.img === "string"
            ? pkg.img
            : pkg.img?.url ||
              (pkg.images && typeof pkg.images[0] === "string" ? pkg.images[0] : pkg.images?.[0]?.url) ||
              "";

    const images =
        Array.isArray(pkg.images) && pkg.images.length > 0
            ? pkg.images.map((im) => (typeof im === "string" ? { url: im } : im))
            : imgUrl
            ? [{ url: imgUrl }]
            : [];

    const nights = pkg.duration?.nights ?? 3;
    const days = pkg.duration?.days ?? 4;
    const actualPrice = Number(pkg.price?.actual || pkg.price?.originalPrice || 0);
    const discountedPrice = Number(pkg.price?.discounted || pkg.price?.discountedPrice || actualPrice);
    const savingsPercent = actualPrice > discountedPrice ? Math.round(((actualPrice - discountedPrice) / actualPrice) * 100) : 0;

    const whatsappText = encodeURIComponent(
        `Hi Prime Traveller! I am interested in booking the "${pkg.name}" (${nights}N/${days}D) starting at ₹${discountedPrice}. Please share itinerary and availability.`,
    );
    const whatsappUrl = `https://wa.me/919142234213?text=${whatsappText}`;

    return (
        <main className="bg-slate-50 min-h-screen pb-28 md:pb-20 select-none overflow-x-hidden">
            {/* BREADCRUMB */}
            <div className="pt-5 sm:pt-8 pb-3 sm:pb-4 max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8">
                <div
                    // to="/packages"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors">
                    <ArrowLeft size={14} />
                    <span>Back to all packages</span>
                </div>
            </div>

            {/* HERO CAROUSEL */}
            <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8">
                <div className="relative w-full h-[240px] xs:h-[300px] sm:h-[420px] md:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-slate-950">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation={images.length > 1}
                        pagination={images.length > 1 ? { clickable: true } : false}
                        autoplay={{ delay: 4500, disableOnInteraction: false }}
                        loop={images.length > 1}
                        className="w-full h-full"
                        style={{
                            "--swiper-navigation-color": "#ffffff",
                            "--swiper-pagination-color": "#0284c7",
                        }}>
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img?.url || img} alt={`${pkg.name} view ${index + 1}`} className="w-full h-full object-cover opacity-85" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none z-10" />

                    {/* Title & Location details pinned on hero bottom */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8 z-20 pointer-events-none">
                        <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-1.5 sm:mb-2">
                            <MapPin size={13} className="text-amber-400 shrink-0" />
                            <span>{pkg.location?.name || "Himalayas"}</span>
                        </div>
                        <h1 className="font-display text-lg xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-3xl drop-shadow-sm">
                            {pkg.name}
                        </h1>
                    </div>
                </div>
            </div>

            {/* KEY METRICS STRIP */}
            <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 mt-4 sm:mt-6">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-center">
                    <div>
                        <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Duration</span>
                        <span className="font-bold text-xs sm:text-base text-slate-900 mt-0.5 block truncate">
                            {nights}N / {days}D
                        </span>
                    </div>
                    <div>
                        <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Travel Style</span>
                        <span className="font-bold text-xs sm:text-base text-slate-900 mt-0.5 block truncate">
                            {pkg.type || pkg.packageType || "Custom Tour"}
                        </span>
                    </div>
                    <div>
                        <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Pickup & Drop</span>
                        <span className="font-bold text-xs sm:text-base text-slate-900 mt-0.5 block truncate">Bagdogra / NJP</span>
                    </div>
                    <div>
                        <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Permits</span>
                        <span className="font-bold text-xs sm:text-base text-emerald-600 mt-0.5 block truncate">100% Handled</span>
                    </div>
                </div>
            </div>

            {/* CONTENT + DESKTOP STICKY SIDEBAR */}
            <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 md:px-8 mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Left Column: Narrative */}
                <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
                    {/* Overview Card */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-xs">
                        <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">Overview</span>
                        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">About this Journey</h2>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{pkg.description}</p>
                    </div>

                    {/* Destinations Covered */}
                    {pkg.destinations && pkg.destinations.length > 0 && (
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-xs">
                            <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1.5 sm:mb-2">Destinations Covered</span>
                            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Places on this Tour</h3>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {pkg.destinations.map((dest, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-[11px] sm:text-xs font-semibold">
                                        <MapPin size={13} className="text-sky-600 shrink-0" />
                                        <span>{dest}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Inclusions & Exclusions */}
                    {((pkg.inclusions && pkg.inclusions.length > 0) || (pkg.exclusions && pkg.exclusions.length > 0)) && (
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-xs">
                            <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">Package Details</span>
                            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-5">Inclusions & Exclusions</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                {/* Inclusions */}
                                {pkg.inclusions && pkg.inclusions.length > 0 && (
                                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-emerald-50/60 border border-emerald-100">
                                        <h4 className="font-bold text-xs sm:text-sm text-emerald-900 mb-3 flex items-center gap-2">
                                            <Check size={16} className="text-emerald-600 shrink-0" />
                                            <span>What's Included</span>
                                        </h4>
                                        <ul className="flex flex-col gap-2 sm:gap-2.5 text-xs text-slate-700">
                                            {pkg.inclusions.map((inc, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                                    <span className="leading-snug">{inc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Exclusions */}
                                {pkg.exclusions && pkg.exclusions.length > 0 && (
                                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-red-50/60 border border-red-100">
                                        <h4 className="font-bold text-xs sm:text-sm text-red-900 mb-3 flex items-center gap-2">
                                            <X size={16} className="text-red-500 shrink-0" />
                                            <span>Not Included</span>
                                        </h4>
                                        <ul className="flex flex-col gap-2 sm:gap-2.5 text-xs text-slate-700">
                                            {pkg.exclusions.map((exc, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                                    <span className="leading-snug">{exc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Timeline Itinerary */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-xs">
                        <Timeline itinerary={pkg.itinerary} />
                    </div>

                    {/* Photo Gallery Grid */}
                    {images.length > 1 && (
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-xs">
                            <span className="text-xs uppercase tracking-wider text-sky-600 font-bold block mb-1">Gallery</span>
                            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-5">Tour Photos</h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedPhoto(img?.url || img)}
                                        className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group bg-slate-100">
                                        <img
                                            src={img?.url || img}
                                            alt={`Gallery view ${idx + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Desktop Sticky Booking Card */}
                <div className="hidden lg:block lg:col-span-4">
                    <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md flex flex-col gap-5">
                        <div>
                            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">Starting From</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">₹{discountedPrice.toLocaleString()}</span>
                                {actualPrice > discountedPrice && (
                                    <span className="text-sm text-slate-400 line-through">₹{actualPrice.toLocaleString()}</span>
                                )}
                                <span className="text-xs text-slate-500">/ person</span>
                            </div>

                            {savingsPercent > 0 && (
                                <span className="inline-block mt-2 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold px-3 py-1 rounded-full">
                                    Special Offer: Save {savingsPercent}%
                                </span>
                            )}
                        </div>

                        <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                                <Check size={15} className="text-emerald-600" />
                                <span>No hidden vehicle charges</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={15} className="text-emerald-600" />
                                <span>Customizable dates & stays</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={15} className="text-emerald-600" />
                                <span>Dedicated mountain driver & vehicle</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <Link
                                to={`/contact?enq=${pkg.slug}`}
                                className="btn btn-blue w-full py-3.5 text-xs sm:text-sm font-bold justify-center shadow-xs">
                                Send Tour Enquiry
                            </Link>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary w-full py-3.5 text-xs sm:text-sm font-semibold justify-center">
                                <MessageCircle size={16} className="text-emerald-600" />
                                <span>Quick WhatsApp Enquiry</span>
                            </a>
                        </div>

                        <p className="text-[11px] text-slate-400 text-center font-normal">
                            Enquiry responses provided within 24 business hours. No booking fee required.
                        </p>
                    </div>
                </div>
            </div>

            {/* MOBILE STICKY BOTTOM ACTION BAR */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3.5 py-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))] sm:px-6 shadow-xl flex items-center justify-between lg:hidden">
                <div className="min-w-0 pr-2">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">From</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-base xs:text-lg font-extrabold text-slate-900 tracking-tight">₹{discountedPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap">/ person</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 xs:gap-2 shrink-0">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0"
                        aria-label="WhatsApp enquiry">
                        <MessageCircle size={17} />
                    </a>
                    <Link to={`/contact?enq=${pkg.slug}`} className="btn btn-primary text-xs font-bold py-2 sm:py-2.5 px-3.5 sm:px-5 shrink-0">
                        Enquire Now
                    </Link>
                </div>
            </div>

            {/* Photo Lightbox */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4"
                    onClick={() => setSelectedPhoto(null)}>
                    <button
                        type="button"
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-6 right-6 text-white p-2.5 rounded-2xl bg-white/10 hover:bg-white/20">
                        <X size={22} />
                    </button>
                    <img src={selectedPhoto} alt="Enlarged view" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
                </div>
            )}
        </main>
    );
}
