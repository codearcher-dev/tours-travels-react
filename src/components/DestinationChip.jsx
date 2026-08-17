export default function DestinationChip({ dest, revealDelay = "" }) {
    return (
        <div
            className={`flex-[0_0_190px] rounded-sm overflow-hidden relative h-[230px] shadow-[0_4px_18px_rgba(18,35,46,0.08)] transition-[transform,box-shadow] duration-350 ease-out hover:-translate-y-2 hover:shadow-[0_20px_36px_rgba(18,35,46,0.2)] group reveal ${revealDelay}`}>
            <img
                src={dest.img}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,35,46,0)_40%,rgba(18,35,46,0.85)_100%)] flex flex-col justify-end p-4 text-paper">
                <div className="font-mono text-[10px] opacity-75 mb-[3px]">{dest.coord}</div>
                <div className="font-display text-[19px] font-medium">{dest.name}</div>
            </div>
        </div>
    );
}
