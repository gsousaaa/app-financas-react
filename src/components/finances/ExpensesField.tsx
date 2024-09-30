import { FinancesContext } from "@/contexts/FinancesContext"
import { useContext } from "react"


export const ExpensesField = () => {
    const financesInfo = useContext(FinancesContext)

    return (
        <div className="p-7 border border-gray-400 w-40 flex flex-col rounded-md text-center bg-white shadow-xl">
            <p className="font-semibold">Despesas</p>
            <p className="text-red-500 font-bold">R$ {financesInfo?.expenses.toFixed(2)}</p>
        </div>
    )
}