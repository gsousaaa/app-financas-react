import React, { createContext, ReactNode, useEffect, useState } from "react"

type AuthContextType = {
    token: string | null,
    setToken: (token: string | null) => void,
    username: string | null,
    setUsername: (username: string | null) => void,
    isAuth: boolean
}

type Props = {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: Props) => {
    const [token, setTokenState] = useState<string | null>(null)
    const [username, setUsernameState] = useState<string | null>(null)

    const setToken = (token: string | null) => {
        setTokenState(token);
        if (token) {
            localStorage.setItem('token', token);
           
        } else {
            localStorage.removeItem('token');
        }
    };

    const setUsername = (username: string | null) => {
        setUsernameState(username);
        if (username) {
            localStorage.setItem('username', username );
           
        } else {
            localStorage.removeItem('username');
        }
    };

    const isAuth = Boolean(token);

    return (
        <AuthContext.Provider value={{ token, setToken, isAuth, username, setUsername }}>{children}</AuthContext.Provider>
    )
}

