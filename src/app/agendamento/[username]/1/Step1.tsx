'use client'

import Calendar from "@/app/components/Calendar";
import TimePicker from "../components/TimePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { api } from "@/lib/axios";

interface Step1Props {
  username: string
}

export interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export default function Step1({ username }: Step1Props){
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const isSelectedDate = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const day = selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

  useEffect(() => {
    if(!selectedDate){
      return
    }

    api.get(`/users/agendamento/${username}`, {
      params: {
        date: dayjs(selectedDate).format('YYYY-MM-DD')
      }
    }).then((response) => {
      setAvailability(response.data)
    })
  }, [selectedDate, username])

  return(
    <div className={`bg-gray-800 rounded-lg mt-10 p-5 flex gap-4 ${isSelectedDate ? 'w-[900px]' : ''}`}>
      <div>
        <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      </div>
      {isSelectedDate && 
        <div className="w-full">
          <TimePicker availability={availability} weekDay={weekDay} day={day} />
        </div>
      }
    </div>
  )
}