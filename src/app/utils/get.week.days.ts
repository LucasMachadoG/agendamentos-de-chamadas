import { date } from "zod"

export default function getWeekDays(){
  const formatter = new Intl.DateTimeFormat('pt-br', {weekday: 'long'})

  return Array.from(Array(7).keys()).map((day) => formatter.format(new Date(Date.UTC(2021, 5, day)))).map((weekDay) => {
    return weekDay.substring(0, 1).toLocaleUpperCase().concat(weekDay.substring(1))
  })
}