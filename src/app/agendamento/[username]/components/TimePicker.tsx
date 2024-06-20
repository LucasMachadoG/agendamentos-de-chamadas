import Button from "@/app/components/Button";
import { Availability } from "../1/Step1";

interface TimePickerProps{
  weekDay: string | null
  day: string | null
  availability: Availability | null
}

export default function TimePicker({ weekDay, day, availability }: TimePickerProps){
  return(
    <div className="w-full flex flex-col items-start">
      <p className="text-white text-base">{weekDay}, <span className="text-gray-200 text-base">{day}</span></p>
      <div className="w-full flex flex-col mt-4 gap-2 overflow-y-auto max-h-auto">
        {availability?.possibleTimes.map((hour) => {
          return (
            <Button key={hour} disabled={!availability.availableTimes.includes(hour)} className="w-full bg-gray-600 hover:bg-gray-500 transition-colors text-white p-3 text-sm rounded-lg">{String(hour).padStart(2, '0')}:00h</Button>
          )
        })}
      </div>
    </div>
  )
}
