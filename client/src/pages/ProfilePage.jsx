import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { fetchProfile, updateProfile } from '../api/profile';
import { formatDate, getInitials } from '../utils/helpers';
import toast from 'react-hot-toast';

// --- Profile Page ---
export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({ name: '', bio: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        setFetching(true);
        fetchProfile()
            .then((data) => {
                setProfile(data);
                setForm({ name: data.name || '', bio: data.bio || '' });
            })
            .catch(() => toast.error('Failed to load profile'))
            .finally(() => setFetching(false));
    }, []);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
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
        setLoading(true);
        try {
            const updated = await updateProfile(form);
            setProfile(updated);
            refreshUser({ ...user, name: updated.name });
            toast.success('Profile updated!');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-surface-950 overflow-hidden">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />

            <div className="flex-1 flex flex-col min-w-0">
                <Topbar title="Profile" />

                <main className="flex-1 overflow-y-auto p-6">
                    {fetching ? (
                        <div className="flex items-center justify-center h-64">
                            <svg className="animate-spin h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
                            <div className="bg-surface-800 border border-zinc-700/40 rounded-2xl p-8">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-2xl bg-brand flex items-center justify-center text-white text-2xl font-bold shadow-brand flex-shrink-0">
                                        {getInitials(profile?.name || 'U')}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-zinc-100">{profile?.name}</h2>
                                        <p className="text-silver text-sm mt-0.5">{profile?.email}</p>
                                        <p className="text-xs text-zinc-600 mt-1.5">
                                            Member since {formatDate(profile?.created_at)}
                                        </p>
                                    </div>
                                </div>

                                <div className="h-px bg-zinc-700/50 mb-8" />

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h3 className="font-semibold text-zinc-200 text-sm">Edit Profile</h3>
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                        placeholder="Your full name"
                                    />
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-300">Bio</label>
                                        <textarea
                                            name="bio"
                                            value={form.bio}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself (optional)"
                                            rows={4}
                                            className="w-full px-4 py-2.5 rounded-xl text-zinc-100 text-sm placeholder-zinc-500 bg-surface-800/60 border border-zinc-700/60 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none resize-none transition-all duration-200"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" loading={loading}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <div className="bg-surface-800 border border-zinc-700/40 rounded-2xl p-6">
                                <h3 className="font-semibold text-zinc-200 text-sm mb-4">Account Details</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Email', value: profile?.email },
                                        { label: 'User ID', value: profile?.id?.slice(0, 8) + '...' },
                                        { label: 'Joined', value: formatDate(profile?.created_at) },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex items-center justify-between py-2.5 border-b border-zinc-700/30 last:border-0">
                                            <span className="text-sm text-silver">{label}</span>
                                            <span className="text-sm text-zinc-300 font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
