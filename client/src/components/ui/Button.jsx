const variants = {
    primary: 'bg-[var(--accent)] hover:bg-[#EA6C0A] text-white border-transparent shadow-brand-sm hover:shadow-brand',
    ghost: 'bg-transparent hover:bg-[var(--bg-raised)] text-[var(--silver)] border-[var(--silver-dim)] hover:border-[var(--silver)] hover:text-white',
    danger: 'bg-transparent hover:bg-red-500/10 text-red-400 border-red-500/30 hover:border-red-500',
    outline: 'bg-transparent hover:bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/40 hover:border-[var(--accent)]',
};

const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5',
    full: 'w-full px-5 py-3 text-sm gap-2',
};

export default function Button({
    children, variant = 'primary', size = 'md', loading = false,
    icon, className = '', type = 'button', disabled, onClick, ...rest
}) {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={[
                'btn-orbit inline-flex items-center justify-center font-display font-semibold',
                'border rounded-lg tracking-wide transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:ring-offset-1 focus:ring-offset-[var(--bg-base)]',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'select-none cursor-pointer',
                variants[variant],
                sizes[size],
                className,
            ].join(' ')}
            {...rest}
        >
            {loading ? (
                <>
                    <span
                        className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                        style={{ borderColor: 'currentColor', borderTopColor: 'transparent' }}
                    />
                    <span className="font-mono text-xs tracking-widest">PROCESSING...</span>
                </>
            ) : (
                <>
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
}
