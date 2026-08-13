import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import destinations from '../data/destinations';
import packages from '../data/packages';
import DestinationChip from '../components/DestinationChip';
import PackageCard from '../components/PackageCard';

const testimonials = [
  {
    initials: 'AS',
    name: 'Ananya Sharma',
    trip: 'Kyoto in Bloom, Mar 2026',
    quote:
      "The Kyoto itinerary felt hand-written for us — not a single wasted afternoon, and the machiya stay was the highlight of the year.",
  },
  {
    initials: 'RK',
    name: 'Rohan Kapoor',
    trip: 'Andes Explorer, Jan 2026',
    quote:
      'Enquiry to boarding pass took four days. Every hotel matched the photos, every guide showed up early.',
  },
  {
    initials: 'PM',
    name: 'Priya Mehta',
    trip: 'Sunset Escape, Feb 2026',
    quote:
      'Booked the Santorini escape for our anniversary. The catamaran sunset sail alone was worth the trip.',
  },
];

const steps = [
  { num: '01', title: 'Pick a coordinate', desc: 'Browse packages by destination, budget or trip length.' },
  { num: '02', title: 'Customize the route', desc: 'Adjust nights, add excursions, or tell us what to remove.' },
  { num: '03', title: 'Send an enquiry', desc: 'Our travel desk replies within a working day with a quote.' },
  { num: '04', title: 'Collect the stamp', desc: 'We handle logistics — you just show up with a passport.' },
];

