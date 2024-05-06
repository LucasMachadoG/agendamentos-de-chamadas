import Link from "next/link";
import ClaimUserNameForm from "./ClaimUserNameForm";

export default function Hero(){
  return(
    <div className="flex flex-col space-y-3 max-w-[480px]">
      <div className="w-full">
        <h1 className="text-white font-extrabold text-3xl text-left xl:text-5xl">Agendamento <br /> descomplicado</h1>
        <span className="text-gray-200 text-sm xl:text-base">Conecte seu calendário e permita que as pessoas <br /> marquem agendamentos no seu tempo livre.</span>
      </div>
      <div>
        <ClaimUserNameForm />
      </div>
      <span className="text-white">Ja possui uma conta? <Link className="text-gray-200 underline" href={'/login'}>Clique aqui</Link> </span>
    </div>
  )
}