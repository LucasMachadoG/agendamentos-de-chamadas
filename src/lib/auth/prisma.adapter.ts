import { Adapter } from "next-auth/adapters";
import { prisma } from "../prisma.connection";
import { cookies } from "next/headers";

export default function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {
      const userIdOnCookies = cookies().get('igniteCallUserId')?.value

      if(!userIdOnCookies){
        throw new Error('UserId not found on cookies')
      }

      console.log(userIdOnCookies + 'TOKENNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN')
      
      const existingUser = await prisma.user.findUnique({
        where: { 
          id: userIdOnCookies
        },
      });

      console.log({
        user: {
          existingUser
        }
      })
  
      if (existingUser) {  
        await prisma.user.update({
          where: {
            id: userIdOnCookies
          },
          data: {
            name: user.name,
            email: user.email,
            image: user.image 
          }
        })

        cookies().delete('igniteCallUserId')

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email || "",
          emailVerified: existingUser.emailVerified,
          username: existingUser.username,
          image: existingUser.image,
        };
      } else {  
        const prismaUser = await prisma.user.create({
          data: {
            id: user.id, 
            name: user.name,
            email: user.email,
            image: user.image,
          },
        });

        cookies().delete('igniteCallUserId')
  
        return {
          id: prismaUser.id,
          name: prismaUser.name,
          email: prismaUser.email || "",
          emailVerified: prismaUser.emailVerified,
          username: prismaUser.username,
          image: prismaUser.image,
        };
      }
    },

    async getUser(id: string) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if(!user){
        return null
      }
    
      return {
        id: user.id,
        name: user.name,
        email: user.email || "", 
        emailVerified: user.emailVerified,
        username: user.username,
        image: user.image,
      };
    },   

    async getUserByEmail(email: string) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if(!user){
        return null
      }
    
      return {
        id: user.id,
        name: user.name,
        email: user.email || "", 
        emailVerified: user.emailVerified,
        username: user.username,
        image: user.image,
      };
    },

    async getUserByAccount({ providerAccountId, provider }: any) {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId
          }
        },
        include: {
          user: true
        }
      })

      if(!account){
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        email: user.email || "", 
        emailVerified: user.emailVerified,
        username: user.username,
        image: user.image,
      };
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          name: user.name,
          email: user.email,
          image: user.image
        }
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email || "", 
        emailVerified: prismaUser.emailVerified,
        username: prismaUser.username,
        image: prismaUser.image,
      };
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state as string
        }
      })
    },

    async createSession({ sessionToken, userId, expires }: any) {
      await prisma.session.create({
        data: {
          userId,
          expires,
          sessionToken
        }
      })

      return {
        userId,
        expires,
        sessionToken
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          sessionToken
        },
        include: {
          user: true
        }
      })

      if(!prismaSession){
        return null
      }

      const { user, ...session } = prismaSession

      return{
        session: {
          userId: session.userId,
          expires: session.expires,
          sessionToken: session.sessionToken
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email || "", 
          emailVerified: user.emailVerified,
          username: user.username,
          image: user.image,
        }
      }
    },


    async updateSession({ sessionToken, userId, expires }: any) {
      const prismaSession = await prisma.session.update({
        where: {
          sessionToken
        },
        data: {
          expires,
          userId
        }
      })

      return {
        sessionToken,
        userId,
        expires
      };
    },

    async deleteSession(sessionToken) {
        await prisma.session.delete({
          where: {
            sessionToken
          }
        })
    },
  };
}
