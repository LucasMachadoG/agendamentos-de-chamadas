import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma.connection";

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number().min(0).max(6),
      timeStartInMinutes: z.number().min(0).max(1439),
      timeEndInMinutes: z.number().min(0).max(1439),
    })
  )
});

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Faça login para continuar' }, { status: 401 });
  }

  if (!session.user || !session.user.id) {
    return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 401 });
  }

  const userId: string = session.user.id;

  const requestBody = await req.json();

  const validatedFields = timeIntervalsBodySchema.safeParse(requestBody);

  if (!validatedFields.success) {
    console.log('Validation Errors:', validatedFields.error);
    return NextResponse.json({
      message: 'Valores inválidos',
      errors: validatedFields.error.errors
    }, { status: 400 });
  }

  const { intervals } = validatedFields.data;

  try {
    await Promise.all(
      intervals.map((interval) =>
        prisma.userTimeInterval.create({
          data: {
            weekDay: interval.weekDay,
            timeStartInMinutes: interval.timeStartInMinutes,
            timeEndInMinutes: interval.timeEndInMinutes,
            user_id: userId,
          },
        })
      )
    );

    return NextResponse.json({ message: 'Intervalos criados com sucesso' }, { status: 201 });
  } catch (error) {
    console.error('Error creating intervals:', error); 
    return NextResponse.json({ message: 'Erro ao criar intervalos' }, { status: 500 });
  }
}
