export default function DestinationChip({ dest, revealDelay = "0s" }) {
    return (
        <div className="destination-chip reveal group" style={{ "--reveal-delay": revealDelay }}>
            <div className="destination-chip-shell">
                <img src={dest.img} alt={dest.name} className="destination-chip-image" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,35,46,0)_40%,rgba(18,35,46,0.85)_100%)] flex flex-col justify-end p-4 text-paper">
                    <div className="font-display text-[19px] font-medium">{dest.name.split(",")[0]}</div>
                    <div className="font-mono text-[10px] opacity-75 mb-[3px] line-clamp-3">{dest.desc}</div>
                </div>
            </div>
        </div>
    );
}
