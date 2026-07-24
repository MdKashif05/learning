import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Coupon } from '@/lib/models';

export async function GET() {
  await connectDB();
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  return NextResponse.json(coupons);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  try {
    const coupon = await Coupon.create(body);
    return NextResponse.json(coupon, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  await Coupon.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const body = await req.json();
  const updated = await Coupon.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}
