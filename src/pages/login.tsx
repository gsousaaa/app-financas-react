import { FormLogin } from "@/components/auth/FormLogin"
import { AuthContextProvider } from "@/contexts/AuthContext"
import { LoginContextProvider } from "@/contexts/LoginContext"
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default () => {

    return (
        <div className=" w-full h-screen flex bg-gray-100">
            <div className="bg-white shadow-2xl rounded-2xl">
                <Link href='/'>
                <Image className="w-80 h-50" src="/assets/logo.png" alt="logo" width={200} height={250}></Image>
                </Link>
            </div>

            <div className="w-full flex items-center justify-center mt-5">
                <LoginContextProvider >
                    <ToastContainer />
                    <FormLogin />
                </LoginContextProvider>
            </div>
        </div>
    )
}