// --- Validation Helpers ---
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) => password.length >= 6;

const isNonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;

module.exports = { isValidEmail, isStrongPassword, isNonEmpty };
