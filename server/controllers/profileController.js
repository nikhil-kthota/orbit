const supabase = require('../config/supabase');
const { isNonEmpty } = require('../utils/validation');

// --- Get Profile ---
const getProfile = async (req, res) => {
    const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, bio, created_at')
        .eq('id', req.user.userId)
        .single();

    if (error || !user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
};

// --- Update Profile ---
const updateProfile = async (req, res) => {
    const { name, bio } = req.body;

    if (!isNonEmpty(name)) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const { data: user, error } = await supabase
        .from('users')
        .update({ name: name.trim(), bio: bio || '' })
        .eq('id', req.user.userId)
        .select('id, name, email, bio, created_at')
        .single();

    if (error) {
        return res.status(500).json({ error: 'Failed to update profile' });
    }

    res.json(user);
};

module.exports = { getProfile, updateProfile };
