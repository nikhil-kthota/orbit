import { useEffect } from 'react';
import Button from './Button';

// --- Modal Component ---
export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className={`relative w-full ${sizes[size]} bg-surface-800 border border-zinc-700/60 rounded-2xl shadow-card z-10 animate-scale-in`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700/60">
                    <h2 className="text-base font-semibold text-zinc-100">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-silver hover:text-zinc-100 hover:bg-surface-600 transition-all"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M3.293 3.293a1 1 0 011.414 0L8 6.586l3.293-3.293a1 1 0 111.414 1.414L9.414 8l3.293 3.293a1 1 0 01-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 01-1.414-1.414L6.586 8 3.293 4.707a1 1 0 010-1.414z" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
