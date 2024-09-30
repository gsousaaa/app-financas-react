import { Movement, Movements } from "@/types/IGetMovements"
import { createContext, ReactNode, useState } from "react"

export type FinancesContextType = {
    balance: number,
    setBalance: (n: number) => void,
    revenues: number,
    setRevenues: (n: number) => void,
    expenses: number,
    setExpenses: (n: number) => void,
    movements: Movements,
    setMovements: (movements: Movements) => void,
    isModalEditOpen: boolean,
    setIsModalEditOpen: (bool: boolean) => void,
    isModalAddOpen: boolean,
    setIsModalAddOpen: (bool: boolean) => void,
    movementToUpdate: Movement | undefined,
    setMovementToUpdate: (m: Movement) => void

}

type Props = {
    children: ReactNode
}

export const FinancesContext = createContext<FinancesContextType | null>(null)

export const FinancesContextProvider = ({ children }: Props) => {
    const [balance, setBalance] = useState(0)
    const [revenues, setRevenues] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [movements, setMovements] = useState<Movements>([])
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [movementToUpdate, setMovementToUpdate] = useState<Movement | undefined>()

    return (
        <FinancesContext.Provider value={{ balance, setBalance, revenues, setRevenues, expenses, setExpenses, movements, setMovements, isModalAddOpen, setIsModalAddOpen,  isModalEditOpen, setIsModalEditOpen ,movementToUpdate, setMovementToUpdate }}>
            {children}
        </FinancesContext.Provider>
    )
}

