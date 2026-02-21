import { useMemo } from 'react';

function buildStars(count, w, h) {
    return Array.from({ length: count }, () => {
        const x = Math.floor(Math.random() * w);
        const y = Math.floor(Math.random() * h);
        const size = Math.random() < 0.7 ? 0 : 1;
        const opacity = (0.25 + Math.random() * 0.65).toFixed(2);
        return `${x}px ${y}px ${size}px 1px rgba(255,255,255,${opacity})`;
    }).join(',');
}

export default function StarField({ count = 200 }) {
    const stars = useMemo(() => buildStars(count, 1960, 1100), [count]);

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        >
            <div
                className="stars-layer"
                style={{
                    boxShadow: stars,
                    animation: 'drift 110s ease-in-out infinite',
                    willChange: 'transform',
                }}
            />
            <div
                className="stars-layer"
                style={{
                    boxShadow: buildStars(60, 1960, 1100),
                    animation: 'drift 160s ease-in-out infinite reverse',
                    willChange: 'transform',
                }}
            />
        </div>
    );
}
