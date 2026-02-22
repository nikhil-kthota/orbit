import { useState } from 'react';
import Badge from '../ui/Badge';
import { formatDate, isOverdue } from '../../utils/helpers';

const ORB = { high: 'orb-high', medium: 'orb-medium', low: 'orb-low' };

export default function TaskCard({ task, onEdit, onDelete, onComplete }) {
    const [launching, setLaunching] = useState(false);
    const overdue = isOverdue(task.due_date, task.status);
    const isComplete = task.status === 'completed';

    const handleEdit = () => {
        setLaunching(true);
        setTimeout(() => { setLaunching(false); onEdit(task); }, 500);
    };

    const handleComplete = () => {
        if (isComplete) return;
        setLaunching(true);
        setTimeout(() => { setLaunching(false); onComplete(task.id); }, 500);
    };

    return (
        <div
            className={[
                'mission-card relative p-5 rounded-xl border transition-all duration-300 group cursor-default',
                'bg-[var(--bg-panel)] hover:bg-[var(--bg-raised)]',
                'hover:shadow-card hover:-translate-y-0.5',
                isComplete
                    ? 'border-green-500/25 opacity-75'
                    : overdue
                        ? 'border-l-red-500/50 border-t-[var(--silver-dim)] border-r-[var(--silver-dim)] border-b-[var(--silver-dim)] overdue-card'
                        : 'border-[var(--silver-dim)] hover:border-[var(--accent)]/25',
                launching ? 'animate-launch' : '',
            ].join(' ')}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className={`priority-orb ${ORB[task.priority] || 'orb-low'}`} />
                    <Badge type="status" value={task.status} />
                    <Badge type="priority" value={task.priority} />
                    {overdue && !isComplete && (
                        <span className="text-[10px] font-mono text-red-400 tracking-widest uppercase animate-pulse">
                            ◈ OVERDUE
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {!isComplete && (
                        <button
                            onClick={handleComplete}
                            className="w-9 h-9 rounded-md flex items-center justify-center text-[var(--silver)] hover:text-green-400 hover:bg-green-500/10 transition-colors text-base font-mono"
                            title="Mark mission complete"
                        >
                            ✓
                        </button>
                    )}
                    <button
                        onClick={handleEdit}
                        className="w-9 h-9 rounded-md flex items-center justify-center text-[var(--silver)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors text-base font-mono"
                        title="Edit mission"
                    >
                        ✎
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="w-9 h-9 rounded-md flex items-center justify-center text-[var(--silver)] hover:text-red-400 hover:bg-red-500/10 transition-colors text-base font-mono"
                        title="Abort mission"
                    >
                        ✕
                    </button>
                </div>
            </div>

            <h3 className={[
                'font-display font-bold text-sm mb-1.5 leading-snug line-clamp-1',
                isComplete ? 'line-through text-[var(--silver)]' : 'text-zinc-100',
            ].join(' ')}>
                {task.title}
            </h3>

            {task.description && (
                <p className="text-xs text-[var(--silver)] line-clamp-2 mb-3 leading-relaxed">
                    {task.description}
                </p>
            )}

            {task.due_date && (
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[var(--silver-dim)]/50">
                    <span className={isComplete ? 'text-green-500 text-[10px]' : 'text-[var(--accent)] text-[10px]'}>
                        {isComplete ? '✓' : '◈'}
                    </span>
                    <span className={[
                        'text-[10px] font-mono tracking-widest uppercase',
                        isComplete ? 'text-green-500/60' : overdue ? 'text-red-400' : 'text-[var(--silver-dim)]',
                    ].join(' ')}>
                        {formatDate(task.due_date)}
                    </span>
                </div>
            )}
        </div>
    );
}
