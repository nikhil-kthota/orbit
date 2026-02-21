export default function SignalLoader({ size = 'md', label = '' }) {
    const sz = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
    const border = size === 'sm' ? '1.5px' : '2px';

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
                <div
                    className={`${sz} rounded-full border-[var(--accent)] signal-ring`}
                    style={{ borderWidth: border }}
                />
                <div
                    className="absolute rounded-full bg-brand-glow"
                    style={{
                        width: '6px', height: '6px',
                        background: 'var(--accent)',
                        boxShadow: '0 0 8px var(--accent)',
                    }}
                />
            </div>
            {label && (
                <span className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase animate-pulse">
                    {label}
                </span>
            )}
        </div>
    );
}
