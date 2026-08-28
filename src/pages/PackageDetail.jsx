import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePackages } from "../context/PackageContext";
import Timeline from "../components/Itinerary";
import { MapPin, ArrowLeft, ArrowRight, X } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/styles.css";
import Tick from "../components/ui/icons/Tick.jsx";
import Cross from "../components/ui/icons/Cross.jsx";

export default function PackageDetail() {
    const { packages } = usePackages();
    const { slug } = useParams();
    const pkg = packages.find((p) => p.slug === slug);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
    const [galleryPhotos, setGalleryPhotos] = useState([]);

    const images = pkg ? pkg.images || [pkg.img] : [];

    useEffect(() => {
        const getImageDimensions = (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        src,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    });
                };
                img.src = src;
            });
        };

        if (packages.length > 0) {
            Promise.all(images.map((src) => getImageDimensions(src.url))).then((data) => {
                setGalleryPhotos(data);
            });
        }
    }, [packages]);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    if (!pkg) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
                <h1 className="text-4xl mb-4">Journey not found</h1>
                <Link to="/packages" className="btn btn-primary">
                    Return to Collection
                </Link>
            </main>
        );
    }

    return (
        <main className="bg-paper min-h-screen pb-16 overflow-x-clip select-none">
            {/* FULL BLEED EDITORIAL HERO */}
            <div className="w-full h-[70vh] relative overflow-hidden bg-ink">
                <img
                    key={currentImageIndex}
                    src={images[currentImageIndex].url}
                    alt={`${pkg.name} - ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover absolute inset-0 opacity-50"
                />

                {images.length > 1 && (
                    <div className="absolute bottom-8 right-4 md:bottom-12 md:right-12 flex gap-4 z-20">
                        <button
                            onClick={prevImage}
                            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md hover:bg-white hover:text-ink transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md hover:bg-white hover:text-ink transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>

                <div className="absolute bottom-8 left-4 md:bottom-12 md:left-16 z-20 max-w-3xl pr-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/80 mb-4 block">{pkg.location.name}</span>
                    <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-white mb-4 drop-shadow-md">{pkg.name}</h1>
                </div>
            </div>

            <div data-aos="fade-up" className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 md:pt-12 flex flex-col lg:flex-row gap-10 md:gap-12 relative">
                <h2 className="text-3xl text-rust">Package Detail</h2>
            </div>

            {/* EDITORIAL LAYOUT: Content (Left) + Sticky Booking (Right) */}
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 md:pt-12 flex flex-col lg:flex-row gap-10 md:gap-12 relative">
                {/* Main Narrative (Left) */}
                <div className="min-w-0 flex-1 lg:max-w-3xl flex flex-col gap-6 md:gap-4">
                    <div data-aos="fade-up" className="bg-paper-dim rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xs mb-3 uppercase text-rust">Overview</h2>
                        <p className="text-zinc-600 leading-relaxed text-md font-light">{pkg.description}</p>
                    </div>

                    <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-paper-dim rounded-2xl p-6 md:p-8 shadow-sm">
                        <div>
                            <div className="text-xs uppercase tracking-widest text-rust mb-2">Duration</div>
                            <div className="font-light text-lgl">
                                {pkg.duration.nights} Nights / {pkg.duration.days} Days
                            </div>
                        </div>
                    </div>

                    <div data-aos="fade-up" className="bg-paper-dim rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-xs uppercase tracking-widest text-rust mb-6">Destinations Covered</h3>
                        <div className="flex flex-wrap gap-3">
                            {pkg.destinations.map((dest, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 border border-zinc-200 rounded-full text-sm font-medium text-zinc-700 bg-zinc-50 shadow-sm">
                                    {dest}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-paper-dim rounded-2xl p-6 md:p-8 shadow-sm">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-rust mb-6 border-b border-zinc-200 pb-2">
                                What's Included
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {pkg.inclusions && pkg.inclusions.length > 0 ? (
                                    pkg.inclusions.map((inc, index) => (
                                        <li key={index} className="flex gap-3 text-zinc-600 text-sm">
                                            <Tick className={"w-4 h-4 mt-0.5 shrink-0 text-green-600"} />
                                            <span>{inc}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-sm text-zinc-400 italic">No inclusions specified</li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-rust mb-6 border-b border-zinc-200 pb-2">Not Included</h3>
                            <ul className="flex flex-col gap-3">
                                {pkg.exclusions && pkg.exclusions.length > 0 ? (
                                    pkg.exclusions.map((exc, index) => (
                                        <li key={index} className="flex gap-3 text-zinc-500 text-sm">
                                            <Cross className={"w-4 h-4 mt-0.5 shrink-0 text-red-600"} />
                                            <span>{exc}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-sm text-zinc-400 italic">No exclusions specified</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div data-aos="fade-up" className="bg-paper-dim rounded-2xl p-6 md:p-8 shadow-sm">
                        <Timeline itinerary={pkg.itinerary} />
                    </div>

                    {/* Image Gallery */}
                    {images.length > 1 && (
                        <div data-aos="fade-up" className="bg-paper-dim rounded-2xl p-6 md:p-8 shadow-sm">
                            <h3 className="text-xs uppercase tracking-widest text-rust mb-6 border-b border-zinc-200 pb-2">Gallery</h3>
                            <PhotoAlbum
                                layout="rows"
                                photos={galleryPhotos}
                                targetRowHeight={220}
                                spacing={16}
                                onClick={({ photo }) => setSelectedGalleryImage(photo.src)}
                                componentsProps={{
                                    image: {
                                        className: "rounded-sm hover:opacity-90 transition-opacity cursor-zoom-in",
                                    },
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Sticky Sidebar (Right) */}
                <div className="min-w-0 lg:w-[380px] shrink-0">
                    <div
                        data-aos="fade-left"
                        className="sticky top-32 bg-paper-dim rounded-2xl border border-zinc-200 p-6 md:p-8 shadow-xl shadow-zinc-200/50">
                        <div className="text-xs uppercase tracking-widest text-rust mb-2">Starting Price</div>
                        <div className="flex items-baseline gap-3 mb-8 border-b border-zinc-100 pb-6">
                            <span className="text-4xl">₹{pkg.price.discounted.toLocaleString()}</span>
                            <span className="text-red-600 line-through text-sm">₹{pkg.price.actual}</span>
                            <span className="text-xs text-zinc-400 ml-auto uppercase">/ Person</span>
                        </div>

                        <p className="text-sm text-zinc-500 mb-8 font-light">
                            Pricing depends on group size, exact dates, and customization requests.
                        </p>

                        <Link
                            to={`/contact?enq=${pkg.slug}`}
                            className="block w-full text-center bg-ink text-white py-4 px-6 text-xs uppercase tracking-widest hover:bg-rust transition-colors mb-4">
                            Request Quote
                        </Link>

                        <div className="text-center text-xs text-zinc-400">No commitment required.</div>
                    </div>
                </div>
            </div>

            {/* LIGHTBOX MODAL */}

            {selectedGalleryImage && (
                <div className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
                    {/* The close button */}
                    <button
                        onClick={() => setSelectedGalleryImage(null)}
                        className="absolute top-6 right-6 z-[110] text-white/70 hover:text-white transition-colors cursor-pointer p-2 bg-ink/20 rounded-full">
                        <X size={32} />
                    </button>

                    <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit={true}>
                        {({ zoomIn, zoomOut, resetTransform }) => (
                            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                                <img
                                    src={selectedGalleryImage}
                                    alt="Expanded View"
                                    className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing rounded-sm shadow-2xl"
                                />
                            </TransformComponent>
                        )}
                    </TransformWrapper>
                </div>
            )}
        </main>
    );
}
