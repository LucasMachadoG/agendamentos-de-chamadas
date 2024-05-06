import ButtonComponent from "@/app/components/ButtonComponent"
import InputComponent from "@/app/components/InputComponent"
import { api } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { FaArrowRight } from "react-icons/fa"
import { toast } from "sonner"
import { z } from "zod"

interface NextStep{
  nextStep: () => void
}

const formCadastrarSchema = z.object({
  username: z
    .string()
    .min(3, {message: 'Nome precisa ter pelo menos 3 letras.'})
    .regex(/^([a-z\\-]+)$/i, {message: 'Nome pode ter apenas letras e hifens'})
    .transform(username => username.toLowerCase()),
  name: z.string().min(3,{message: 'Nome precisa ter pelo menos 3 letras.'})
})

type formCadastrarData = z.infer<typeof formCadastrarSchema>

export default function Step2(){
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<formCadastrarData>({
    resolver: zodResolver(formCadastrarSchema)
  })

  const handleClaimUserName = async (data: formCadastrarData) => {
    try{
      const { username, name } = data

      const result = await api.post("/users", {
        username, 
        name
      })

      toast.success("Cadastro realizado.")
    }catch(error: any){
      if(error instanceof AxiosError && error?.response?.data?.message){
        toast.error(error.response.data.message)
        return
      }

      console.log(error)
    }
  }

  return(
    <div className="mt-6">
      <form onSubmit={handleSubmit(handleClaimUserName)} className="w-full flex flex-col rounded-lg gap-2 bg-gray-800 p-4">
        <div className="w-full flex justify-between items-center bg-gray-800 border py-4 px-5 border-gray-600 rounded-lg">
          <span className="text-gray-100 font-medium">Google Agenda</span>
          <ButtonComponent type="submit" title="Conectar" icon={<FaArrowRight />} className="text-ignite-300 px-4 py-3 border border-ignite-300 hover:bg-ignite-300 hover:text-white transition duration-300" />
        </div>
        <ButtonComponent disabled={isSubmitting} className="text-white bg-ignite-300" type="submit" title="Próximo passo" icon={<FaArrowRight />} />
      </form>
    </div>
  )
}