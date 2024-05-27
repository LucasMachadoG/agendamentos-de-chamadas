import { prisma } from "@/lib/prisma.connection";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserByUsername } from "@/data/user";

export async function POST(req: NextRequest) {
  const { username, name } = await req.json()

  const userWithSameUsername = await getUserByUsername(username)

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
      name,
    }
  })

  cookies().set('igniteCallUserId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/'
  })

  return NextResponse.json({
    user,
  }, { status: 201 });
}
