import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../api/auth';
import {
    getToken, setToken, removeToken,
    getStoredUser, setStoredUser, removeStoredUser,
} from '../utils/tokenHelpers';

// --- Auth Context ---
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getStoredUser());
    const [token, setTokenState] = useState(getToken());
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await loginUser({ email, password });
            setToken(data.token);
            setStoredUser(data.user);
            setTokenState(data.token);
            setUser(data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const data = await registerUser({ name, email, password });
            setToken(data.token);
            setStoredUser(data.user);
            setTokenState(data.token);
            setUser(data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        removeToken();
        removeStoredUser();
        setTokenState(null);
        setUser(null);
    };

    const refreshUser = (updatedUser) => {
        setStoredUser(updatedUser);
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
