import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma.connection";

const updateProfileBodySchema = z.object({
  bio: z.string().optional()
})

export async function PUT(req: NextRequest){
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Faça login para continuar' }, { status: 401 });
  }

  if (!session.user || !session.user.id) {
    return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 401 });
  }

  const userId: string = session.user.id;

  const requestBody = await req.json();

  const { bio } = updateProfileBodySchema.parse(requestBody)

  console.log(bio)

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      bio
    }
  })

  return NextResponse.json({
    message: 'Perfil atualizado com sucesso!'
  }, {
    status: 200
  })
}
