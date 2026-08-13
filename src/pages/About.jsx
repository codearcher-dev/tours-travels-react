import { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import team from '../data/team';

const stats = [
  { num: '4,120', label: 'Itineraries Drawn' },
  { num: '42', label: 'Countries Covered' },
  { num: '9.4', label: 'Avg. Traveler Rating' },
  { num: '10', label: 'Years Plotting Routes' },
];

const timeline = [
  { year: '2016', title: 'One route, two founders', desc: 'A hand-drawn Southeast Asia itinerary, shared with 12 travelers in year one.' },
  { year: '2019', title: 'First overseas desk', desc: 'Opened a coordinator office in Bali to run ground logistics in-region.' },
  { year: '2022', title: 'Crossed 30 countries', desc: 'Expanded into Europe and the Americas with dedicated route specialists.' },
  { year: '2026', title: '4,000th itinerary shipped', desc: "Today's desk plots routes across 42 countries, still one traveler at a time." },
];

export default function About() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  return (
    <main ref={containerRef} className="page-fade">
      <div className="max-w-[1200px] mx-auto pt-[56px] px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">
            <span className="w-1.5 h-1.5 rounded-full bg-rust"></span> OUR STORY
          </span>
          <h1 className="font-display text-[clamp(40px,5.4vw,68px)] font-medium leading-[1.04] tracking-[-0.01em]">
            Started with one
            <br />
            overpacked backpack.
          </h1>
          <p>
            Meridian Journeys began in 2016 as two friends plotting a single route across Southeast
            Asia for other backpackers. A decade on, we've drawn over 4,000 itineraries — but the
            rule hasn't changed: every trip is plotted by a person who has actually stood at that
            coordinate.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80"
          alt="Team planning a route"
          className="reveal"
        />
      </div>

      <div className="max-w-[1200px] mx-auto py-[70px] px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-line">
        {stats.map((s, i) => (
          <div className={`stat reveal ${i ? `reveal-delay-${i}` : ''}`} key={s.label}>
            <div className="font-display italic text-[34px] text-gold-deep mb-3.5">{s.num}</div>
            <div className="text-[11px] uppercase text-ink-soft mb-[3px]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="max-w-[900px] mx-auto py-[70px] px-8">
        <div className="flex justify-between items-end mb-10 gap-6 flex-wrap" style={{ marginBottom: 36 }}>
          <div>
            <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">TIMELINE</span>
            <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">How the map grew</h2>
          </div>
        </div>
        {timeline.map((t, i) => (
          <div className={`tl-item reveal ${i ? `reveal-delay-${i}` : ''}`} key={t.year}>
            <div className="font-display italic text-[22px] text-gold-deep">{t.year}</div>
            <div>
              <h4>{t.title}</h4>
              <p>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-end mb-10 gap-6 flex-wrap" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div>
          <span className="inline-flex items-center gap-2.5 text-[12px] uppercase text-teal-deep border border-teal px-3.5 py-1.5 rounded-[20px] mb-[26px] font-mono tracking-[0.02em]">THE DESK</span>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.01em] reveal">People behind the routes</h2>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto py-[70px] px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[26px]">
        {team.map((m, i) => (
          <div className={`team-card reveal ${i ? `reveal-delay-${i}` : ''}`} key={m.name}>
            <div className="rounded-[3px] overflow-hidden mb-3.5 aspect-square relative">
              <img src={m.img} alt={m.name} />
            </div>
            <div className="text-[13.5px] font-semibold">{m.name}</div>
            <div className="text-[12px] text-ink-soft uppercase mt-1">{m.role}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
