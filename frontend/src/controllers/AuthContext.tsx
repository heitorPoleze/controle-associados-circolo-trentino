import { createContext, useState, useEffect, useContext } from 'react';
import { AuthServices, type AuthResponse } from '../services/AuthServices'; 

interface AuthContextData {
    signed: boolean;
    user: AuthResponse['admin'] | null;
    signIn: (login: string, senha: string) => Promise<void>;
    signOut: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children } : any) => {
    const [user, setUser] = useState<AuthResponse['admin'] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storagedToken = localStorage.getItem('@App:token');
        const storagedUser = localStorage.getItem('@App:admin');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
        }
        setLoading(false);
    }, []);

    async function signIn(login: string, senha: string) {
        const authService = new AuthServices();
        
        const response = await authService.autenticar({ login, senha });

        localStorage.setItem('@App:token', response.token);
        localStorage.setItem('@App:admin', JSON.stringify(response.admin));

        setUser(response.admin);
    }

    function signOut() {
        localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}