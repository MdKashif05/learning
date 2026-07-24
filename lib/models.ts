import mongoose, { Schema, model, models } from 'mongoose';

// Coupon
const CouponSchema = new Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount: { type: Number, required: true, min: 1, max: 100 },
  expiryDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
  usageLimit: { type: Number, default: 0 },
  usedCount: { type: Number, default: 0 },
}, { timestamps: true });

// Banner
const BannerSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  ctaText: { type: String, default: 'Learn More' },
  ctaLink: { type: String, default: '/pricing' },
  bgColor: { type: String, default: '#2563eb' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

// Course
const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  imageUrl: { type: String, default: '' },
  category: { type: String, default: 'General' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Coupon = models.Coupon || model('Coupon', CouponSchema);
export const Banner = models.Banner || model('Banner', BannerSchema);
export const Course = models.Course || model('Course', CourseSchema);
