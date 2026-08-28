import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function DestinationChip({ dest }) {
    const [imgError, setImgError] = useState(!dest?.img);

    useEffect(() => {
        setImgError(!dest?.img);
    }, [dest?.img]);
    return (
        <button className="group relative w-full h-[400px] rounded-sm overflow-hidden cursor-pointer">
            <div className="absolute inset-0 z-0">
                {!imgError ? (
                    <img
                        src={dest.img}
                        alt={dest.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full">
                        <Skeleton className="block w-full h-full" />
                    </div>
                )}
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex flex-col justify-end">
                <div className="font-mono text-[10px] text-white/60 uppercase tracking-widest mb-2">Featured</div>
                <h3 className="font-display text-white text-3xl font-medium mb-1">{dest.name}</h3>
            </div>
        </button>
    );
}
