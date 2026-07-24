'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BannerBar from '@/components/BannerBar';

const plans = [
  {
    id: 'starter',
    name: 'Starter Kit',
    subtitle: 'Ideal for students starting out',
    price: 999,
    features: ['1 Ready-Made Creator Bio Store', '10 Included MRR Products', 'Step-by-Step Setup Video Guide', 'Keep 100% Sales Profits'],
    cta: 'Select Starter Plan',
    featured: false,
    href: '/contact?plan=Starter',
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    subtitle: 'Complete turnkey business suite',
    price: 1499,
    features: ['1 Ready-Made E-Commerce / SaaS Site', '45+ Digital Resell Vault Access', 'Full 4-Module Launch Curriculum', 'Razorpay & UPI Payment Integration', 'Priority Email & WhatsApp Support'],
    cta: 'Get Pro Creator Suite',
    featured: true,
    href: '/contact?plan=ProCreator',
  },
  {
    id: 'agency',
    name: 'Ultimate Agency',
    subtitle: 'For scaling full agency operations',
    price: 2999,
    features: ['All Website Templates Included', 'Complete Source Code & License', '1-on-1 Setup Assistance', 'Lifetime Updates & New Assets'],
    cta: 'Select Agency Plan',
    featured: false,
    href: '/contact?plan=UltimateAgency',
  },
];

export default function PricingPage() {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [applying, setApplying] = useState(false);

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    setApplying(true);
    setCouponMsg('');
    try {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(couponCode)}`);
      const data = await res.json();
      if (data.valid) {
        setDiscount(data.discount);
        setCouponMsg(`✅ Coupon "${data.code}" applied! ${data.discount}% off all plans.`);
      } else {
        setDiscount(0);
        setCouponMsg('❌ ' + data.message);
      }
    } catch {
      setCouponMsg('❌ Failed to validate coupon.');
    }
    setApplying(false);
  }

  function discountedPrice(price: number) {
    return discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
  }

  return (
    <>
      <div className="bg-grid-pattern" />
      <div className="bg-ambient-glow" />
      <BannerBar />
      <Navbar />

      <main>
        <section className="page-header">
          <div className="container">
            <div className="badge-tag">TRANSPARENT PRICING</div>
            <h1 className="page-header-title">Simple One-Time Investment</h1>
            <p className="page-header-subtitle">
              No monthly subscriptions, hidden fees, or royalty commissions. Pay once and keep 100% revenue on every sale you generate.
            </p>
          </div>
        </section>

        {/* Coupon Box */}
        <section style={{ paddingTop: '2rem' }}>
          <div className="container">
            <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', border: '1px solid var(--border-light)', borderRadius: 12, padding: '1.25rem 1.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>🏷️ Have a coupon code?</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  style={{ flex: 1, padding: '0.7rem 1rem', border: '1px solid var(--border-light)', borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: 'var(--text-main)' }}
                />
                <button onClick={applyCoupon} disabled={applying} style={{ padding: '0.7rem 1.25rem', background: 'var(--gradient-brand)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                  {applying ? '...' : 'Apply'}
                </button>
              </div>
              {couponMsg && <p style={{ marginTop: '0.65rem', fontSize: '0.875rem', fontWeight: 600, color: couponMsg.startsWith('✅') ? '#16a34a' : '#dc2626' }}>{couponMsg}</p>}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="pricing-grid">
              {plans.map(plan => (
                <div key={plan.id} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
                  {plan.featured && <div className="pricing-badge">MOST POPULAR</div>}
                  <h3 className="pricing-plan-name">{plan.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{plan.subtitle}</p>
                  <div className="pricing-price">
                    ₹{discountedPrice(plan.price).toLocaleString()}
                    <span> / one-time</span>
                    {discount > 0 && (
                      <div style={{ fontSize: '0.875rem', color: '#94a3b8', textDecoration: 'line-through', fontWeight: 400 }}>
                        ₹{plan.price.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <ul className="feature-list">
                    {plan.features.map(f => (
                      <li key={f} className="feature-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href} className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`} style={{ marginTop: 'auto' }}>
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <div>© 2026 budget learning.in. All Rights Reserved. Operated under <strong>Eclipse Private Limited</strong>.</div>
            <div><Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Back to Home ↑</Link></div>
          </div>
        </div>
      </footer>
    </>
  );
}
