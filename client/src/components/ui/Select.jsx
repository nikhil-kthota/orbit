const SELECT_STYLES = [
    'w-full px-4 py-2.5 rounded-lg text-sm text-zinc-100 font-mono',
    'bg-[var(--bg-raised)] border border-[var(--silver-dim)] outline-none',
    'focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15',
    'transition-all duration-200 cursor-pointer appearance-none',
].join(' ');

export default function Select({ label, name, value, onChange, options = [], error, className = '' }) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={name} className="text-xs font-mono font-medium text-[var(--silver)] tracking-widest uppercase">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={name} name={name} value={value} onChange={onChange}
                    className={[SELECT_STYLES, className].join(' ')}
                >
                    {options.map(({ value: v, label: l }) => (
                        <option key={v} value={v} className="bg-[var(--bg-panel)]">{l}</option>
                    ))}
                </select>
                <span className="absolute right-3 top-50% -translate-y-1/2 text-[var(--accent)] pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>▾</span>
            </div>
            {error && (
                <p className="text-xs text-red-400 font-mono tracking-wide">◈ {error}</p>
            )}
        </div>
    );
}
