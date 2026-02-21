import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../api/auth';
import {
    getToken, setToken, removeToken,
    getStoredUser, setStoredUser, removeStoredUser,
} from '../utils/tokenHelpers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getStoredUser());
    const [token, setTokenState] = useState(getToken());

    const login = async (email, password) => {
        const data = await loginUser({ email, password });
        setToken(data.token);
        setStoredUser(data.user);
        setTokenState(data.token);
        setUser(data.user);
    };

    const register = async (name, email, password) => {
        const data = await registerUser({ name, email, password });
        setToken(data.token);
        setStoredUser(data.user);
        setTokenState(data.token);
        setUser(data.user);
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
        <AuthContext.Provider value={{ user, token, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
