import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import StarField from '../components/ui/StarField';
import toast from 'react-hot-toast';

const FEATURES = [
    {
        icon: '◎',
        title: 'Launch Missions',
        desc: 'Create and assign tasks with full context — no detail left behind.',
    },
    {
        icon: '◈',
        title: 'Set Priority Levels',
        desc: 'Mark missions from routine to critical so nothing slips through.',
    },
    {
        icon: '⊕',
        title: 'Track Live Status',
        desc: 'Standby, In Orbit, or Complete — know exactly where things stand.',
    },
    {
        icon: '◉',
        title: 'Command the Board',
        desc: 'Filter, search, and control your entire operation from one screen.',
    },
];

const cardStyle = {
    background: 'linear-gradient(135deg, rgba(30,12,3,0.97) 0%, rgba(20,8,2,0.97) 100%)',
    boxShadow: '0 0 48px rgba(249,115,22,0.09)',
    backdropFilter: 'blur(14px)',
};

function signalStrength(pwd) {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
}

const STRENGTH_LABELS = ['', 'WEAK SIGNAL', 'LOW SIGNAL', 'GOOD SIGNAL', 'STRONG UPLINK'];
const strengthColors = ['', '#EF4444', '#F97316', '#EAB308', '#22C55E'];

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { register, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => { if (user) navigate('/dashboard'); }, [user, navigate]);

    const strength = signalStrength(form.password);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Call sign required';
        if (!form.email.trim()) e.email = 'Email required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid format';
        if (form.password.length < 6) e.password = 'Minimum 6 characters';
        if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        setErrors((p) => ({ ...p, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            toast.success('UPLINK ESTABLISHED', {
                style: { fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', background: '#0E0E18', color: '#A8FF78', border: '1px solid rgba(168,255,120,0.25)', borderRadius: '10px' },
                icon: '◉',
            });
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[var(--bg-base)] dot-grid overflow-hidden flex flex-col">
            <StarField />

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 60%, rgba(249,115,22,0.07) 0%, transparent 70%)' }} />

            <header
                className="relative z-10 flex items-center justify-between h-auto sm:h-14 px-5 py-3 sm:py-0 flex-shrink-0"
                style={{
                    background: 'linear-gradient(90deg, rgba(30,12,3,0.97) 0%, rgba(20,8,2,0.97) 100%)',
                    borderBottom: '1px solid rgba(249,115,22,0.30)',
                    boxShadow: '0 1px 24px rgba(249,115,22,0.07)',
                    backdropFilter: 'blur(12px)',
                }}
            >
                {/* Left: logo + tagline stacked on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <div className="flex items-center gap-2">
                        <div className="relative w-7 h-7 flex items-center justify-center flex-shrink-0">
                            <span className="font-display font-bold text-lg text-[var(--accent)] relative z-10">O</span>
                            <div
                                className="absolute rounded-full pointer-events-none"
                                style={{ border: '1px dashed rgba(249,115,22,0.5)', animation: 'rotateOrbit 5s linear infinite', inset: '-5px' }}
                            />
                        </div>
                        <span className="font-display font-bold text-base text-zinc-100 tracking-[0.2em]">ORBIT</span>
                    </div>
                    <p className="text-[10px] font-mono text-[var(--silver-dim)] tracking-[0.18em] uppercase sm:border-l sm:border-orange-500/20 sm:pl-3">
                        Track tasks. Set priorities. Ship on time.
                    </p>
                </div>
            </header>

            {/* ── Centered content ─────────────────────────── */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">
                <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    {/* ── Features — mobile: second, desktop: first ── */}
                    <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1">
                        <p className="text-[10px] font-mono text-[var(--accent)] tracking-[0.3em] uppercase mb-4">
                            ◉ What you can do
                        </p>
                        <h2
                            className="font-display font-black text-5xl lg:text-6xl xl:text-7xl text-zinc-100 leading-[0.95] mb-8"
                            style={{ textShadow: '0 0 60px rgba(249,115,22,0.2)' }}
                        >
                            Mission<br />
                            <span style={{ WebkitTextStroke: '1.5px rgba(249,115,22,0.7)', color: 'transparent' }}>
                                Control.
                            </span>
                        </h2>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                            {FEATURES.map((f, i) => (
                                <div key={i}>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[var(--accent)] text-base">{f.icon}</span>
                                        <span className="text-xs font-mono font-bold text-zinc-200 tracking-wider uppercase">{f.title}</span>
                                    </div>
                                    <p className="text-xs font-mono text-[var(--silver)] leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Form — mobile: first, desktop: second ── */}
                    <div className="w-full lg:w-5/12 order-1 lg:order-2">
                        <div className="rounded-2xl p-7 border border-orange-500/20 animate-slide-up" style={cardStyle}>
                            <div className="mb-5 flex items-center gap-2">
                                <span className="text-[var(--accent)] text-sm">◈</span>
                                <span className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-[var(--silver)]">
                                    New Commander
                                </span>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-3.5">
                                <Input label="Call Sign" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your name..." terminal />
                                <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="commander@orbit.dev" terminal />
                                <div className="space-y-1.5">
                                    <Input label="Passphrase" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="Min. 6 characters" terminal />
                                    {form.password && (
                                        <div className="space-y-1">
                                            <div className="signal-bar-track">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className={`signal-segment ${strength >= i ? `s${i}` : ''}`}
                                                        style={strength >= i ? { background: strengthColors[i] } : {}}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: strengthColors[strength] || 'var(--silver-dim)' }}>
                                                ◈ {STRENGTH_LABELS[strength]}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <Input label="Confirm Passphrase" name="confirm" type="password" value={form.confirm} onChange={handleChange} error={errors.confirm} placeholder="Repeat passphrase" terminal />
                                <Button type="submit" size="full" loading={loading} className="mt-2">
                                    {loading ? 'TRANSMITTING...' : 'SIGNUP FOR CLEARANCE →'}
                                </Button>
                            </form>
                            <p className="text-center mt-5 text-[10px] font-mono text-[var(--silver-dim)]">
                                HAVE CLEARANCE?{' '}
                                <Link to="/login" className="text-[var(--accent)] hover:underline tracking-widest uppercase">
                                    AUTHENTICATE
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
