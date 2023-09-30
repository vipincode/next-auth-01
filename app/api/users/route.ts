import { NextRequest, NextResponse } from 'next/server'
import schema from './schema'
import prisma from '@/prisma/client'

/**
 * @GET
 */
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany()
  return NextResponse.json({ data: users })
}

/**
 * @POST
 */
export async function POST(request: NextRequest) {
  const body = await request.json()
  // Validate body
  const validation = schema.safeParse(body)
  // If invalid, return 400
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 404 })
  }
  // Create user
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  })

  if (user) return NextResponse.json({ error: 'User already exist' }, { status: 400 })

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  })
  // Else return
  return NextResponse.json({ data: newUser }, { status: 201 })
}
