import { forgotPassword } from "@/services/apiFinancial"
import { useState } from "react"
import { toast } from "react-toastify"
import { Button } from "../common/Button"
import { useRouter } from "next/router"

export const FormForgotPassword = () => {
    const [email, setEmail] = useState('')
    const router = useRouter()

    const handleForgotPassword = async (e: any) => {
        e.preventDefault()
        try {
            await forgotPassword(email)
            toast.success('Link de redefinição enviado via e-mail')

        } catch (err) {
            toast.error('Erro em enviar o link de redefinição!')
        }
    }

    return (
        <form onSubmit={(e) => handleForgotPassword(e)} className="flex flex-col p-20 border bg-white rounded-md shadow-2xl">
            <div>
                <label className="text-black">E-mail</label>
                <input className='text-sm text-black w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 font-medium' placeholder='Digite seu e-mail' name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div className="flex justify-center mt-5">
                <Button type="submit">Redefinir senha</Button>
            </div>
        </form>
    )

}