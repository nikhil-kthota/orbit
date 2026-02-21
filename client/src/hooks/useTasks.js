import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask as apiCreate, updateTask as apiUpdate, deleteTask as apiDelete } from '../api/tasks';
import toast from 'react-hot-toast';

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.q = search;
            if (statusFilter) params.status = statusFilter;
            if (priorityFilter) params.priority = priorityFilter;
            const data = await fetchTasks(params);
            setTasks(Array.isArray(data) ? data : []);
        } catch (err) {
            toast.error(err.message || 'Failed to load missions');
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, priorityFilter]);

    useEffect(() => {
        load();
    }, [load]);

    const createTask = async (data) => {
        const created = await apiCreate(data);
        setTasks((prev) => [created, ...prev]);
        toast.success('MISSION LAUNCHED', { icon: '🚀' });
        return created;
    };

    const updateTask = async (id, data) => {
        const updated = await apiUpdate(id, data);
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        toast.success('MISSION UPDATED', { icon: '◉' });
        return updated;
    };

    const deleteTask = async (id) => {
        await apiDelete(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
        toast.success('MISSION ABORTED', { icon: '✕' });
    };

    return {
        tasks, loading,
        search, setSearch,
        statusFilter, setStatusFilter,
        priorityFilter, setPriorityFilter,
        createTask, updateTask, deleteTask,
    };
}
