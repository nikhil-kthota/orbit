import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

// --- Register Page ---
export default function RegisterPage() {
    const { register, loading, token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState({});

    if (token) {
        navigate('/dashboard', { replace: true });
        return null;
    }

    const getStrength = (pw) => {
        if (!pw) return 0;
        let score = 0;
        if (pw.length >= 6) score++;
        if (pw.length >= 10) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };

    const strength = getStrength(form.password);
    const strengthLabel = ['', 'Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'][strength];
    const strengthColor = ['', 'bg-red-500', 'bg-orange-500', 'bg-amber-400', 'bg-emerald-400', 'bg-emerald-500'][strength];

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 6) e.password = 'Minimum 6 characters';
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
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }

        const result = await register(form.name, form.email, form.password);
        if (result.success) {
            toast.success('Account created! Welcome to Orbit 🚀');
            navigate('/dashboard');
        } else {
            toast.error(result.error);
            setErrors({ email: result.error });
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
                    <h1 className="text-5xl font-bold mb-4">Join Orbit</h1>
                    <p className="text-orange-100 text-xl font-light leading-relaxed mb-8 max-w-sm">
                        Start organizing your work the smart way. Free forever.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {[['🎯', 'Task Management'], ['🔍', 'Search & Filter'], ['📊', 'Progress Tracking'], ['🔒', 'Secure & Private']].map(([icon, label]) => (
                            <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                                <span className="text-lg">{icon}</span>
                                <span className="text-sm text-orange-50 font-medium">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md animate-slide-up">
                    <div className="text-center mb-8">
                        <div className="inline-flex w-12 h-12 rounded-2xl bg-brand items-center justify-center mb-4 shadow-brand">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">Create your account</h2>
                        <p className="text-silver text-sm mt-1">Get started with Orbit for free</p>
                    </div>

                    <div className="bg-surface-800 border border-zinc-700/50 rounded-2xl p-8 shadow-card">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Full Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                error={errors.name}
                                placeholder="John Doe"
                                autoComplete="name"
                            />
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
                            <div className="space-y-1.5">
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    placeholder="Min. 6 characters"
                                    autoComplete="new-password"
                                />
                                {form.password && (
                                    <div className="space-y-1">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-zinc-700'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-silver">{strengthLabel}</p>
                                    </div>
                                )}
                            </div>
                            <Input
                                label="Confirm Password"
                                name="confirm"
                                type="password"
                                value={form.confirm}
                                onChange={handleChange}
                                error={errors.confirm}
                                placeholder="Repeat your password"
                                autoComplete="new-password"
                            />
                            <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
                                Create Account
                            </Button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-silver mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-brand hover:text-brand-hover font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
