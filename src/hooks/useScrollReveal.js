import { useEffect } from 'react';

/**
 * Observes every .reveal and .path-divider element inside the given
 * container ref and adds the "in" class when it scrolls into view —
 * same behaviour as the original vanilla-JS IntersectionObserver.
 */
export default function useScrollReveal(containerRef, dependencies = []) {
    useEffect(() => {
        const root = containerRef?.current || document;
        const els = root.querySelectorAll('.reveal, .path-divider');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in');
                    }
                });
            },
            { threshold: 0.15 }
        );

        els.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [containerRef, ...dependencies]);
}
