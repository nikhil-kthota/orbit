import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const empty = { title: '', description: '', status: 'pending', priority: 'medium', due_date: '' };

// --- Task Modal ---
export default function TaskModal({ isOpen, onClose, onSubmit, editTask }) {
    const [form, setForm] = useState(empty);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editTask) {
            setForm({
                title: editTask.title || '',
                description: editTask.description || '',
                status: editTask.status || 'pending',
                priority: editTask.priority || 'medium',
                due_date: editTask.due_date ? editTask.due_date.split('T')[0] : '',
            });
        } else {
            setForm(empty);
        }
        setErrors({});
    }, [editTask, isOpen]);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required';
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
            await onSubmit({ ...form, due_date: form.due_date || null });
            onClose();
        } catch (err) {
            setErrors({ title: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editTask ? 'Edit Task' : 'New Task'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Title *"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    error={errors.title}
                    placeholder="What needs to be done?"
                    autoFocus
                />
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-zinc-300">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Add details (optional)"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl text-zinc-100 text-sm placeholder-zinc-500 bg-surface-800/60 border border-zinc-700/60 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none resize-none transition-all duration-200"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <Select label="Status" name="status" value={form.status} onChange={handleChange}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </Select>
                    <Select label="Priority" name="priority" value={form.priority} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </Select>
                </div>
                <Input
                    label="Due Date"
                    name="due_date"
                    type="date"
                    value={form.due_date}
                    onChange={handleChange}
                />
                <div className="flex gap-3 pt-2">
                    <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" className="flex-1" loading={loading}>
                        {editTask ? 'Save Changes' : 'Create Task'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
