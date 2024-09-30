import { FinancesContext } from "@/contexts/FinancesContext"
import { useContext } from "react"


export const RevenuesField = () => {
    const financesInfo = useContext(FinancesContext)

    return (
        <div className="p-7 border border-gray-400 w-40 flex flex-col rounded-md text-center bg-white shadow-xl">
            <p className="font-semibold">Receitas</p>
            <p className="text-green-500 font-bold">R$ {financesInfo?.revenues.toFixed(2)}</p>
        </div>
    )
}