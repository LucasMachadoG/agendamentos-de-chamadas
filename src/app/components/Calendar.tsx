'use client'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import getWeekDays from "../utils/get.week.days";
import Button from "./Button";
import { useEffect, useMemo, useState } from "react";
import dayjs from 'dayjs'
import { api } from "@/lib/axios";

interface CalendarWeek {
  week: number,
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
  username: string
}

export default function Calendar({ selectedDate, onDateSelected, username }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const [blockedWeekDays, setBlockedWeekDays] = useState<number[]>([])
  const [blockedDates, setBlockedDates] = useState<number[]>([])

  useEffect(() => {
    api.get(`/users/ocupadas/${username}`, {
      params: {
        year: currentDate.get('year'),
        month: currentDate.get('month') + 1
      }
    }).then((response) => {
      setBlockedWeekDays(response.data.blockedWeekDays)
      setBlockedDates(response.data.blockedDates)
    })
  }, [currentDate, username])

  const backMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  } 

  const nextMonth = () => {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonth = Array.from({
      length: currentDate.daysInMonth()
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonth = Array.from({
      length: firstWeekDay
    }).map((_, index) => {
      return currentDate.subtract(index + 1, 'day')
    }).reverse()

    const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth())
    const lastWeekDay = lastDayInCurrentMonth.get('day')
    
    const nextMonth = Array.from({
      length: 7 - (lastWeekDay + 1)
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    })

    const calendarDays = [
      ...previousMonth.map(date => {
        return { date, disabled: true }
      }),
      ...daysInMonth.map(date => {
        return { date, disabled: date.endOf('day').isBefore(new Date()) || blockedWeekDays.includes(date.day()) || blockedDates.includes(date.date()) }
      }),
      ...nextMonth.map(date => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedWeekDays, blockedDates])

  const shortWeekDays = getWeekDays({ short: true });

  return (
    <div className="w-[576px] bg-gray-800 rounded-lg flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <span className="text-white capitalize">{currentMonth} <span className="text-gray-200">{currentYear}</span></span>
        <div className="flex gap-5 text-gray-200">
          <Button onClick={backMonth} className="hover:text-gray-100 transition duration-300">
            <FaChevronLeft />
          </Button>
          <Button onClick={nextMonth} className="hover:text-gray-100 transition duration-300">
            <FaChevronRight />
          </Button>
        </div>
      </div>
      <table className="w-full mt-6 table-fixed border-spacing-2 border-separate">
        <thead>
          <tr>
            {shortWeekDays.map((day) => (
              <th key={day} className="text-gray-200 font-medium p-2">
                {day}.
              </th> 
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  const isSelected = selectedDate && dayjs(selectedDate).isSame(date, 'day');
                  return (
                    <td key={date.toString()} className="">
                      <Button 
                        onClick={() => onDateSelected(date.toDate())}
                        className={`p-5 hover:bg-gray-500 transition-colors text-white cursor-pointer rounded-lg w-full
                          ${isSelected ? 'bg-gray-500' : 'bg-gray-600'}`}
                        disabled={disabled}>{date.date()}
                      </Button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
