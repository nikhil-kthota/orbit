import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

// --- Topbar ---
export default function Topbar({ title }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-16 bg-surface-900 border-b border-zinc-800/60 flex items-center justify-between px-6 flex-shrink-0">
            <h1 className="text-lg font-semibold text-zinc-100">{title}</h1>

            <div className="relative" ref={ref}>
                <button
                    onClick={() => setDropdownOpen((p) => !p)}
                    className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-surface-700 transition-all duration-200"
                >
                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shadow-brand-sm">
                        {getInitials(user?.name || 'U')}
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium text-zinc-200 leading-tight">{user?.name}</p>
                        <p className="text-xs text-silver leading-tight">{user?.email}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-silver">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-surface-800 border border-zinc-700/60 rounded-xl shadow-card z-50 overflow-hidden animate-scale-in">
                        <button
                            onClick={() => { navigate('/profile'); setDropdownOpen(false); }}
                            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-zinc-300 hover:bg-surface-700 hover:text-zinc-100 transition-all"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                            My Profile
                        </button>
                        <div className="border-t border-zinc-700/60" />
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
