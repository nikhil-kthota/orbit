import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

const NAV = [
    { to: '/dashboard', label: 'COMMAND', icon: '⬡' },
    { to: '/profile', label: 'DOSSIER', icon: '◎' },
];

export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { logout(); navigate('/login'); };

    return (
        <aside
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            className={[
                'relative flex flex-col h-full z-20 transition-all duration-300 ease-in-out flex-shrink-0',
                'bg-[var(--bg-panel)] border-r border-[var(--silver-dim)]',
                expanded ? 'w-52' : 'w-14',
            ].join(' ')}
        >
            <div className="flex items-center gap-3 px-3.5 py-5 border-b border-[var(--silver-dim)] overflow-hidden">
                <div className="relative flex-shrink-0 w-7 h-7 flex items-center justify-center">
                    <span className="font-display font-bold text-lg text-[var(--accent)] leading-none select-none" style={{ position: 'relative', zIndex: 1 }}>
                        O
                    </span>
                    <div
                        className="absolute inset-[-6px] rounded-full pointer-events-none"
                        style={{ border: '1px dashed rgba(249,115,22,0.45)', animation: 'rotateOrbit 4s linear infinite', transformOrigin: 'center' }}
                    />
                    <div className="logo-orbit-dot" style={{ width: '5px', height: '5px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                </div>
                {expanded && (
                    <span className="font-display font-bold text-sm tracking-[0.22em] text-zinc-100 whitespace-nowrap animate-fade-in">
                        ORBIT
                    </span>
                )}
            </div>

            <nav className="flex-1 py-4 space-y-1 px-2">
                {NAV.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => [
                            'flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-xs font-mono font-semibold tracking-widest uppercase transition-all duration-200',
                            'overflow-hidden whitespace-nowrap',
                            isActive
                                ? 'nav-active-trail text-[var(--accent)] bg-[var(--accent)]/8'
                                : 'text-[var(--silver)] hover:text-zinc-200 hover:bg-[var(--bg-raised)]',
                        ].join(' ')}
                    >
                        <span className="text-base flex-shrink-0 w-5 text-center">{icon}</span>
                        {expanded && <span className="animate-fade-in">{label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-[var(--silver-dim)] px-2 py-3">
                <div className="flex items-center gap-3 px-2.5 py-2 mb-1 overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        {getInitials(user?.name || 'U')}
                    </div>
                    {expanded && (
                        <div className="min-w-0 animate-fade-in">
                            <p className="text-[10px] font-mono font-semibold text-zinc-200 truncate tracking-wide">{user?.name}</p>
                            <p className="text-[9px] text-[var(--silver-dim)] font-mono truncate">{user?.email}</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-2.5 py-2 rounded-lg text-xs font-mono font-semibold tracking-widest uppercase text-[var(--silver)] hover:text-red-400 hover:bg-red-500/8 transition-all duration-200 overflow-hidden"
                >
                    <span className="text-base flex-shrink-0 w-5 text-center">⏻</span>
                    {expanded && <span className="animate-fade-in">EJECT</span>}
                </button>
            </div>
        </aside>
    );
}
