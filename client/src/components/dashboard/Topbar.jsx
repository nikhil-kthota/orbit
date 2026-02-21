import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

export default function Topbar({ title, greeting, backTo, backLabel }) {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    return (
        <header
            className="flex items-center justify-between h-14 px-5 flex-shrink-0 relative z-30"
            style={{
                background: 'linear-gradient(90deg, rgba(30,12,3,0.97) 0%, rgba(20,8,2,0.97) 100%)',
                borderBottom: '1px solid rgba(249,115,22,0.30)',
                boxShadow: '0 1px 24px rgba(249,115,22,0.07)',
                backdropFilter: 'blur(12px)',
            }}
        >
            <div className="flex items-center gap-3">
                {backTo && (
                    <button
                        onClick={() => navigate(backTo)}
                        className="flex items-center gap-1.5 text-[var(--silver)] hover:text-[var(--accent)] transition-colors font-mono text-xs tracking-widest uppercase group"
                    >
                        <span className="text-base group-hover:-translate-x-0.5 transition-transform">←</span>
                        <span>{backLabel || 'BACK'}</span>
                    </button>
                )}
                {backTo && <span className="text-[var(--silver-dim)] text-xs">|</span>}
                <div className="flex flex-col justify-center">
                    {greeting ? (
                        <span className="font-display font-bold text-sm text-zinc-100 typewriter-cursor">{greeting}</span>
                    ) : (
                        <span className="font-display font-bold text-sm tracking-widest uppercase text-zinc-100">
                            ◈ {title}
                        </span>
                    )}
                    <span className="text-[9px] font-mono text-[var(--silver-dim)] tracking-[0.2em] uppercase">
                        ORBIT / {(title || 'COMMAND').toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="relative" ref={ref}>
                <button
                    onClick={() => setOpen((p) => !p)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[var(--bg-raised)] transition-colors border border-transparent hover:border-[var(--silver-dim)]"
                >
                    <div className="orbital-ring-wrap">
                        <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[10px] font-bold relative z-10">
                            {getInitials(user?.name || 'U')}
                        </div>
                        <div className="orbital-ring-track" style={{ inset: '-6px', animation: 'rotateOrbit 6s linear infinite' }} />
                        <div className="orbital-ring-dot" style={{ top: '50%', left: '50%', animation: 'orbitDot 6s linear infinite' }} />
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                        <span className="text-xs font-display font-semibold text-zinc-200 leading-none">{user?.name}</span>
                        <span className="text-[9px] font-mono text-[var(--accent)] tracking-widest uppercase leading-none mt-0.5">COMMANDER</span>
                    </div>
                    <span className="text-[var(--silver)] text-xs font-mono ml-1">▾</span>
                </button>

                {open && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-[var(--bg-panel)] border border-[var(--silver-dim)] rounded-xl shadow-card animate-scale-in overflow-hidden z-50">
                        <div className="p-3 border-b border-[var(--silver-dim)]">
                            <p className="text-[10px] font-mono text-[var(--silver-dim)] tracking-widest uppercase mb-0.5">UPLINK</p>
                            <p className="text-xs font-mono text-zinc-300 truncate">{user?.email}</p>
                        </div>
                        <button
                            onClick={() => { setOpen(false); navigate('/profile'); }}
                            className="w-full text-left px-3 py-2.5 text-xs font-mono text-[var(--silver)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/8 transition-colors tracking-widest uppercase"
                        >
                            ◎ View Dossier
                        </button>
                        <button
                            onClick={() => { logout(); navigate('/login'); }}
                            className="w-full text-left px-3 py-2.5 text-xs font-mono text-[var(--silver)] hover:text-red-400 hover:bg-red-500/8 transition-colors tracking-widest uppercase border-t border-[var(--silver-dim)]"
                        >
                            ⏻ Eject
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
