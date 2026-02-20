// --- Button Component ---
export default function Button({ children, variant = 'primary', size = 'md', className = '', loading = false, ...props }) {
    const base =
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variants = {
        primary:
            'bg-brand hover:bg-brand-hover text-white shadow-brand hover:shadow-brand hover:scale-[1.02] active:scale-[0.98]',
        secondary:
            'bg-surface-700 hover:bg-surface-600 text-zinc-200 border border-zinc-700 hover:border-zinc-500',
        danger:
            'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-400/40',
        ghost:
            'hover:bg-surface-700 text-silver hover:text-zinc-100',
        outline:
            'border border-brand/50 hover:border-brand text-brand hover:bg-brand-light',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2.5 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-2',
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
            ) : children}
        </button>
    );
}
