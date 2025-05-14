'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
    username: string;
    jobTitle: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleSetUser = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            handleSetUser(updatedUser);
        }
    };
    return (
        <UserContext.Provider value={{ user, setUser: (newUser: User | null) => handleSetUser(newUser as User), updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 