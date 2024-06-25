import { getUserByUsername } from "@/app/data/user";
import { getGoogleOAuthToken } from "@/lib/google";
import { prisma } from "@/lib/prisma.connection";
import dayjs from "dayjs";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const confirmSchedulingBodySchema = z.object({
  name: z.string(),
  email: z.string().email({
    message: "Informe o email"
  }),
  observacoes: z.optional(z.string()),
  date: z.string().datetime()
})

export async function POST(req: NextRequest, { params }: { params: { username: string } }){
  const { username } = params

  const user = await getUserByUsername(username)

  if(!user){
    return NextResponse.json({
      message: "Usuário não encontrado"
    }, { status: 404 })
  }
  
  const requestBody = await req.json()

  const validatedFields = confirmSchedulingBodySchema.safeParse(requestBody)

  if(!validatedFields.success){
    return NextResponse.json({
      message: "Erro de validação"
    }, { status: 400 })
  }

  const { name, email, observacoes, date } = validatedFields.data

  const schedulingDate = dayjs(date).startOf('hour')

  if(schedulingDate.isBefore(new Date())){
    return NextResponse.json({
      message: "Data já esta no passado"
    }, { status: 400 })
  }

  const conflictScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate()
    }
  })

  if(conflictScheduling){
    return NextResponse.json({
      message: "Data indiponivel"
    }, { status: 400 })
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      name: name,
      email: email,
      oberservations: observacoes,
      date: schedulingDate.toDate(),
      user_id: user.id
    }
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id)
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Agendamentos: ${name}`,
      description: observacoes,
      start: {
        dateTime: schedulingDate.format()
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format()
      },
      attendees: [
        { email, displayName: name }
      ],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    }
  })

  return NextResponse.json({}, { status: 201 })
}