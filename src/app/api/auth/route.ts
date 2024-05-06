import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user, account }: { user: any, account: any }){
      if(account.providers === 'google'){
        try{
          const { name, email } = user

        }catch(error: any){
          console.log(error)
        }
      }

      return user
    }
  }
})

export { handler as GET, handler as POST }