import Button from "@/app/components/Button"
import getWeekDays from "@/app/utils/get.week.days"
import { Checkbox } from "@/components/ui/checkbox"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { FaArrowRight } from "react-icons/fa"
import z from 'zod'

interface NextStep{
  nextStep: () => void
}

const timeIntervalsFormSchema = z.object({

})

export default function Step3({ nextStep }: NextStep){
  const { register, control, watch, handleSubmit, formState: {
    isSubmitting,
    errors
  } } = useForm({
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

  const handleSetTimeIntervals = () => {

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
        <Button onClick={nextStep} className="text-white bg-ignite-300 text-sm px-2 py-3 font-medium rounded-lg flex gap-2 justify-center items-center">
          <FaArrowRight />
          Próximo passo
        </Button>
      </form>
    </div>
  )
}