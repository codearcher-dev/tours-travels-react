import { useParams, Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import packages from '../data/packages';

export default function PackageDetail() {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === id);
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!pkg) {
    return (
      <main className="page-fade min-h-[60vh] flex flex-col items-center justify-center px-8">
        <h1 className="font-display text-4xl mb-4">Package not found</h1>
        <p className="text-ink-soft mb-8">The route you're looking for doesn't exist.</p>
        <Link 
          to="/packages" 
          className="inline-flex items-center justify-center gap-2 font-mono text-[13px] uppercase font-semibold px-[32px] py-[16px] rounded-[3px] tracking-[0.05em] transition-all duration-300 bg-gold text-ink hover:bg-gold-deep hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(232,163,61,0.35)] active:translate-y-0 active:scale-[0.98]"
        >
          Back to Packages
        </Link>
      </main>
    );
  }

  const images = pkg.images || [pkg.img];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main ref={containerRef} className="page-fade">
      {/* Hero Image Carousel */}
      <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden bg-ink group">
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="min-w-full h-full relative">
              <img 
                src={img} 
                alt={`${pkg.name} - ${idx + 1}`} 
                className="w-full h-full object-cover opacity-90" 
              />
            </div>
          ))}
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="max-w-[800px] mx-auto px-8 py-16 lg:py-24">
        <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em] reveal">
          <span className="w-1.5 h-1.5 rounded-full bg-rust"></span> {pkg.location}
        </span>
        
        <h1 className="font-display text-[clamp(40px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.01em] mb-8 reveal reveal-delay-1">
          {pkg.name}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12 border-y border-line py-8 mb-12 reveal reveal-delay-2">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Duration</div>
            <div className="text-[17px] font-medium">{pkg.days} Days</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Starting From</div>
            <div className="text-[17px] font-medium">{pkg.price}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-ink-soft mb-1.5">Coordinates</div>
            <div className="text-[17px] font-medium">{pkg.coord}</div>
          </div>
        </div>
        
        <div className="text-[18px] text-ink-soft leading-[1.7] max-w-[640px] reveal reveal-delay-3 mb-16">
          <p>{pkg.desc}</p>
        </div>
        
        <div className="reveal reveal-delay-4 flex flex-wrap gap-4">
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center gap-2 font-mono text-[13px] uppercase font-semibold px-[32px] py-[16px] rounded-[3px] tracking-[0.05em] transition-all duration-300 bg-gold text-ink hover:bg-gold-deep hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(232,163,61,0.35)] active:translate-y-0 active:scale-[0.98]"
          >
            Enquire Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </Link>
          <Link 
            to="/packages" 
            className="inline-flex items-center justify-center gap-2 font-mono text-[13px] uppercase font-semibold px-[32px] py-[16px] rounded-[3px] tracking-[0.05em] transition-all duration-300 bg-transparent text-ink border border-line hover:border-teal hover:text-teal active:scale-[0.98]"
          >
            All Packages
          </Link>
        </div>
      </div>
    </main>
  );
}
