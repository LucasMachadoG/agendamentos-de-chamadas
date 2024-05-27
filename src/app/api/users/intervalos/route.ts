import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma.connection";

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
});

export async function POST(req: NextRequest, values: z.infer<typeof timeIntervalsBodySchema>) {
  const session = await auth();

  if (!session) {
    return NextResponse.json('Faça login para continuar', { status: 401 });
  }

  if (!session.user || !session.user.id) {
    return NextResponse.json('Usuário não encontrado', { status: 401 });
  }

  const userId: string = session.user.id;

  const validatedFields = timeIntervalsBodySchema.safeParse(values);

  if (!validatedFields.success) {
    return NextResponse.json({
      message: 'Valores inválidos'
    }, 
    { status: 400 });
  }

  const { intervals } = validatedFields.data;

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: userId
        },
      })
    }),
  )

  return NextResponse.json('Intervalos criados com sucesso', { status: 201 });
}
