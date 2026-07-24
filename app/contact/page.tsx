'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BannerBar from '@/components/BannerBar';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', plan: 'Pro Creator', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
            <div className="badge-tag">GET IN TOUCH</div>
            <h1 className="page-header-title">Contact &amp; Support</h1>
            <p className="page-header-subtitle">Have questions about setting up your ready-made website or accessing the digital vault? We're here to help.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <span className="badge-tag badge-purple" style={{ marginBottom: '1rem' }}>COMPANY DETAILS</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>Eclipse Private Limited</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  (Temporary registered name – to be updated upon official registration process completion.)
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { icon: '✉️', label: 'Email Support (Temporary)', value: 'support@yourdomain.com', highlight: true },
                    { icon: '💬', label: 'WhatsApp Business Support', value: 'To be added (Active during operating hours)', highlight: false },
                    { icon: '📍', label: 'Office Location', value: 'Currently Remote / India (Official office address updating soon)', highlight: false },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div className="card-icon" style={{ marginBottom: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.label}</div>
                        <div style={{ color: item.highlight ? 'var(--accent-blue)' : 'var(--text-muted)', fontSize: '0.95rem' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-form-box">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem' }}>Send an Inquiry Message</h3>
                {!submitted ? (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" placeholder="e.g. Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-input" placeholder="e.g. rahul@gmail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp Number</label>
                      <input type="tel" className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Selected Plan or Inquiry</label>
                      <select className="form-select" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}>
                        <option>Pro Creator Plan (₹1,499)</option>
                        <option>Starter Kit (₹999)</option>
                        <option>Ultimate Agency (₹2,999)</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Your Message</label>
                      <textarea className="form-textarea" rows={4} placeholder="How can we help you launch your website?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Inquiry →</button>
                  </form>
                ) : (
                  <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid var(--accent-emerald)', color: 'var(--accent-emerald)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontWeight: 700 }}>
                    Thank you! Your message has been received. Our team will contact you shortly.
                  </div>
                )}
              </div>
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
