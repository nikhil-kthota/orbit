const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');
const { signToken } = require('../utils/jwt');
const { isValidEmail, isStrongPassword, isNonEmpty } = require('../utils/validation');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!isNonEmpty(name) || !isNonEmpty(email) || !isNonEmpty(password)) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address' });
    }
    if (!isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase())
        .single();

    if (existing) {
        return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const hashed = await bcrypt.hash(password, 12);

    const { data: user, error } = await supabase
        .from('users')
        .insert({ name: name.trim(), email: email.toLowerCase(), password: hashed })
        .select('id, name, email, bio, created_at')
        .single();

    if (error) {
        return res.status(500).json({ error: 'Registration failed. Please try again.' });
    }

    const token = signToken({ userId: user.id, email: user.email });
    res.status(201).json({ token, user });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!isNonEmpty(email) || !isNonEmpty(password)) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

    if (error || !user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken({ userId: user.id, email: user.email });
    const { password: _, ...safeUser } = user;
    res.json({ token, user: safeUser });
};

module.exports = { register, login };
