import { prisma } from "@/lib/prisma.connection";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

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

  const secret = process.env.JWT_SECRET || ""

  const token = await sign({
    username: user.username,
    id: user.id
  }, secret, {expiresIn: '7d'})

  cookies().set('@ignitecall:userId', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/'
  })

  return NextResponse.json({
    user,
    token
  }, { status: 201 });
}
