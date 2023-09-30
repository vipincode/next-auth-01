import { NextRequest, NextResponse } from 'next/server'
import schema from './schema'
import prisma from '@/prisma/client'

/**
 * @GET
 */
export async function GET(request: NextRequest) {
  const products = await prisma.user.findMany()
  return NextResponse.json({ data: products })
}

/**
 * @POST
 * Create Product
 */
export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = schema.safeParse(body)
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })
  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  })
  return NextResponse.json({ data: newProduct }, { status: 201 })
}
