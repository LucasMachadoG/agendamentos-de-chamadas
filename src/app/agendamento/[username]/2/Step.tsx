import Button from "@/app/components/Button";
import InputComponent from "@/app/components/InputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
import { z } from "zod";

const formConfirmationStepSchema = z.object({
  name: z.string().min(3, {
    message: "Nome precisa ter no minimo 3 caracteres."
  }),
  email: z.string().email({
    message: "Informe o email"
  }),
  observacoes: z.optional(z.string())
})

type formConfirmationStep = z.infer<typeof formConfirmationStepSchema>

interface Step2Props{
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export default function Step2({ schedulingDate, onCancelConfirmation }: Step2Props){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<formConfirmationStep>({
    resolver: zodResolver(formConfirmationStepSchema)
  })

  const onSubmit = (data: formConfirmationStep) => {

  }

  const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describeTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <div className="bg-gray-800 rounded-lg mt-10 p-5 flex gap-4 flex-col w-[576px]">
      <div className="w-full flex gap-5">
        <div className="w-auto flex items-center gap-2">
          <FaRegCalendar className="text-gray-200" />
          <span className="text-white"> {describeDate}</span>
        </div>
        <div className="w-auto flex items-center gap-2">
          <FaRegClock className="text-gray-200" />
          <span className="text-white"> {describeTime}</span>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gray-600" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full flex flex-col gap-3">
          <InputComponent register={register('name')} label="Seu nome" placeholder="" ClassNameInput="w-full p-3 border-none" ClassNameLabel="text-sm text-gray-100" />
          <span className="text-xs text-red-500">{errors.name ? errors.name.message : null}</span>
          <InputComponent register={register('email')} type="email" label="Endereço de e-mail" placeholder="johndoe@example.com" ClassNameInput="w-full p-3 border-none" ClassNameLabel="text-sm text-gray-100" />
          <span className="text-xs text-red-500">{errors.email ? errors.email.message : null}</span>
          <label className="text-gray-100 text-sm">Observações</label>
          <textarea {...register('observacoes')} className="bg-gray-900 rounded-lg w-full h-24 resize-none text-white border-none p-3 text-sm" />
        </div>
        <div className="w-full flex justify-end gap-2">
          <Button type="button" onClick={onCancelConfirmation} className="p-3 text-white border-[2px] border-gray-600 rounded-lg text-sm">Cancelar</Button>
          <Button type="submit" className="p-3 text-white bg-ignite-500 rounded-lg text-sm">Confirmar</Button>
        </div>
      </form>
    </div>
  )
}