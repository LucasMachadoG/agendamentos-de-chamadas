import { prisma } from "@/lib/prisma.connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  const searchParams = new URL(req.url).searchParams;
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  if (!year || !month) {
    return NextResponse.json({
      message: "Ano ou mês não informados"
    }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });

  if (!user) {
    return NextResponse.json({
      message: "Usuário não encontrado"
    }, { status: 404 });
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      weekDay: true
    },
    where: {
      user_id: user.id
    }
  });

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((day) => {
    return !availableWeekDays.some(availableWeekDays => availableWeekDays.weekDay === day);
  });

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTI."timeEndInMinutes" - UTI."timeStartInMinutes") / 60) AS size
    FROM scheduling S
    LEFT JOIN user_time_intervals UTI
      ON UTI."weekDay" = EXTRACT(DOW FROM S.date)
    WHERE S.user_id = ${user.id}
      AND TO_CHAR(S.date, 'YYYY-MM') = ${`${year}-${month}`}
    GROUP BY EXTRACT(DAY FROM S.date),
      ((UTI."timeEndInMinutes" - UTI."timeStartInMinutes") / 60)
    HAVING COUNT(S.date) >= ((UTI."timeEndInMinutes" - UTI."timeStartInMinutes") / 60)
  `;

  const blockedDates = blockedDatesRaw.map((item) => item.date);

  return NextResponse.json({
    blockedWeekDays,
    blockedDates
  });
}
