import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BannerBar from '@/components/BannerBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'budget learning.in | Launch, Sell & Grow Your Online Business',
  description: 'budget learning helps students, creators, and beginners launch their online business with ready-made websites, digital resell products, and step-by-step training.',
};

export default function HomePage() {
  return (
    <>
      <div className="bg-grid-pattern" />
      <div className="bg-ambient-glow" />
      <BannerBar />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="section" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', textAlign: 'center' }}>
          <div className="container">
            <div className="badge-tag" style={{ marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--accent-emerald)' }}>●</span> TURNKEY ONLINE BUSINESS PLATFORM
            </div>
            <h1 className="page-header-title" style={{ fontSize: '3.75rem', maxWidth: 900, margin: '0 auto 1.25rem auto' }}>
              Launch. Sell. Grow.<br />
              <span style={{ color: 'var(--accent-blue)' }}>Start Earning Online with Minimal Setup.</span>
            </h1>
            <p className="page-header-subtitle" style={{ marginBottom: '2.25rem' }}>
              budget learning helps students, creators, and beginners launch their own online business by providing ready-made websites, digital products with resell rights, step-by-step training, and turnkey tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/templates" className="btn btn-primary btn-lg">Explore Ready-Made Sites →</Link>
              <Link href="/pricing" className="btn btn-secondary btn-lg">View Pricing &amp; Plans</Link>
            </div>
          </div>
        </section>

        {/* Value Pillars */}
        <section className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container">
            <div className="section-header">
              <div className="badge-tag">EVERYTHING INCLUDED</div>
              <h2 className="section-title">All-in-One Turnkey Ecosystem</h2>
              <p className="section-subtitle">No coding skills required. We provide complete pre-built infrastructure so you focus on selling and keeping 100% profits.</p>
            </div>
            <div className="card-grid-4">
              {[
                { icon: '🌐', title: 'Ready-Made Websites', desc: 'Fully configured niche templates with automated UPI payment integration, mobile-first design, and instant file downloads.', link: '/templates', cta: 'Browse Templates' },
                { icon: '📦', title: 'Resell Rights Vault', desc: 'Instant access to eBooks, AI prompt packs, Canva graphic templates, and Notion organizers with 100% Master Resell Rights (MRR).', link: '/vault', cta: 'View Vault' },
                { icon: '🎓', title: 'Step-by-Step Training', desc: 'Clear video modules teaching social media marketing, Instagram Reel organic traffic strategies, domain setup, and payment routing.', link: '/training', cta: 'View Modules' },
                { icon: '💰', title: 'Keep 100% Profits', desc: 'Zero revenue sharing or monthly royalties. Every payment made by your customers goes directly into your bank account.', link: '/pricing', cta: 'Get Started' },
              ].map(item => (
                <div key={item.title} className="content-card">
                  <div className="card-icon">{item.icon}</div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>
                  <div className="card-footer">
                    <Link href={item.link} style={{ color: 'var(--accent-blue)', fontWeight: 700, textDecoration: 'none' }}>{item.cta} →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="badge-tag">POPULAR TEMPLATES</div>
              <h2 className="section-title">Ready-to-Launch Websites</h2>
              <p className="section-subtitle">Choose a pre-built website in your chosen niche and start accepting customer orders in under 24 hours.</p>
            </div>
            <div className="card-grid-3">
              <div className="content-card">
                <span className="badge-tag badge-green" style={{ width: 'fit-content', marginBottom: '1rem' }}>E-Commerce</span>
                <h3 className="card-title">Digital Product Storefront</h3>
                <p className="card-desc">Ultra-fast digital shop layout configured for eBook sales, Canva assets, and instant download delivery with Razorpay/UPI.</p>
                <div className="card-footer">
                  <span style={{ fontWeight: 700 }}>Turnkey Ready</span>
                  <Link href="/templates" className="btn btn-secondary btn-sm">Preview Site</Link>
                </div>
              </div>
              <div className="content-card">
                <span className="badge-tag badge-purple" style={{ width: 'fit-content', marginBottom: '1rem' }}>Micro-SaaS</span>
                <h3 className="card-title">AI Tool Landing Suite</h3>
                <p className="card-desc">Modern SaaS website layout featuring credit plans, prompt libraries, feature breakdowns, and subscription pricing tables.</p>
                <div className="card-footer">
                  <span style={{ fontWeight: 700 }}>High Converting</span>
                  <Link href="/templates" className="btn btn-secondary btn-sm">Preview Site</Link>
                </div>
              </div>
              <div className="content-card">
                <span className="badge-tag" style={{ width: 'fit-content', marginBottom: '1rem' }}>Creator Hub</span>
                <h3 className="card-title">Superlink Bio &amp; Store</h3>
                <p className="card-desc">All-in-one bio link store for Instagram &amp; YouTube creators to aggregate links and sell digital products directly.</p>
                <div className="card-footer">
                  <span style={{ fontWeight: 700 }}>Mobile Optimized</span>
                  <Link href="/templates" className="btn btn-secondary btn-sm">Preview Site</Link>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/templates" className="btn btn-primary">View All Website Templates →</Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section" style={{ background: 'var(--gradient-brand)', color: '#ffffff', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
              Ready to Start Your Digital Business Today?
            </h2>
            <p style={{ fontSize: '1.15rem', maxWidth: 600, margin: '0 auto 2rem auto', opacity: 0.95 }}>
              Get your ready-made website, digital product vault, and step-by-step training setup for a single one-time payment.
            </p>
            <Link href="/pricing" className="btn btn-secondary btn-lg" style={{ background: '#ffffff', color: 'var(--text-main)', border: 'none' }}>
              View Pricing Plans &amp; Get Started
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
