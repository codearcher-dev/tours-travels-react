import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonPackageCard = () => {
    return (
        <article className="package-card border border-slate-300">
            <div className="package-card-shell">
                {/* Image Placeholder */}
                <div className="h-48 relative overflow-hidden leading-none">
                    <Skeleton height="100%" className="!h-full !block" />
                </div>

                {/* Content Section */}
                <div className="p-[20px_22px_24px]">
                    {/* Title */}
                    <h3 className="mb-2">
                        <Skeleton height={24} width="75%" />
                    </h3>

                    {/* Description (2 lines) */}
                    <div className="mb-4">
                        <Skeleton count={2} height={14} className="mb-1" />
                    </div>

                    {/* Footer: Price and Action Button */}
                    <div className="flex justify-between items-center border-t border-dashed border-line pt-3.5">
                        <div className="w-24">
                            <Skeleton height={11} width={40} className="mb-1" />
                            <Skeleton height={22} width={70} />
                        </div>

                        <div className="w-16">
                            <Skeleton height={16} width={60} />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SkeletonPackageCard;
