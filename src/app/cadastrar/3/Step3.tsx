import Button from "@/app/components/Button"
import FormError from "@/app/components/FormError"
import convertTimeStringToMinutes from "@/app/utils/convert.time.string.on.minutes"
import getWeekDays from "@/app/utils/get.week.days"
import { Checkbox } from "@/components/ui/checkbox"
import { api } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { FaArrowRight } from "react-icons/fa"
import { toast } from "sonner"
import z from 'zod'

interface NextStep{
  nextStep: () => void
}

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início.',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function Step3({ nextStep }: NextStep){
  const { register, control, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ]
    }
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    name: 'intervals',
    control
  })

  const intervals = watch('intervals')

  const handleSetTimeIntervals = async (data: any) => {
    try{
      const formData = data as TimeIntervalsFormOutput

      const { intervals } = formData
  
      const result = await api.post('/users/intervalos', {
        intervals
      })

      toast.success("criado com sucesso")
    }catch(error: any){
      if(error instanceof AxiosError && error?.response?.data?.message){
        toast.error(error.response.data.message)
        return
      }

      toast.error(error)
    }
  }

  return(
    <div className="mt-6">
      <form onSubmit={handleSubmit(handleSetTimeIntervals)} className="w-full flex flex-col rounded-lg gap-2 bg-gray-800 p-4">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex items-center justify-between px-4 py-3 border border-gray-600 rounded-lg">
              <div className="flex items-center gap-3">
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => {
                    return(
                      <Checkbox onCheckedChange={(checked) => {
                        field.onChange(checked === true)
                      }} 
                      checked={field.value}
                      className="w-5 h-5 bg-gray-900 checked:bg-ignite-500" />
                    )
                  }}
                />
                <span className="text-gray-100">{weekDays[field.weekDay]}</span>
              </div>
              <div className="flex items-center gap-2">
                <input  
                  {...register(`intervals.${index}.startTime`)} 
                  disabled={intervals[index].enabled === false}
                  step={60} 
                  type="time" 
                  className={`bg-gray-900 text-white px-2 py-2 rounded-lg`}
                />
                <input 
                  {...register(`intervals.${index}.endTime`)} 
                  disabled={intervals[index].enabled === false}
                  step={60} 
                  type="time" 
                  className="bg-gray-900 text-white px-2 py-2 rounded-lg" 
                />
              </div>
            </div>
          )
        })}

        {/* TODO: Nao aparece a mensagem */}
        {/* {errors.intervals && <FormError message={errors.intervals.message} />} */}
        {/* {errors.intervals && <span>{errors.intervals.message}</span>} */}

        <Button onClick={nextStep} disabled={isSubmitting} className="text-white bg-ignite-300 text-sm px-2 py-3 font-medium rounded-lg flex gap-2 justify-center items-center">
          <FaArrowRight />
          Próximo passo 
        </Button>
      </form>
    </div>
  )
}