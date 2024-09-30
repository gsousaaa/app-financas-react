import { createContext, ReactNode, useState } from "react";

type LoginContextType = {
    email: string,
    password: string,
    setEmail: (email: string) => void,
    setPassword: (password: string) => void
}

type Props = {
    children: ReactNode
}

export const LoginContext = createContext<LoginContextType | null>(null)

export const LoginContextProvider = ({ children }: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <LoginContext.Provider value={{ email, setEmail, password, setPassword }}>
            {children}
        </LoginContext.Provider>
    )
}

