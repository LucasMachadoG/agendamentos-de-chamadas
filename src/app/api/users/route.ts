import { prisma } from "@/lib/prisma.connection";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, username, name, password } = await req.json()

  const passwordHash = await hash(password, 8)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(userWithSameEmail){
    return NextResponse.json({
      message: "Email já cadastrado.",
    }, {
      status: 409
    })
  }

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
      email,
      username,
      name,
      passwordHash
    }
  })

  const secret = process.env.JWT_SECRET as string

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
