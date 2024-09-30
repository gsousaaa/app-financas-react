import { LoginContext } from "@/contexts/LoginContext"
import { useContext, useState } from "react"
import { Input } from "../common/Input"
import { Button } from "../common/Button"
import { loginUser } from "@/services/apiFinancial"
import { toast } from "react-toastify"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form"
import { loginSchema } from "@/schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const FormLogin = () => {
    const loginInfo = useContext(LoginContext)
    const authInfo = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const router = useRouter()

    const handleLogin = async () => {
        try {
            const response = await loginUser({ email: loginInfo?.email || '', password: loginInfo?.password || '' })

            authInfo?.setToken(response.token)
            authInfo?.setUsername(response.username)

            router.push('/financas')
        } catch (err: any) {
            console.log(err)
            const error = err.response?.data?.error;
            if (error?.code === 400) {
                toast.error('Login e/ou senha incorretos!', {
                    autoClose: 400
                })

            } else {
                toast.error('Não foi possível realizar o login, tente novamente mais tarde!', {
                    autoClose: 400
                })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="bg-white px-8 py-12 border rounded-xl shadow-sm">
            <div className="mb-5 flex flex-col">
                <label className="text-black font-semibold font-serif">E-mail</label>
                <input className='text-sm text-black w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 font-medium' {...register('email')} value={loginInfo?.email || ''} onChange={(e) => loginInfo?.setEmail(e.target.value)} placeholder="Digite seu email" name="email" type="email" />
                {errors.email && <p className="text-red-600">{errors.email.message as string}</p>}
            </div>

            <div className="mb-5">
                <label className="text-black font-semibold font-serif">Senha</label>
                
                <div className="flex flex-col">
                    <input className='text-sm text-black w-auto border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 font-medium'  {...register('password')} value={loginInfo?.password || ''} onChange={(e) => loginInfo?.setPassword(e.target.value)} placeholder="Digite sua senha" name="password" type={showPassword ? 'text': 'password'} />
                    {errors.password && <p className="text-red-500">{errors.password.message as string}</p>}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex flex-col items-end mt-2 text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <Button type="submit">Login</Button>
            </div>

            <div className="flex justify-center mt-3">
                <a className="text-blue-400" href="/forgot-password">Esqueceu sua senha?</a>
            </div>
        </form>
    )
}