import { useContext, useEffect, useReducer } from "react";
import { FinancesContext } from "@/contexts/FinancesContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteMovement, getFinances, getMovements } from "@/services/apiFinancial";
import { ListActions, movementsReducer } from "@/reducers/movementsReducer";
import { Movement, Movements } from "@/types/IGetMovements";
import { ModalEdit } from "./ModalEdit";
import { FormEditMovement } from "./FormEditMovement";

export const MovementsList = () => {
    const financesInfo = useContext(FinancesContext);

    const initialMovements: Movements = financesInfo?.movements || [];

    const [movementsList, dispatch] = useReducer<(state: Movements, action: ListActions) => Movements>(movementsReducer, initialMovements)

    const fetchMovements = async () => {
        const getFinancesResponse = await getFinances();
        const movements = await getMovements()
        financesInfo?.setMovements(movements);  // Atualiza os movimentos no contexto
        financesInfo?.setBalance(getFinancesResponse.finances.balance);
        financesInfo?.setExpenses(getFinancesResponse.finances.expenses);
        financesInfo?.setRevenues(getFinancesResponse.finances.revenues);
    };


    const handleDelete = async (id: number) => {

        await deleteMovement(id)

        dispatch({ type: 'remove', payload: { id } })

        await fetchMovements()
    }

    useEffect(() => {
        financesInfo?.setMovements(movementsList)
    }, [movementsList])


    const handleEdit = (movement: Movement) => {
        financesInfo?.setMovementToUpdate(movement)
        financesInfo?.setIsModalEditOpen(true)
     }

    return (
        <div className="w-full mt-10 text-black ">
            <h2 className="text-xl font-semibold mb-4">Movimentações</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 border-b">Tipo de Movimentação</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Valor</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Descrição</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {financesInfo?.movements?.map((movement) => (
                        <tr key={movement.id} className="text-center border-b">
                            <td className="py-2 px-4">{movement.movementType === 'revenue' ? 'Receita' : 'Despesa'}</td>
                            <td className={`py-2 px-4 ${movement.movementType === 'revenue' ? 'text-green-500' : 'text-red-500'
                                }`}>{movement.movementType === 'revenue' ? `+ R$${movement.value.toFixed(2)}` : `- R$${movement.value.toFixed(2)}`}</td>
                            <td className="py-2 px-4">{movement.description}</td>
                            <td className="py-2 px-4 flex justify-center space-x-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => handleEdit(movement)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(movement.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                
                <ModalEdit>
                    <FormEditMovement />
                </ModalEdit>
        </div>
    );
};
