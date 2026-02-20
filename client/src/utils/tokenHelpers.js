// --- Token Storage ---
export const getToken = () => localStorage.getItem('orbit_token');
export const setToken = (token) => localStorage.setItem('orbit_token', token);
export const removeToken = () => localStorage.removeItem('orbit_token');

export const getStoredUser = () => {
    const u = localStorage.getItem('orbit_user');
    return u ? JSON.parse(u) : null;
};
export const setStoredUser = (user) =>
    localStorage.setItem('orbit_user', JSON.stringify(user));
export const removeStoredUser = () => localStorage.removeItem('orbit_user');
