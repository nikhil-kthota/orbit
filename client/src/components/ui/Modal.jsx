import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
                className={[
                    'relative w-full rounded-xl shadow-card animate-scale-in',
                    'bg-[var(--bg-panel)] border border-[var(--silver-dim)]',
                    'schematic-grid overflow-hidden',
                    widths[size],
                ].join(' ')}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[2px] border-l-[2px] border-[var(--accent)] w-4 h-4 rounded-none" style={{ width: '16px', height: '16px' }} />
                <div className="absolute bottom-0 right-0" style={{ width: '16px', height: '16px', borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' }} />

                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--silver-dim)]">
                        <div className="flex items-center gap-2.5">
                            <span className="text-[var(--accent)] text-lg">◈</span>
                            <h3 className="font-display font-bold text-sm tracking-widest uppercase text-zinc-100">
                                {title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--silver)] hover:text-white hover:bg-[var(--bg-raised)] transition-colors font-mono text-base"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div className="px-6 py-5">{children}</div>
            </div>
        </div>
    );
}
