import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Banner } from '@/lib/models';

export async function GET() {
  await connectDB();
  const banners = await Banner.find().sort({ createdAt: -1 });
  return NextResponse.json(banners);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  try {
    const banner = await Banner.create(body);
    return NextResponse.json(banner, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await Banner.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const body = await req.json();
  const updated = await Banner.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
