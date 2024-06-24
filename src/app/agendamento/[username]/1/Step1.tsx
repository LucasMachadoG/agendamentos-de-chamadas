'use client'

import Calendar from "@/app/components/Calendar";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import Button from "@/app/components/Button";

interface Step1Props {
  username: string
  onSelectDateTime: (date: Date) => void
}

export interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export default function Step1({ username, onSelectDateTime }: Step1Props){
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

  const handleSelectTime = (hour: number) => {
    const dateTime = dayjs(selectedDate).set('hour', hour).startOf('hour').toDate()

    onSelectDateTime(dateTime)
  }

  return(
    <div className={`bg-gray-800 rounded-lg mt-10 p-5 flex gap-4 ${isSelectedDate ? 'w-[900px]' : ''}`}>
      <div>
        <Calendar username={username} selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      </div>
      {isSelectedDate && 
        <div className="w-full flex flex-col items-start">
          <p className="text-white text-base">{weekDay}, <span className="text-gray-200 text-base">{day}</span></p>
          <div className="w-full flex flex-col mt-4 gap-2 overflow-y-auto max-h-auto">
            {availability?.possibleTimes.map((hour) => {
              return (
                <Button 
                  key={hour} 
                  disabled={!availability.availableTimes.includes(hour)} 
                  className="w-full bg-gray-600 hover:bg-gray-500 transition-colors text-white p-3 text-sm rounded-lg"
                  onClick={() => handleSelectTime(hour)}
                >  
                  {String(hour).padStart(2, '0')}:00h
                </Button>
              )
            })}
        </div>
       </div>
      }
    </div>
  )
}