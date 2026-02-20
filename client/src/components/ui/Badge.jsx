// --- Badge Component ---
const config = {
    pending: { bg: 'bg-zinc-700/60', text: 'text-zinc-300', dot: 'bg-zinc-400', label: 'Pending' },
    'in-progress': { bg: 'bg-blue-500/15', text: 'text-blue-300', dot: 'bg-blue-400', label: 'In Progress' },
    completed: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', dot: 'bg-emerald-400', label: 'Completed' },
    low: { bg: 'bg-zinc-700/60', text: 'text-zinc-300', dot: 'bg-zinc-400', label: 'Low' },
    medium: { bg: 'bg-amber-500/15', text: 'text-amber-300', dot: 'bg-amber-400', label: 'Medium' },
    high: { bg: 'bg-red-500/15', text: 'text-red-300', dot: 'bg-red-400', label: 'High' },
    overdue: { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-500', label: 'Overdue' },
};

export default function Badge({ type }) {
    const c = config[type] || config.pending;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {c.label}
        </span>
    );
}
