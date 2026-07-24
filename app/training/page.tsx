import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BannerBar from '@/components/BannerBar';

export default function TrainingPage() {
  return (
    <>
      <div className="bg-grid-pattern" />
      <div className="bg-ambient-glow" />
      <BannerBar />
      <Navbar />
      <main>
        <section className="page-header">
          <div className="container">
            <div className="badge-tag">STEP-BY-STEP CURRICULUM</div>
            <h1 className="page-header-title">Zero Coding Launch Training</h1>
            <p className="page-header-subtitle">Beginner-friendly video modules guiding you through setting up your website domain, linking payment gateways, and acquiring your first paying customers.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="timeline-list">
              {[
                { num: 1, badge: 'badge-green', label: 'Module 01', title: 'Domain Linking & Site Setup', desc: 'Learn how to map your custom domain (e.g. yourbrand.com) or use our free subdomain routing without writing a single line of code.' },
                { num: 2, badge: 'badge-purple', label: 'Module 02', title: 'Payment Gateway Routing (Razorpay & UPI)', desc: 'Connect your bank account, Razorpay API key, or UPI QR code so payments made on your site deposit 100% funds straight into your account.' },
                { num: 3, badge: '', label: 'Module 03', title: 'Uploading Resell Products & Pricing', desc: 'Select eBooks, Canva templates, or prompt packs from your included Digital Vault, set custom prices, and enable automated file delivery.' },
                { num: 4, badge: 'badge-green', label: 'Module 04', title: 'Organic Social Media Traffic Playbook', desc: 'Master Instagram Reel & YouTube Shorts hook formulas to generate daily traffic and convert viewers into paying digital product customers.' },
              ].map(step => (
                <div key={step.num} className="timeline-card">
                  <div className="timeline-step-num">{step.num}</div>
                  <div>
                    <span className={`badge-tag ${step.badge}`} style={{ marginBottom: '0.5rem' }}>{step.label}</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: '0.35rem 0' }}>{step.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <Link href="/pricing" className="btn btn-primary btn-lg">Get Full Training Access →</Link>
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
