import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Coupon } from '@/lib/models';

// Validate a coupon code – used on the public pricing page
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 });

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    active: true,
    expiryDate: { $gte: new Date() },
  });

  if (!coupon) {
    return NextResponse.json({ valid: false, message: 'Invalid or expired coupon' });
  }

  return NextResponse.json({
    valid: true,
    discount: coupon.discount,
    code: coupon.code,
  });
}
