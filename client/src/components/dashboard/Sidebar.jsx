import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const nav = [
    {
        to: '/dashboard',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
        ),
        label: 'Dashboard',
    },
    {
        to: '/profile',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
        ),
        label: 'Profile',
    },
];

// --- Sidebar ---
export default function Sidebar({ collapsed, onToggle }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside
            className={`
        flex flex-col h-screen bg-surface-900 border-r border-zinc-800/60 transition-all duration-300 ease-in-out flex-shrink-0
        ${collapsed ? 'w-16' : 'w-60'}
      `}
        >
            <div className={`flex items-center h-16 px-4 border-b border-zinc-800/60 ${collapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center flex-shrink-0 shadow-brand-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                </div>
                {!collapsed && (
                    <span className="font-bold text-lg text-zinc-100 tracking-tight">Orbit</span>
                )}
            </div>

            <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
                {nav.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
              ${isActive
                                ? 'bg-brand-light text-brand font-medium'
                                : 'text-silver hover:text-zinc-100 hover:bg-surface-700'
                            }
              ${collapsed ? 'justify-center' : ''}`
                        }
                    >
                        <span className="flex-shrink-0">{item.icon}</span>
                        {!collapsed && <span className="text-sm">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="p-2 border-t border-zinc-800/60 space-y-1">
                <button
                    onClick={onToggle}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-silver hover:text-zinc-100 hover:bg-surface-700 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {collapsed
                            ? <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                            : <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                        }
                    </svg>
                    {!collapsed && <span className="text-sm">Collapse</span>}
                </button>

                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    {!collapsed && <span className="text-sm font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
