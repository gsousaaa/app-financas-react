import { FormForgotPassword } from "@/components/auth/FormForgotPassword"
import Image from "next/image"
import Link from "next/link"

export default () => {


    return (
        <section className="bg-gray-100 flex flex-col">
            <div className="bg-white  border shadow-xl">
                <Link href='/login'>
                    <Image className="w-60 h-50" src="/assets/logo.png" alt="logo" width={200} height={250}></Image>
                </Link>
            </div>

            <div className="w-full h-screen flex justify-center  mt-10 items-start">
                <FormForgotPassword />
            </div>

        </section>
    )
}