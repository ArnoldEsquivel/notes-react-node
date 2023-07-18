import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        window.localStorage.getItem('session') ?? false
    );

    const login = async (session) => {
        window.localStorage.setItem('session', JSON.stringify(session))
        setIsAuthenticated(true);
    };

    const logout = () => {
        window.localStorage.removeItem('session');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuthContext() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };