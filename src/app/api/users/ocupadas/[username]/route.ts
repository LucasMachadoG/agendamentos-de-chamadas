import { prisma } from "@/lib/prisma.connection";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { username: string } }){
  const { username } = params
  const searchParams = new URL(req.url).searchParams;
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  
  if(!year || !month){
    return NextResponse.json({
      message: "Ano ou mês não informados"
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

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      weekDay: true
    }, 
    where: {
      user_id: user.id
    }
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((day) => {
    return !availableWeekDays.some(availableWeekDays => availableWeekDays.weekDay === day)
  })

  const blockedDateRows = await prisma.$queryRaw`
    SELECT *
    FROM scheduling S

    WHERE S.user_id = ${user.id}
    AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
  `

  return NextResponse.json({
    blockedWeekDays
  })

}