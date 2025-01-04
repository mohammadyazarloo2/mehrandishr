import { NextResponse } from 'next/server'
import Slider from '@/models/Slider'
import { connectMongoDB } from '@/lib/mongodb'

export async function GET() {
  await connectMongoDB()
  
  try {
    const sliders = await Slider.find({ isActive: true }).sort({ order: 1 })
    return NextResponse.json(sliders)
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در دریافت اسلایدرها' },
      { status: 500 }
    )
  }
}
