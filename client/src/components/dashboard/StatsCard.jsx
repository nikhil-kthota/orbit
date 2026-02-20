import { useEffect, useRef, useState } from 'react';

// --- Stats Card ---
function useCountUp(target, duration = 1200) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (target === 0) { setCount(0); return; }
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);

    return count;
}

export default function StatsCard({ label, value, icon, accent = 'orange', trend }) {
    const count = useCountUp(value);

    const accents = {
        orange: { icon: 'text-brand bg-brand-light', border: 'border-brand/20', glow: 'shadow-brand-sm' },
        blue: { icon: 'text-blue-400 bg-blue-500/15', border: 'border-blue-500/20', glow: 'shadow-[0_2px_12px_rgba(59,130,246,0.2)]' },
        green: { icon: 'text-emerald-400 bg-emerald-500/15', border: 'border-emerald-500/20', glow: 'shadow-[0_2px_12px_rgba(16,185,129,0.2)]' },
        red: { icon: 'text-red-400 bg-red-500/15', border: 'border-red-500/20', glow: 'shadow-[0_2px_12px_rgba(239,68,68,0.2)]' },
    };

    const a = accents[accent];

    return (
        <div className={`bg-surface-800 border ${a.border} rounded-2xl p-5 ${a.glow} hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 animate-slide-up`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.icon}`}>
                    {icon}
                </div>
                {trend !== undefined && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                        {trend >= 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-zinc-100 tabular-nums">{count}</p>
            <p className="text-sm text-silver mt-1">{label}</p>
        </div>
    );
}
