import { forwardRef } from 'react';

const Input = forwardRef(function Input(
    { label, name, type = 'text', value, onChange, error, placeholder,
        required, terminal = false, className = '', ...rest },
    ref
) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={name} className="text-xs font-mono font-medium text-[var(--silver)] tracking-widest uppercase">
                    {label}
                </label>
            )}
            <div className={terminal ? 'terminal-input-wrap' : 'relative'}>
                {terminal && <span className="terminal-prefix">&gt;_</span>}
                <input
                    ref={ref}
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={[
                        terminal ? 'terminal-input' : '',
                        'w-full px-4 py-2.5 rounded-lg text-sm text-zinc-100',
                        'bg-[var(--bg-raised)] border transition-all duration-200 outline-none',
                        'placeholder:text-[var(--silver-dim)]',
                        error
                            ? 'border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                            : 'border-[var(--silver-dim)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15',
                        className,
                    ].join(' ')}
                    {...rest}
                />
            </div>
            {error && (
                <p className="text-xs text-red-400 font-mono tracking-wide flex items-center gap-1.5">
                    <span>◈</span> {error}
                </p>
            )}
        </div>
    );
});

export default Input;
