import { useState, useEffect, useRef } from 'react';

const ACCENT_MAP = {
    total: { color: '#EAB308', glow: 'rgba(234,179,8,0.22)', label: 'TOTAL', icon: '⬡' },
    completed: { color: '#22C55E', glow: 'rgba(34,197,94,0.25)', label: 'DONE', icon: '✦' },
    inprogress: { color: '#F97316', glow: 'rgba(249,115,22,0.2)', label: 'ORBIT', icon: '◎' },
    overdue: { color: '#EF4444', glow: 'rgba(239,68,68,0.25)', label: 'ALERT', icon: '⚠' },
};

function useCountUp(target, duration = 1400) {
    const [count, setCount] = useState(0);
    const frame = useRef(null);

    useEffect(() => {
        const start = performance.now();
        const tick = (now) => {
            const pct = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - pct, 3);
            setCount(Math.floor(ease * target));
            if (pct < 1) frame.current = requestAnimationFrame(tick);
        };
        frame.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame.current);
    }, [target, duration]);

    return count;
}

export default function StatsCard({ label, value, accent = 'total', description }) {
    const displayed = useCountUp(Number(value) || 0);
    const cfg = ACCENT_MAP[accent] || ACCENT_MAP.total;

    return (
        <div className="relative flex flex-col items-center p-5 rounded-xl border border-[var(--silver-dim)] bg-[var(--bg-panel)] hover:border-[var(--accent)]/30 transition-all duration-300 group overflow-hidden">
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${cfg.glow} 0%, transparent 70%)` }}
            />

            <div className="relative flex items-center justify-center mb-4">
                <div
                    className="hex-outer"
                    style={{
                        width: '72px', height: '72px',
                        background: `${cfg.color}18`,
                        border: `1.5px solid ${cfg.color}30`,
                    }}
                >
                    <div
                        className="hex-outer"
                        style={{
                            width: '52px', height: '52px',
                            background: `${cfg.color}10`,
                        }}
                    >
                        <span
                            className="font-mono font-bold text-2xl"
                            style={{ color: cfg.color }}
                        >
                            {displayed}
                        </span>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <p
                    className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-0.5"
                    style={{ color: cfg.color }}
                >
                    {cfg.icon} {cfg.label}
                </p>
                <p className="font-display font-bold text-xs text-zinc-300 tracking-wide uppercase">
                    {label}
                </p>
                {description && (
                    <p className="text-[10px] text-[var(--silver-dim)] mt-1 font-mono">{description}</p>
                )}
            </div>
        </div>
    );
}
