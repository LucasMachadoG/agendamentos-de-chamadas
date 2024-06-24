import { prisma } from "@/lib/prisma.connection";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { username: string } }){
  const { username } = params
  const searchParams = new URL(req.url).searchParams;
  const date = searchParams.get('date');

  if(!date){
    return NextResponse.json({
      message: "Data não informada"
    }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(!user){
    return NextResponse.json({
      message: "Usuario não encontrado"
    }, { status: 404 })
  }

  const referenceDate = dayjs(String(date))

  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if(isPastDate){
    return NextResponse.json({
      possibleTimes: [],
      availableTimes: []
    })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      weekDay: referenceDate.get('day')
    }
  })

  if(!userAvailability){
    return NextResponse.json({
      possibleTimes: [],
      availableTimes: []
    })
  }

  const { timeStartInMinutes, timeEndInMinutes } = userAvailability

  const startHour = timeStartInMinutes / 60
  const endtHour = timeEndInMinutes / 60

  const possibleTimes = Array.from({ length: endtHour - startHour }).map((_, index) => {
    return startHour + index
  })

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endtHour).toDate()
      }
    }
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(blockedTime => blockedTime.date.getHours() === time)

    const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

    return !isTimeBlocked && !isTimeInPast
  })

  return NextResponse.json({
    possibleTimes,
    availableTimes
  })

}