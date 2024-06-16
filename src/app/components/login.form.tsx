'use client'

import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";
import { signIn } from "next-auth/react";
import FormError from "./FormError";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

export default function LoginForm(){
  const [error, setError] = useState("")

  const searchParams = useSearchParams()

  useEffect(() => {
    const notAccount = searchParams.get("error")

    if(notAccount){
      setError("Você não possui uma conta, volte a página de cadastrar e crie uma.")
    }
  })

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: "/login"
    })
  }

  return(
    <div className="w-full h-screen flex justify-center">
      <div className="w-[576px] mt-20 justify-center">
        <div className="w-full flex justify-between items-center bg-gray-800 border py-4 px-5 border-gray-600 rounded-lg mb-2">
          <span className="text-gray-100 font-medium">Google</span>
            <Button
            onClick={() => onClick('google')}
            type="button"
            className="text-ignite-300 px-4 py-3 border border-ignite-300 
              hover:bg-ignite-300 hover:text-white transition duration-300 text-sm font-medium 
              rounded-lg flex gap-2 justify-center items-center"
          >
            <FaArrowRight />
            Conectar
          </Button>
        </div>
        <FormError message={error} />
        <div className="mt-4 flex gap-2 items-center">
          <IoIosArrowBack className="h-5 w-5 text-ignite-300" />
          <Link href={"/"} className="text-ignite-300 text-sm">Voltar</Link>
        </div>
      </div>
    </div>
    
  )
}