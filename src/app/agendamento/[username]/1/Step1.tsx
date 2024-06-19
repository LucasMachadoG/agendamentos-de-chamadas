'use client'

import Calendar from "@/app/components/Calendar";
import TimePicker from "../components/TimePicker";
import { useState } from "react";
import dayjs from "dayjs";

export default function Step1(){
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isSelectedDate = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const day = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

  return(
    <div className={`bg-gray-800 rounded-lg mt-10 p-5 flex gap-4 ${isSelectedDate ? 'w-[900px]' : ''}`}>
      <div>
        <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      </div>
      {isSelectedDate && 
        <div className="">
          <TimePicker weekDay={weekDay} day={day} />
        </div>
      }
    </div>
  )
}