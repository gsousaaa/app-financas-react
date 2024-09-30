import Image from "next/image";
import localFont from "next/font/local";

import Link from "next/link";
import { Button } from "@/components/common/Button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <section className="bg-gray-100">

      <div className="bg-white shadow-xl">
        <Image className="w-60 h-50" src="/assets/logo.png" alt="logo" width={200} height={250}></Image>
      </div>

      <div className="flex flex-col items-center justify-start mt-20 min-h-screen py-2 bg-gray-100 text-black">

        <div className="bg-white shadow-xl rounded-md p-10 space-x-5">
          <h1 className="  text-4xl font-bold mb-4 ">Bem-vindo ao seu gerenciador de finanças!</h1>
          <p className="mb-10">Por favor, faça login para continuar.</p>
          <Link href="/login">
            <Button type="button">Ir para Login</Button>
          </Link>

          <Link href="/register">
            <Button type="button">Registre-se</Button>
          </Link>

        </div>
      </div>

    </section>
  );
}
