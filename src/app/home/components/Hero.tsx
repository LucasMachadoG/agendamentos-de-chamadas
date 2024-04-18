import Button from "@/app/components/Button";
import { FaGoogle } from "react-icons/fa";

export default function Hero(){
  return(
    <div className="w-full flex flex-col space-y-3">
      <h1 className="text-white font-extrabold text-3xl text-left">Agendamento <br /> descomplicado</h1>
      <span className="text-gray-200 text-sm">Conecte seu calendário e permita que as pessoas <br /> marquem agendamentos no seu tempo livre.</span>
      <Button title="Criar conta com google" icon={<FaGoogle />} className="bg-[#DB4437] text-white w-3/5 max-w-56" />
    </div>
  )
}