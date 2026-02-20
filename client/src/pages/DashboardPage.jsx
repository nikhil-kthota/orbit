import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import StatsCard from '../components/dashboard/StatsCard';
import TaskCard from '../components/dashboard/TaskCard';
import TaskModal from '../components/dashboard/TaskModal';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { useTasks } from '../hooks/useTasks';
import { isOverdue } from '../utils/helpers';
import toast from 'react-hot-toast';

const DEBOUNCE_MS = 350;

// --- Dashboard Page ---
export default function DashboardPage() {
    const { user } = useAuth();
    const { tasks, loading, loadTasks, addTask, editTask, removeTask } = useTasks();

    const [collapsed, setCollapsed] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const fetchWithFilters = useCallback(
        (s, sf, pf) => {
            const params = {};
            if (s.trim()) params.q = s.trim();
            if (sf !== 'all') params.status = sf;
            if (pf !== 'all') params.priority = pf;
            loadTasks(params);
        },
        [loadTasks]
    );

    useEffect(() => {
        fetchWithFilters('', 'all', 'all');
    }, [fetchWithFilters]);

    useEffect(() => {
        const timer = setTimeout(() => fetchWithFilters(search, statusFilter, priorityFilter), DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [search, statusFilter, priorityFilter, fetchWithFilters]);

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const overdue = tasks.filter((t) => isOverdue(t.due_date, t.status)).length;

    const handleOpenCreate = () => { setEditingTask(null); setModalOpen(true); };
    const handleOpenEdit = (task) => { setEditingTask(task); setModalOpen(true); };
    const handleModalClose = () => { setModalOpen(false); setEditingTask(null); };

    const handleSubmit = async (data) => {
        if (editingTask) {
            await editTask(editingTask.id, data);
        } else {
            await addTask(data);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await removeTask(deleteId);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="flex h-screen bg-surface-950 overflow-hidden">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />

            <div className="flex-1 flex flex-col min-w-0">
                <Topbar title="Dashboard" />

                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-zinc-100">
                            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},{' '}
                            <span className="text-gradient">{user?.name?.split(' ')[0]}</span> 👋
                        </h2>
                        <p className="text-silver text-sm mt-1">Here's what's happening with your tasks today.</p>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatsCard
                            label="Total Tasks"
                            value={total}
                            accent="orange"
                            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>}
                        />
                        <StatsCard
                            label="Completed"
                            value={completed}
                            accent="green"
                            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>}
                        />
                        <StatsCard
                            label="In Progress"
                            value={inProgress}
                            accent="blue"
                            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
                        />
                        <StatsCard
                            label="Overdue"
                            value={overdue}
                            accent="red"
                            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>}
                        />
                    </div>

                    <div className="bg-surface-800 border border-zinc-700/40 rounded-2xl p-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                            <h3 className="font-semibold text-zinc-100">My Tasks</h3>
                            <Button onClick={handleOpenCreate} size="sm">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                New Task
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mb-5">
                            <div className="relative flex-1">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-silver" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search tasks..."
                                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 bg-surface-700 border border-zinc-600/50 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all duration-200"
                                />
                            </div>
                            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-36">
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Select>
                            <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="sm:w-36">
                                <option value="all">All Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </Select>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <svg className="animate-spin h-6 w-6 text-brand" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-surface-700 flex items-center justify-center mb-4">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-silver">
                                        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                    </svg>
                                </div>
                                <p className="text-zinc-400 font-medium">No tasks found</p>
                                <p className="text-silver text-sm mt-1">
                                    {search || statusFilter !== 'all' || priorityFilter !== 'all'
                                        ? 'Try adjusting your filters'
                                        : 'Create your first task to get started'}
                                </p>
                                {!search && statusFilter === 'all' && priorityFilter === 'all' && (
                                    <Button onClick={handleOpenCreate} size="sm" className="mt-4">
                                        Create Task
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onEdit={handleOpenEdit}
                                        onDelete={(id) => setDeleteId(id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <TaskModal
                isOpen={modalOpen}
                onClose={handleModalClose}
                onSubmit={handleSubmit}
                editTask={editingTask}
            />

            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
                    <div className="relative bg-surface-800 border border-zinc-700/60 rounded-2xl p-6 max-w-sm w-full shadow-card animate-scale-in z-10">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mb-4 mx-auto">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                        </div>
                        <h3 className="text-center font-semibold text-zinc-100 mb-2">Delete Task?</h3>
                        <p className="text-center text-sm text-silver mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <Button variant="secondary" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
                            <Button variant="danger" className="flex-1" onClick={handleDelete}>Delete</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
