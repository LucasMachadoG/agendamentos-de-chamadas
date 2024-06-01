import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import getWeekDays from "../utils/get.week.days";

export default function Calendar(){
  const shortWeekDays = getWeekDays({
    short: true
  })

  return (
    <div className="w-[576px] bg-gray-800 rounded-lg p-5 flex flex-col justify-center items-center mt-10">
      <div className="w-full flex justify-between items-center">
        <span className="text-white">Maio <span className="text-gray-200">2024</span></span>
        <div className="flex gap-3 text-gray-200">
          <FaChevronLeft />
          <FaChevronRight />
        </div>
      </div>
      <table className="w-full mt-6">
        <thead>
          <tr className="flex justify-around">
            {shortWeekDays.map((day) => (
              <th className="text-gray-200">
                {day}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  )
}