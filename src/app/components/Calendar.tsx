'use client'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import getWeekDays from "../utils/get.week.days";
import Button from "./Button";
import { useState } from "react";
import dayjs from 'dayjs'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const backMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  } 

  const nextMonth = () => {
    const previousMonthDate = currentDate.add(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">1</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">2</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">3</td>
          </tr>
          <tr>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">4</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">5</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">6</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">7</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">8</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">9</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">10</td>
          </tr>
          <tr>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">11</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">12</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">13</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">14</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">15</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">16</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">17</td>
          </tr>
          <tr>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">18</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">19</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">20</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">21</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">22</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">23</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">24</td>
          </tr>
          <tr>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">25</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">26</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">27</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">28</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">29</td>
            <td className="p-5 text-white cursor-pointer bg-gray-600 rounded-lg">30</td>
            <td className="p-5 text-white cursor-pointer"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
