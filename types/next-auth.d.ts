import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      isWholesale: boolean
      companyName: string
    }
  }

  interface User {
    isWholesale: boolean
    companyName: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isWholesale: boolean
    companyName: string
  }
}
