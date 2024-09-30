import { useState } from "react"
import { Button } from "../common/Button"
import z from 'zod'
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export const FormResetPassword = () => {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });


    const handleResetPassword = () => {

    }

    return (

        <form onSubmit={handleSubmit(handleResetPassword)} className="flex flex-col p-20 border bg-white rounded-md shadow-2xl">
            <div>
                <label className="text-black">Nova Senha</label>
                <div className="flex">
                    <input {...register("password")} className='text-sm text-black w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 font-medium' placeholder='Nova senha' name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <div className="text-black">

            </div>

            <div className="flex justify-center mt-5">
                <Button type="submit">Redefinir senha</Button>
            </div>
        </form>
    )
}