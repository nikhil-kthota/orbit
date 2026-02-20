import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatDate, isOverdue } from '../../utils/helpers';

// --- Task Card ---
export default function TaskCard({ task, onEdit, onDelete }) {
    const overdue = isOverdue(task.due_date, task.status);

    return (
        <div className="group bg-surface-800 border border-zinc-700/40 hover:border-zinc-600/60 rounded-2xl p-5 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 animate-slide-up">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm leading-tight mb-1 truncate ${task.status === 'completed' ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-xs text-silver line-clamp-2 mb-3">{task.description}</p>
                    )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                        onClick={() => onEdit(task)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-silver hover:text-brand hover:bg-brand-light transition-all"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-silver hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Badge type={task.status} />
                <Badge type={task.priority} />
                {overdue && <Badge type="overdue" />}
                {task.due_date && (
                    <span className={`text-xs ml-auto ${overdue ? 'text-red-400' : 'text-silver'}`}>
                        {formatDate(task.due_date)}
                    </span>
                )}
            </div>
        </div>
    );
}
