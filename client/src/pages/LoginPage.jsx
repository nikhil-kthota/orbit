import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

// --- Login Page ---
export default function LoginPage() {
    const { login, loading, token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    if (token) {
        navigate('/dashboard', { replace: true });
        return null;
    }

    const validate = () => {
        const e = {};
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        setErrors((p) => ({ ...p, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }

        const result = await login(form.email, form.password);
        if (result.success) {
            toast.success('Welcome back!');
            navigate('/dashboard');
        } else {
            toast.error(result.error);
            setErrors({ password: result.error });
        }
    };

    return (
        <div className="min-h-screen flex bg-surface-950">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400" />
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
                />
                <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold mb-4 leading-tight">Orbit</h1>
                    <p className="text-orange-100 text-xl font-light leading-relaxed mb-8 max-w-sm">
                        Your tasks, organized. Your goals, within reach.
                    </p>
                    <div className="space-y-4">
                        {['Organize tasks effortlessly', 'Track progress in real time', 'Stay focused on what matters'].map((f) => (
                            <div key={f} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="text-orange-50 text-sm">{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md animate-slide-up">
                    <div className="text-center mb-8">
                        <div className="inline-flex w-12 h-12 rounded-2xl bg-brand flex items-center justify-center mb-4 shadow-brand">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">Welcome back</h2>
                        <p className="text-silver text-sm mt-1">Sign in to your Orbit account</p>
                    </div>

                    <div className="bg-surface-800 border border-zinc-700/50 rounded-2xl p-8 shadow-card">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                error={errors.email}
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                error={errors.password}
                                placeholder="Your password"
                                autoComplete="current-password"
                            />
                            <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
                                Sign In
                            </Button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-silver mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brand hover:text-brand-hover font-medium transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
