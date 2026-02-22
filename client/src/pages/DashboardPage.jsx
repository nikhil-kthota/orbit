import { useState, useEffect } from 'react';
import Topbar from '../components/dashboard/Topbar';
import StatsCard from '../components/dashboard/StatsCard';
import TaskCard from '../components/dashboard/TaskCard';
import TaskModal from '../components/dashboard/TaskModal';
import StarField from '../components/ui/StarField';
import SignalLoader from '../components/ui/SignalLoader';
import Constellation from '../components/ui/Constellation';
import Button from '../components/ui/Button';
import OrbitSelect from '../components/ui/OrbitSelect';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';

function useTypewriter(text, speed = 55) {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        setDisplayed('');
        if (!text) return;
        let i = 0;
        const t = setInterval(() => {
            setDisplayed(text.slice(0, ++i));
            if (i >= text.length) clearInterval(t);
        }, speed);
        return () => clearInterval(t);
    }, [text, speed]);
    return displayed;
}

function greeting(name) {
    const h = new Date().getHours();
    const part = h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
    return `Good ${part}, ${name?.split(' ')[0] || 'Commander'}`;
}

export default function DashboardPage() {
    const { user } = useAuth();
    const {
        tasks, loading,
        search, setSearch,
        statusFilter, setStatusFilter,
        priorityFilter, setPriorityFilter,
        createTask, updateTask, deleteTask,
    } = useTasks();

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const topbarGreeting = useTypewriter(greeting(user?.name), 55);

    const overdue = tasks.filter(
        (t) => t.status !== 'completed' && t.due_date && new Date(t.due_date) < new Date()
    );
    const completed = tasks.filter((t) => t.status === 'completed');
    const inProgress = tasks.filter((t) => t.status === 'in-progress');

    const openNew = () => { setEditingTask(null); setModalOpen(true); };
    const openEdit = (t) => { setEditingTask(t); setModalOpen(true); };

    const handleComplete = async (id) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;
        await updateTask(id, { ...task, status: 'completed' });
    };

    const handleSave = async (data) => {
        if (data.id) await updateTask(data.id, data);
        else await createTask(data);
    };

    const STATUS_OPTS = [
        { value: '', label: 'ALL STATUS' },
        { value: 'pending', label: 'STANDBY' },
        { value: 'in-progress', label: 'IN ORBIT' },
        { value: 'completed', label: 'COMPLETE' },
    ];

    const PRIORITY_OPTS = [
        { value: '', label: 'ALL PRIORITY' },
        { value: 'high', label: 'HIGH ALERT' },
        { value: 'medium', label: 'MEDIUM' },
        { value: 'low', label: 'LOW' },
    ];

    return (
        <div className="relative flex flex-col h-screen bg-[var(--bg-base)] overflow-hidden">
            <StarField />
            <div className="dot-grid absolute inset-0 pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[35vh] pointer-events-none z-0"
                style={{ background: 'radial-gradient(ellipse at center bottom, rgba(249,115,22,0.06) 0%, transparent 70%)' }} />

            <Topbar title="COMMAND" greeting={topbarGreeting} />

            <main className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatsCard label="Total Missions" value={tasks.length} accent="total" />
                    <StatsCard label="Completed" value={completed.length} accent="completed" />
                    <StatsCard label="In Orbit" value={inProgress.length} accent="inprogress" />
                    <StatsCard label="Overdue" value={overdue.length} accent="overdue" />
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-3">
                    <div className="cmd-search-wrap w-full lg:flex-1">
                        <span className="cmd-prefix font-mono text-[var(--accent)] text-sm select-none">&gt;_</span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search missions..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--silver-dim)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none text-sm font-mono text-zinc-100 placeholder:text-[var(--silver-dim)] transition-all"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <OrbitSelect
                                value={statusFilter}
                                onChange={setStatusFilter}
                                options={STATUS_OPTS}
                            />
                            <OrbitSelect
                                value={priorityFilter}
                                onChange={setPriorityFilter}
                                options={PRIORITY_OPTS}
                            />
                        </div>
                        <Button onClick={openNew} size="md" className="w-full sm:w-auto flex-shrink-0 whitespace-nowrap">
                            ＋ NEW MISSION
                        </Button>
                    </div>
                </div>

                <div>
                    <div className="sector-label mb-4">
                        <span className="text-[var(--accent)]">◈</span>
                        <span>Active Missions</span>
                        {tasks.length > 0 && (
                            <span className="font-mono text-[var(--accent)] text-[10px]">
                                {tasks.length} LOGGED
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <SignalLoader label="SCANNING MISSIONS..." />
                        </div>
                    ) : tasks.length === 0 ? (
                        <Constellation />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={openEdit}
                                    onDelete={deleteTask}
                                    onComplete={handleComplete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <TaskModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                task={editingTask}
                onSave={handleSave}
            />
        </div>
    );
}