export default function Home() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  return (
    <main ref={containerRef} className="page-fade">
      <section className="max-w-[1200px] mx-auto pt-16 px-8 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
            <span className="w-1.5 h-1.5 rounded-full bg-rust"></span> BOARDING PASS TO ADVENTURE
          </span>
          <h1 className="font-display text-[clamp(40px,5.4vw,68px)] font-medium leading-[1.04] tracking-[-0.01em]">
            Every journey
            <br />
            has a line.
            <br />
            <em className="italic font-normal text-teal-deep">This one's yours.</em>
          </h1>
          <p className="mt-6 text-[17px] text-ink-soft max-w-[460px] leading-[1.65]">
            Hand-plotted itineraries across 40+ destinations — from Bali's rice terraces to Iceland's
            ring road. We chart the route, you collect the stamps.
          </p>
          <div className="flex gap-4 mt-9">
            <Link className="inline-flex items-center gap-2 font-mono text-[13px] uppercase font-semibold px-[22px] py-[12px] rounded-sm tracking-[0.05em] transition-[transform,box-shadow,background] duration-250 bg-gold text-ink hover:bg-gold-deep hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(232,163,61,0.35)] active:translate-y-0 active:scale-95" to="/packages">Browse Packages</Link>
            <Link className="inline-flex items-center gap-2 font-mono text-[13px] uppercase font-semibold px-[22px] py-[12px] rounded-sm tracking-[0.05em] transition-[transform,box-shadow,background] duration-250 border border-ink text-ink hover:bg-ink hover:text-paper hover:-translate-y-[2px] active:translate-y-0 active:scale-95" to="/contact">Plan a Trip</Link>
          </div>
        </div>

        <div className="relative">
          <div className="bg-ink text-paper rounded-md relative overflow-hidden shadow-[0_30px_60px_rgba(18,35,46,0.28)] rotate-2 floaty">
            <div className="pt-[26px] px-[28px] pb-5 flex justify-between items-start">
              <div>
                <div className="text-[22px] font-semibold">DEL <span className="text-gold mx-2">✈</span> DPS</div>
                <div className="text-[11px] opacity-60 mt-1.5 uppercase">Delhi — Denpasar · Bali Bliss</div>
              </div>
              <span className="bg-gold text-ink text-[11px] font-bold py-1 px-2.5 rounded-[20px] uppercase">Best Seller</span>
            </div>
            <div className="grid grid-cols-3 gap-0 px-[28px] pb-[22px] text-[10px] opacity-55 uppercase">
              <div>Departs<strong>12 Oct</strong></div>
              <div>Duration<strong>7 Days</strong></div>
              <div>Traveler<strong>R. Vishwakarma</strong></div>
            </div>
            <div className="ticket-barcode mx-[28px] mb-[26px]"></div>
          </div>
          <div className="stamp-float">
            27.1751°N
            <br />
            78.0421°E
            <br />
            ITINERARY
          </div>
        </div>
      </section>

      <div className="path-divider max-w-[1200px] mx-auto pt-10 px-8">
        <svg viewBox="0 0 1136 60" preserveAspectRatio="none">
          <path d="M0,10 C 250,60 350,0 568,30 C 780,58 900,5 1136,40" />
        </svg>
      </div>

      <section className="max-w-[1200px] mx-auto py-[70px] px-8">
        <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">PLOTTED DESTINATIONS</span>
            <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">
              Where the map
              <br />
              bends toward you
            </h2>
          </div>
          <p className="reveal">
            Six coordinates our travelers return to, season after season — each with its own light,
            language and pace.
          </p>
        </div>
        <div className="flex gap-[18px] overflow-x-auto pb-2.5 scrollbar-thin">
          {destinations.map((d, i) => (
            <DestinationChip key={d.id} dest={d} revealDelay={`reveal-delay-${(i % 4) || ''}`} />
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-[70px] px-8" style={{ paddingTop: 0 }}>
        <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">FEATURED PACKAGES</span>
            <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">
              Itineraries worth
              <br />
              a stamp in your passport
            </h2>
          </div>
          <Link className="inline-flex items-center gap-2 font-mono text-[13px] uppercase font-semibold pb-1 tracking-[0.05em] transition-[transform,box-shadow,background] duration-250 border-b border-ink active:translate-y-0 active:scale-95" to="/packages">View All Packages →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {packages.slice(0, 3).map((p, i) => (
            <PackageCard key={p.id} pkg={p} revealDelay={i ? `reveal-delay-${i}` : ''} />
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-[70px] px-8" style={{ paddingTop: 0 }}>
        <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">HOW IT WORKS</span>
            <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">
              Four stops
              <br />
              to takeoff
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-line">
          {steps.map((s, i) => (
            <div className={`pt-8 lg:px-6 lg:border-r border-line md:border-b-0 border-b pb-6 lg:pb-0 last:border-r-0 last:border-b-0 reveal ${i ? 'reveal-delay-' + i : ''}`} key={s.num}>
              <div className="font-display italic text-[34px] text-gold-deep mb-3.5">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-[70px] px-8" style={{ paddingTop: 0 }}>
        <div className="flex justify-between items-end mb-10 gap-6 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">FROM THE FIELD</span>
            <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">Postcards from travelers</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <div className={`bg-paper-dim rounded-sm p-7 relative transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(18,35,46,0.1)] reveal ${i ? 'reveal-delay-' + i : ''}`} key={t.initials}>
              <span className="font-display text-[44px] text-gold-deep italic leading-[0.5] mb-2.5 block">"</span>
              <p>{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-full bg-teal text-white flex items-center justify-center text-[13px] font-semibold font-mono">{t.initials}</div>
                <div>
                  <div className="text-[13.5px] font-semibold">{t.name}</div>
                  <div className="text-[11.5px] text-ink-soft">{t.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-[70px] px-8" style={{ paddingTop: 10 }}>
        <div className="bg-ink text-paper rounded-md mx-8 lg:mx-auto max-w-[1136px] py-[56px] px-[48px] flex flex-col md:flex-row justify-between items-center md:text-left text-center gap-8 relative overflow-hidden before:content-[''] before:absolute before:-right-[60px] before:-top-[60px] before:w-[220px] before:h-[220px] before:rounded-full before:border before:border-dashed before:border-[rgba(232,163,61,0.4)] reveal">
          <h2 className="font-display text-[clamp(26px,3vw,36px)] font-medium max-w-[480px] relative">
            Ready for <em className="italic font-normal text-teal-deep">takeoff?</em> Tell us your dream coordinates.
          </h2>
          <Link className="inline-flex items-center gap-2 font-mono text-[13px] uppercase font-semibold px-[22px] py-[12px] rounded-sm tracking-[0.05em] transition-[transform,box-shadow,background] duration-250 bg-gold text-ink hover:bg-gold-deep hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(232,163,61,0.35)] active:translate-y-0 active:scale-95" to="/contact">Start an Enquiry</Link>
        </div>
      </section>
    </main>
  );
}
