export default function Spinner() {
    return (
        <span
            className={`inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin`}
            aria-label="Loading"
            role="status"
        />
    );
}
