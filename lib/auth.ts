import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Wholesale',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        })

        if (!user || !user.isWholesale) return null

        const valid = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          isWholesale: user.isWholesale,
          companyName: user.companyName,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.isWholesale = user.isWholesale
        token.companyName = user.companyName
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.isWholesale = token.isWholesale
        session.user.companyName = token.companyName
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
}
