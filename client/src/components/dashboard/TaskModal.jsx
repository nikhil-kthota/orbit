import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const STATUS_OPTS = [
    { value: 'pending', label: '⚫ STANDBY' },
    { value: 'in-progress', label: '🟠 IN ORBIT' },
    { value: 'completed', label: '🟢 MISSION COMPLETE' },
];

const PRIORITY_OPTS = [
    { value: 'low', label: '▪ LOW' },
    { value: 'medium', label: '▸ MEDIUM' },
    { value: 'high', label: '◉ HIGH ALERT' },
];

const EMPTY = { title: '', description: '', status: 'pending', priority: 'medium', due_date: '' };

export default function TaskModal({ isOpen, onClose, task, onSave }) {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const editing = Boolean(task);

    useEffect(() => {
        setForm(task ? {
            title: task.title || '',
            description: task.description || '',
            status: task.status || 'pending',
            priority: task.priority || 'medium',
            due_date: task.due_date ? task.due_date.slice(0, 10) : '',
        } : EMPTY);
        setErrors({});
    }, [task, isOpen]);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Mission title required';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
        setErrors((p) => ({ ...p, [name]: '' }));
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setLoading(true);
        try {
            await onSave({ ...form, ...(editing ? { id: task.id } : {}) });
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editing ? 'EDIT MISSION BRIEF' : 'NEW MISSION BRIEF'}
            size="md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Mission Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    error={errors.title}
                    placeholder="Describe your objective..."
                    terminal
                />
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-medium text-[var(--silver)] tracking-widest uppercase">
                        Mission Notes
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="> Additional mission details..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg text-sm font-mono text-zinc-100 bg-[var(--bg-raised)] border border-[var(--silver-dim)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none resize-none transition-all placeholder:text-[var(--silver-dim)]"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <Select label="Status" name="status" value={form.status} onChange={handleChange} options={STATUS_OPTS} />
                    <Select label="Priority" name="priority" value={form.priority} onChange={handleChange} options={PRIORITY_OPTS} />
                </div>
                <Input
                    label="Last Date"
                    name="due_date"
                    type="date"
                    value={form.due_date}
                    onChange={handleChange}
                />
                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="ghost" size="md" onClick={onClose} className="flex-1">
                        ABORT
                    </Button>
                    <Button type="submit" size="md" loading={loading} className="flex-1">
                        {editing ? 'UPDATE MISSION' : 'LAUNCH MISSION'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
