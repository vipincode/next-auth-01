import { NextRequest, NextResponse } from 'next/server'
import schema from '../schema'
import prisma from '@/prisma/client'

/**
 * @GET
 * Get all users
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Fetch data from database
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  })
  // If not found, return 404 error
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  // Else return data
  return NextResponse.json({ data: user })
}

/**
 * @PUT
 * Update user by id
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  // Validate request body
  const validation = schema.safeParse(body)
  // If invalid return 400
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })
  // Fetch the user with given id
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  })
  // If does not exist, return 404
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  // Update the user in database
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: {
      name: body.name,
      email: body.email,
    },
  })
  // Return the updated users
  return NextResponse.json({ data: updatedUser })
}

/**
 * @DELETE
 * Delete user by id
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Fetch the user with given id
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  })
  // If not found, return 404
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  // Delete the user
  await prisma.user.delete({
    where: { id: parseInt(params.id) },
  })
  // Return 200 response
  return NextResponse.json({})
}
