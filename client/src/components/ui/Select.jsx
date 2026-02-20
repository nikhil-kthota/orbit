// --- Select Component ---
export default function Select({ label, error, className = '', children, ...props }) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-zinc-300">{label}</label>
            )}
            <select
                className={`
          w-full px-4 py-2.5 rounded-xl text-zinc-100 text-sm
          bg-surface-800/60 border transition-all duration-200 outline-none appearance-none cursor-pointer
          ${error
                        ? 'border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
                        : 'border-zinc-700/60 focus:border-brand focus:ring-2 focus:ring-brand/20'
                    }
          ${className}
        `}
                {...props}
            >
                {children}
            </select>
            {error && <p className="text-xs text-red-400">⚠ {error}</p>}
        </div>
    );
}
