import { prisma } from "@/lib/prisma.connection";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { username, name } = await req.json()

  const userWithSameUsername = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(userWithSameUsername){
    return NextResponse.json({
      message: "Username já cadastrado.",
    }, {
      status: 409
    })
  }

  const user = await prisma.user.create({
    data: {
      username,
      name
    }
  })

  cookies().set('@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/'
  })

  return NextResponse.json(user, { status: 201 });
}
