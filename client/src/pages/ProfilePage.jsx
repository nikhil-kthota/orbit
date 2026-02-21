import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Topbar from '../components/dashboard/Topbar';
import StarField from '../components/ui/StarField';
import SignalLoader from '../components/ui/SignalLoader';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { fetchProfile, updateProfile, deleteAccount } from '../api/profile';
import { formatDate, getInitials } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { user, refreshUser, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({ name: '', bio: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchProfile()
            .then((data) => {
                setProfile(data);
                setForm({ name: data.name || '', bio: data.bio || '' });
            })
            .catch(() => toast.error('Failed to load dossier'))
            .finally(() => setFetching(false));
    }, []);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Call sign required';
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
            const updated = await updateProfile(form);
            setProfile(updated);
            if (refreshUser) refreshUser({ ...user, name: updated.name });
            toast.success('DOSSIER UPDATED');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) { setDeleteConfirm(true); return; }
        setDeleting(true);
        try {
            await deleteAccount();
            logout();
            toast.success('Account terminated');
            navigate('/login');
        } catch (err) {
            toast.error(err.message || 'Failed to delete account');
            setDeleting(false);
            setDeleteConfirm(false);
        }
    };

    return (
        <div className="relative flex flex-col h-screen bg-[var(--bg-base)] overflow-hidden">
            <StarField />
            <div className="dot-grid absolute inset-0 pointer-events-none z-0" />

            <Topbar title="DOSSIER" backTo="/dashboard" backLabel="COMMAND" />

            <main className="relative z-10 flex-1 overflow-y-auto p-6">
                {fetching ? (
                    <div className="flex items-center justify-center h-64">
                        <SignalLoader label="LOADING DOSSIER..." />
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto space-y-5 animate-slide-up">

                        {/* Profile card */}
                        <div className="mission-card bg-[var(--bg-panel)] border border-[var(--silver-dim)] rounded-2xl p-7">
                            <div className="flex flex-col items-center text-center mb-7 pb-7 border-b border-[var(--silver-dim)]">
                                <div className="orbital-ring-wrap mb-4">
                                    <div
                                        className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-2xl font-display font-bold relative z-10"
                                        style={{ boxShadow: '0 0 24px rgba(249,115,22,0.35)' }}
                                    >
                                        {getInitials(profile?.name || 'U')}
                                    </div>
                                    <div className="orbital-ring-track" style={{ inset: '-10px', animation: 'rotateOrbit 6s linear infinite' }} />
                                    <div className="orbital-ring-dot" style={{ top: '50%', left: '50%', animation: 'orbitDot 6s linear infinite' }} />
                                </div>
                                <h2 className="font-display font-bold text-lg text-zinc-100 tracking-wide">{profile?.name}</h2>
                                <p className="text-[10px] font-mono text-[var(--accent)] tracking-[0.3em] uppercase mt-0.5">◉ Commander</p>
                                <p className="text-xs text-[var(--silver)] mt-1 font-mono">{profile?.email}</p>
                            </div>

                            <div className="sector-label mb-5">
                                <span className="text-[var(--accent)]">◈</span>
                                <span>Update Dossier</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input label="Call Sign" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your name..." terminal />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono font-medium text-[var(--silver)] tracking-widest uppercase">Mission Notes / Bio</label>
                                    <textarea
                                        name="bio"
                                        value={form.bio}
                                        onChange={handleChange}
                                        placeholder="> Add your personal notes..."
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-raised)] border border-[var(--silver-dim)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none text-sm font-mono text-zinc-100 placeholder:text-[var(--silver-dim)] resize-none transition-all"
                                    />
                                </div>
                                <Button type="submit" size="full" loading={loading}>
                                    {loading ? 'TRANSMITTING...' : 'UPDATE DOSSIER →'}
                                </Button>
                            </form>
                        </div>

                        {/* Account Intel */}
                        <div className="mission-card bg-[var(--bg-panel)] border border-[var(--silver-dim)] rounded-2xl p-6">
                            <div className="sector-label mb-4">
                                <span className="text-[var(--accent)]">◈</span>
                                <span>Account Intel</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: 'EMAIL', value: profile?.email },
                                    { label: 'ENLISTED', value: formatDate(profile?.created_at) },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-center justify-between py-2.5 border-b border-[var(--silver-dim)]/40 last:border-0">
                                        <span className="text-[10px] font-mono text-[var(--silver-dim)] tracking-widest uppercase">{label}</span>
                                        <span className="text-xs font-mono text-zinc-300">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="mission-card bg-[var(--bg-panel)] border border-red-500/20 rounded-2xl p-6">
                            <div className="sector-label mb-3">
                                <span className="text-red-400">⚠</span>
                                <span className="text-red-400">Danger Zone</span>
                            </div>
                            <p className="text-xs font-mono text-[var(--silver)] mb-4">
                                Permanently deletes your account and all mission data. This cannot be undone.
                            </p>
                            {deleteConfirm ? (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="flex-1 py-2.5 rounded-lg border border-red-500 bg-red-500/10 text-red-400 text-xs font-mono tracking-widest uppercase hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                    >
                                        {deleting ? 'TERMINATING...' : '⚠ CONFIRM TERMINATION'}
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(false)}
                                        className="px-4 py-2.5 rounded-lg border border-[var(--silver-dim)] text-[var(--silver)] text-xs font-mono tracking-widest uppercase hover:border-[var(--silver)] transition-colors"
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleDelete}
                                    className="w-full py-2.5 rounded-lg border border-red-500/30 text-red-400/70 text-xs font-mono tracking-widest uppercase hover:border-red-500 hover:text-red-400 transition-all"
                                >
                                    TERMINATE ACCOUNT
                                </button>
                            )}
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}
