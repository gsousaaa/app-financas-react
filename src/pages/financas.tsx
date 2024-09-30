import { ButtonAddMovement } from "@/components/common/ButtonAddMovement"
import { BalanceField } from "@/components/finances/BalanceField"
import { ExpensesField } from "@/components/finances/ExpensesField"
import { MovementsList } from "@/components/finances/MovementsList"
import { RevenuesField } from "@/components/finances/RevenuesField"
import { AuthContext } from "@/contexts/AuthContext"
import { FinancesContext } from "@/contexts/FinancesContext"
import { getFinances, getMovements } from "@/services/apiFinancial"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { HiOutlineLogout } from "react-icons/hi";
import { toast } from "react-toastify"
import { FormAddMovement } from "@/components/finances/FormAddMovement"
import { ModalAdd } from "@/components/finances/ModalAdd"
import Image from "next/image"

export default () => {
    const authInfo = useContext(AuthContext)
    const financesInfo = useContext(FinancesContext)
    const router = useRouter()

    const openModal = () => financesInfo?.setIsModalAddOpen(true)

    useEffect(() => {
        const localToken = localStorage.getItem('token')
        const localUsername = localStorage.getItem('username')
        if (!localToken) {
            router.push('/login')
        }

        authInfo?.setUsername(localUsername)
        authInfo?.setToken(localToken)

    }, [authInfo?.isAuth, router])

    useEffect(() => {
        const getInfo = async () => {
            try {
                const getFinancesResponse = await getFinances()
                const getMovementsResponse = await getMovements()

                financesInfo?.setExpenses(getFinancesResponse.finances.expenses)
                financesInfo?.setRevenues(getFinancesResponse.finances.revenues)
                financesInfo?.setBalance(getFinancesResponse.finances.balance)
                financesInfo?.setMovements(getMovementsResponse)
            } catch (err) {
                toast.error('Erro ao buscar as informações')
            }
        }

        getInfo()

    }, [])

    const handleLogout = () => {
        authInfo?.setToken(null)
        authInfo?.setUsername(null)
        router.push('/login')
    }

    return (
            <section className="flex bg-gray-100">
                <div className="bg-white shadow-xl rounded-2xl">
                    <Image className="w-80 h-50" src="/assets/logo.png" alt="logo" width={200} height={250}></Image>
                </div>

                <div className="flex w-full h-full bg-gray-100 items-start justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <div className="w-full h-auto">
                            <h1 className="text-black text-xl  ml-5">Olá, <span className="text-green-500">{authInfo?.username}</span>. seja bem-vindo ao seu gerenciador de finanças!</h1>
                        </div>

                        <div className="flex p-10 space-x-10 mt-5 w-full h-40 text-black justify-center  items-start">
                            <BalanceField />
                            <RevenuesField />
                            <ExpensesField />

                        </div>

                        <ButtonAddMovement type="button" onClick={openModal}>Nova movimentação</ButtonAddMovement>

                        <div className="overflow-auto bg-gray-100 min-h-screen">
                            <MovementsList />
                        </div>

                    </div>

                    <div className="absolute top-4 right-4">
                        <button onClick={handleLogout} className="text-green-500">
                            <HiOutlineLogout size={30} />
                        </button>

                    </div>

                    <ModalAdd>
                        <FormAddMovement />
                    </ModalAdd>
                </div>

            </section>
    )
}