// --- Input Component ---
export default function Input({ label, error, helper, className = '', ...props }) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-zinc-300">{label}</label>
            )}
            <input
                className={`
          w-full px-4 py-2.5 rounded-xl text-zinc-100 placeholder-zinc-500 text-sm
          bg-surface-800/60 border transition-all duration-200 outline-none
          ${error
                        ? 'border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
                        : 'border-zinc-700/60 focus:border-brand focus:ring-2 focus:ring-brand/20'
                    }
          ${className}
        `}
                {...props}
            />
            {error && <p className="text-xs text-red-400 flex items-center gap-1">
                <span>⚠</span> {error}
            </p>}
            {helper && !error && <p className="text-xs text-silver">{helper}</p>}
        </div>
    );
}
