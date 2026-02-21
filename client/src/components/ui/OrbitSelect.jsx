import { useState, useRef, useEffect } from 'react';

export default function OrbitSelect({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = options.find((o) => o.value === value) || options[0];

    useEffect(() => {
        const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    return (
        <div className="relative flex-1 min-w-0" ref={ref}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className={`w-full flex items-center justify-between gap-1 px-2 py-2.5 rounded-lg bg-[var(--bg-panel)] border text-xs font-mono tracking-wide transition-colors ${open ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--silver-dim)] text-[var(--silver)]'
                    }`}
            >
                <span className="truncate">{selected.label}</span>
                <span className={`flex-shrink-0 text-[10px] transition-transform ${open ? 'rotate-180 text-[var(--accent)]' : 'text-[var(--silver-dim)]'}`}>▾</span>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 top-full mt-1 w-min min-w-full bg-[var(--bg-panel)] border border-[var(--silver-dim)] rounded-lg overflow-hidden shadow-lg z-50 animate-scale-in">
                    {options.map((o) => (
                        <button
                            key={o.value}
                            type="button"
                            onClick={() => { onChange(o.value); setOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs font-mono tracking-wide whitespace-nowrap transition-colors ${o.value === value
                                    ? 'bg-[var(--accent)]/15 text-[var(--accent)] border-l-2 border-[var(--accent)]'
                                    : 'text-[var(--silver)] hover:bg-[var(--accent)]/8 hover:text-[var(--accent)]'
                                }`}
                        >
                            {o.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
