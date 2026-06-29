import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as readline from 'readline'

const prisma = new PrismaClient()

async function ask(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function main() {
  console.log('\n── Jackson Pottery · Wholesale Account Manager ──\n')

  const email       = await ask('Email address: ')
  const companyName = await ask('Company name: ')
  const password    = await ask('Password: ')

  if (!email || !companyName || !password) {
    console.error('All fields are required.')
    process.exit(1)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where:  { email: email.toLowerCase() },
    update: { hashedPassword, companyName },
    create: {
      email: email.toLowerCase(),
      hashedPassword,
      companyName,
      isWholesale: true,
    },
  })

  console.log(`\n✓ Wholesale account ready: ${user.email} (${user.companyName})\n`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
