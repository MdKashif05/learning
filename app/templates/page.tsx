'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BannerBar from '@/components/BannerBar';

const templates = [
  { page: 1, badge: 'badge-green', badgeText: 'E-Commerce', statusColor: 'var(--accent-emerald)', status: 'Ready to Deploy', title: 'Digital Product Storefront', desc: 'High-converting digital product store designed for selling eBooks, Canva graphic packs, Notion templates, and software files with instant automatic delivery after checkout.', features: ['Razorpay & UPI Gateway Integration', 'Instant PDF/Zip Download Delivery', 'Mobile Responsive Clean Layout'], plan: 'Included in Pro Plan' },
  { page: 1, badge: 'badge-purple', badgeText: 'Micro-SaaS', statusColor: 'var(--accent-purple)', status: 'High Converting', title: 'AI Tool Landing Suite', desc: 'Modern SaaS website layout designed for offering AI prompts, software tools, or content generator subscriptions with pricing tiers and features checklist.', features: ['Subscription Tier Cards', 'Interactive Feature Tabs', 'SEO Meta Tag Suite Preconfigured'], plan: 'Included in Pro Plan' },
  { page: 2, badge: '', badgeText: 'Agency', statusColor: 'var(--accent-blue)', status: 'Agency Kit', title: 'Growth Agency Hub', desc: 'Sleek agency landing page to offer graphic design, social media management, thumbnail creation, or video editing services with booking forms.', features: ['Lead Inquiry Drawer', 'Client Testimonial Carousel', 'WhatsApp Direct Booking Button'], plan: 'Included in Ultimate Plan' },
  { page: 2, badge: 'badge-green', badgeText: 'Creator', statusColor: 'var(--accent-emerald)', status: 'Fast Mobile', title: 'Creator Bio Link & Store', desc: 'Lightweight link aggregator and store designed for Instagram & TikTok creators to aggregate links and accept product payments in 1 click.', features: ['1-Click Checkout Buttons', 'Fast Mobile Loading (<1s)', 'Social Link List'], plan: 'Included in Starter Plan' },
  { page: 3, badge: 'badge-purple', badgeText: 'Coaching', statusColor: 'var(--accent-purple)', status: 'Turnkey', title: 'Fitness & Coaching Hub', desc: 'Complete landing site for fitness trainers, dietitians, and online coaches to sell workout plans, meal guides, and 1-on-1 consultations.', features: ['Workout & Consultation Tiers', 'Direct Booking Integration', 'Mobile Optimized Layout'], plan: 'Included in Pro Plan' },
  { page: 3, badge: '', badgeText: 'E-Learning', statusColor: 'var(--accent-blue)', status: 'Course Portal', title: 'Course & Workshop Suite', desc: 'Clean educational portal to sell video masterclasses, webinar recordings, and digital workshop tickets with instant access links.', features: ['Module Video Curriculum Grid', 'Instant Student Access Link', 'Certificate Delivery Option'], plan: 'Included in Ultimate Plan' },
];

export default function TemplatesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const visible = templates.filter(t => t.page === currentPage);

  return (
    <>
      <div className="bg-grid-pattern" />
      <div className="bg-ambient-glow" />
      <BannerBar />
      <Navbar />
      <main>
        <section className="page-header">
          <div className="container">
            <div className="badge-tag">WEBSITE CATALOG</div>
            <h1 className="page-header-title">Ready-Made Niche Websites</h1>
            <p className="page-header-subtitle">Fully pre-built website templates designed for instant deployment. Integrated with Razorpay &amp; UPI payment gateways, automated file downloads, and zero coding requirements.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="card-grid-3">
              {visible.map(t => (
                <div key={t.title} className="content-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className={`badge-tag ${t.badge}`}>{t.badgeText}</span>
                    <span style={{ fontWeight: 700, color: t.statusColor }}>{t.status}</span>
                  </div>
                  <h3 className="card-title">{t.title}</h3>
                  <p className="card-desc">{t.desc}</p>
                  <ul style={{ listStyle: 'none', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {t.features.map(f => <li key={f}>✓ {f}</li>)}
                  </ul>
                  <div className="card-footer">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.plan}</span>
                    <Link href="/pricing" className="btn btn-primary btn-sm">Get Template</Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="page-link">← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`page-link${currentPage === p ? ' active' : ''}`}>{p}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="page-link">Next →</button>
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
