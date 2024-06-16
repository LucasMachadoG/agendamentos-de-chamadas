import getUserById, { getUserByEmail } from "@/app/data/user"
import PrismaAdapter from "@/lib/auth/prisma.adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import google from "next-auth/providers/google"

const prisma = new PrismaClient()
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(),
  session: {
    strategy: 'jwt'
  },
  events: {
    async linkAccount({ user }){
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account, user}){
      if(!account?.scope?.includes('https://www.googleapis.com/auth/calendar')){
        return '/cadastrar/?error=permissions'
      }

      if(!user){
        return false
      }

      return true
    },
    async session({ token, session }){
      if(token.sub && session.user){
        session.user.id = token.sub
        session.user.image = token.picture 
        session.user.username = token.username
        session.user.bio = token.bio
      }

      return session
    },
    async jwt({ token, user }){
      if(user){
        token.picture = user.image
        return token
      } else {
        const dbUser = await getUserById(token.sub)
        token.picture = dbUser?.image || null
        token.username = dbUser?.username
        token.bio = dbUser?.bio
      }

      return token
    }
  },
})