import { prisma } from "@/lib/prisma.connection";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest){
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(!user){
    return NextResponse.json({
      message: "Credenciais inválidas.",
    }, {
      status: 404
    })
  }

  if(!user?.passwordHash){
    return NextResponse.json({
      message: "Credenciais inválidas",
    }, {
      status: 404
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

  if(!isPasswordValid){
    return NextResponse.json({
      message: "Credenciais inválidas.",
    }, {
      status: 404
    })
  }

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
    token
  }, { status: 200 });
}