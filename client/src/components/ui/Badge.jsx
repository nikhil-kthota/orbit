const STATUS = {
    'pending': { label: 'STANDBY', cls: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25' },
    'in-progress': { label: 'IN ORBIT', cls: 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/25' },
    'completed': { label: 'MISSION COMPLETE', cls: 'text-green-400 bg-green-400/10 border-green-400/25' },
};

const PRIORITY = {
    'high': { label: 'HIGH ALERT', cls: 'text-red-400 bg-red-400/10 border-red-400/25' },
    'medium': { label: 'MEDIUM', cls: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25' },
    'low': { label: 'LOW', cls: 'text-[var(--silver)] bg-[var(--silver)]/10 border-[var(--silver)]/20' },
};

export default function Badge({ type, value }) {
    const map = type === 'status' ? STATUS : PRIORITY;
    const item = map[value] || { label: value?.toUpperCase(), cls: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20' };

    return (
        <span className={[
            'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold',
            'border tracking-widest uppercase',
            item.cls,
        ].join(' ')}>
            {item.label}
        </span>
    );
}
