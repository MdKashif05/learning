import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Course } from '@/lib/models';

export async function GET() {
  await connectDB();
  const courses = await Course.find().sort({ createdAt: -1 });
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  try {
    const course = await Course.create(body);
    return NextResponse.json(course, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await Course.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const body = await req.json();
  const updated = await Course.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
