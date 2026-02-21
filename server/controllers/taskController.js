const supabase = require('../config/supabase');
const { isNonEmpty } = require('../utils/validation');

const getTasks = async (req, res) => {
    const { q, status, priority } = req.query;

    let query = supabase
        .from('tasks')
        .select('*')
        .eq('user_id', req.user.userId)
        .order('created_at', { ascending: false });

    if (status && status !== 'all') query = query.eq('status', status);
    if (priority && priority !== 'all') query = query.eq('priority', priority);
    if (q && q.trim()) query = query.ilike('title', `%${q.trim()}%`);

    const { data, error } = await query;

    if (error) {
        return res.status(500).json({ error: 'Failed to fetch tasks' });
    }

    res.json(data);
};

const createTask = async (req, res) => {
    const { title, description, status, priority, due_date } = req.body;

    if (!isNonEmpty(title)) {
        return res.status(400).json({ error: 'Task title is required' });
    }

    const { data, error } = await supabase
        .from('tasks')
        .insert({
            user_id: req.user.userId,
            title: title.trim(),
            description: description || '',
            status: status || 'pending',
            priority: priority || 'medium',
            due_date: due_date || null,
        })
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: 'Failed to create task' });
    }

    res.status(201).json(data);
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, due_date } = req.body;

    if (!isNonEmpty(title)) {
        return res.status(400).json({ error: 'Task title is required' });
    }

    const { data, error } = await supabase
        .from('tasks')
        .update({
            title: title.trim(),
            description: description || '',
            status,
            priority,
            due_date: due_date || null,
        })
        .eq('id', id)
        .eq('user_id', req.user.userId)
        .select()
        .single();

    if (error || !data) {
        return res.status(404).json({ error: 'Task not found or access denied' });
    }

    res.json(data);
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', req.user.userId);

    if (error) {
        return res.status(404).json({ error: 'Task not found or access denied' });
    }

    res.json({ message: 'Task deleted successfully' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
