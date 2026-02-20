import { useState, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import toast from 'react-hot-toast';

// --- Tasks Hook ---
export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadTasks = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const data = await fetchTasks(params);
            setTasks(data);
        } catch (err) {
            toast.error(err.message || 'Failed to load tasks');
        } finally {
            setLoading(false);
        }
    }, []);

    const addTask = async (taskData) => {
        const newTask = await createTask(taskData);
        setTasks((prev) => [newTask, ...prev]);
        toast.success('Task created!');
        return newTask;
    };

    const editTask = async (id, taskData) => {
        const updated = await updateTask(id, taskData);
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        toast.success('Task updated!');
        return updated;
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
        toast.success('Task deleted');
    };

    return { tasks, loading, loadTasks, addTask, editTask, removeTask };
}
