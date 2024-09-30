import { FinancesContext } from "@/contexts/FinancesContext"
import { useContext, useReducer, useState } from "react"
import { Input } from "../common/Input"
import { movementsReducer } from "@/reducers/movementsReducer"
import { Movement, Movements } from "@/types/IGetMovements"
import { IAddAction } from "@/types/IAddAction"
import { Button } from "../common/Button"
import { createMovement, getFinances, getMovements } from "@/services/apiFinancial"
import { ButtonAddMovement } from "../common/ButtonAddMovement"
import { zodResolver } from "@hookform/resolvers/zod"
import { addMovementSchema } from "@/schemas/addMovementSchema"
import { useForm } from "react-hook-form"


export const FormAddMovement = () => {
    const financesInfo = useContext(FinancesContext)
    const initialMovements: Movements = financesInfo?.movements || [];

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(addMovementSchema)
    })

    const [movementsList, dispatch] = useReducer(movementsReducer, initialMovements)
    const [newMovement, setNewMovement] = useState<IAddAction>({
        movementType: 'revenue',
        value: 0,
        description: ''
    })

    const fetchMovements = async () => {
        const getFinancesResponse = await getFinances();
        const movements = await getMovements()
        financesInfo?.setMovements(movements);  // Atualiza os movimentos no contexto
        financesInfo?.setBalance(getFinancesResponse.finances.balance);
        financesInfo?.setExpenses(getFinancesResponse.finances.expenses);
        financesInfo?.setRevenues(getFinancesResponse.finances.revenues);
    };


    const handleSave = async () => {
        const newMov = await createMovement({ movementType: newMovement.movementType, value: newMovement.value, description: newMovement.description })

        dispatch({
            type: 'add',
            payload: {
                id: newMov.id,
                movementType: newMov.movementType,
                value: newMov.value,
                description: newMov.description,
                createdAt: newMov.createdAt,
                userId: newMov.userId
            }
        })

        await fetchMovements()

    }

    return (
        <form onSubmit={handleSubmit(handleSave)} className="bg-white px-8 py-8 rounded-md text-black">
            <div className="mb-5">
                <label>Valor</label>
                <input {...register('value')} className="text-sm text-black w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 font-medium" type="number" step="any" name="value" onChange={(e) => setNewMovement(prevState => ({
                    ...prevState,
                    value: Number(e.target.value)
                }))} placeholder="Digite o valor" />
                {errors.value && <p className="text-red-500">{errors.value.message as string}</p>}
            </div>

            <div className="mb-5">
                <label>Descrição</label>
                <input  {...register('description')} className='text-sm text-black w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 font-medium' value={newMovement.description} type="text" name="description" onChange={(e) => setNewMovement(prevState => ({
                    ...prevState,
                    description: e.target.value
                }))} placeholder="Descrição da movimentação" />
                {errors.description && <p className="text-red-500">{errors.description.message as string}</p>}
            </div>

            <div>
                <label>Tipo de movimentação</label>
                <select className="block w-full mt-2 bg-gray-100 text-black rounded-md p-3" value={newMovement.movementType} onChange={(e) => setNewMovement(prevState => ({
                    ...prevState,
                    movementType: e.target.value
                }))}>
                    <option value="revenue">Receita</option>
                    <option value="expense">Despesa</option>
                </select>
            </div>

            <div className="mt-5 flex justify-center">
                <ButtonAddMovement type="submit">Salvar</ButtonAddMovement>
            </div>

        </form >
    )

}