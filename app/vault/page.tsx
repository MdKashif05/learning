'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BannerBar from '@/components/BannerBar';

const vaultItems = [
  { page: 1, badge: 'badge-green', badgeText: '100% MRR', icon: '📚', title: 'Digital Business Blueprint 2026', desc: '85-page guide detailing modern digital product reselling, organic Instagram Reel marketing, and automation setup.', price: '₹499', format: 'PDF / Canva' },
  { page: 1, badge: 'badge-purple', badgeText: 'PLR Rights', icon: '🤖', title: 'ChatGPT & Claude Master Prompts', desc: '2,500+ tested prompts for copywriting, coding, thumbnail creation, and SEO article generation.', price: '₹799', format: 'Notion / Docs' },
  { page: 2, badge: 'badge-green', badgeText: '100% MRR', icon: '🎨', title: '500+ Editable Reel Templates', desc: 'High quality Canva templates designed for dark mode aesthetic, tech, mindset, and finance creators.', price: '₹699', format: 'Canva Files' },
  { page: 2, badge: 'badge-purple', badgeText: 'PLR Rights', icon: '📊', title: 'Student Productivity Planner', desc: 'Premium Notion study planner, habit tracker, and budget organizer pre-configured for resale.', price: '₹399', format: 'Notion System' },
  { page: 3, badge: 'badge-green', badgeText: '100% MRR', icon: '🖼️', title: 'Instagram Grid Aesthetic Pack', desc: '120+ cohesive Canva feed post layouts designed to give digital brands a clean corporate look.', price: '₹599', format: 'Canva Assets' },
  { page: 3, badge: 'badge-purple', badgeText: 'PLR Rights', icon: '📋', title: 'Freelance Contract & Invoice Suite', desc: 'Professional client agreements, invoice templates, and onboarding forms for digital service providers.', price: '₹899', format: 'Docx / PDF' },
  { page: 4, badge: 'badge-green', badgeText: '100% MRR', icon: '✉️', title: 'Email Marketing Sales Sequence', desc: '7-day high converting email sequence templates designed to convert store leads into buyers automatically.', price: '₹499', format: 'Text Guides' },
  { page: 4, badge: 'badge-purple', badgeText: 'PLR Rights', icon: '🎬', title: 'YouTube Thumbnail Vault', desc: '50+ high CTR Photoshop & Canva thumbnail templates for podcasts, tech reviews, and finance channels.', price: '₹699', format: 'PSD / Canva' },
];

export default function VaultPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const visible = vaultItems.filter(i => i.page === currentPage);

  return (
    <>
      <div className="bg-grid-pattern" />
      <div className="bg-ambient-glow" />
      <BannerBar />
      <Navbar />
      <main>
        <section className="page-header">
          <div className="container">
            <div className="badge-tag">RESELL RIGHTS VAULT</div>
            <h1 className="page-header-title">Done-For-You Digital Products</h1>
            <p className="page-header-subtitle">Download ready-to-sell digital assets with 100% Master Resell Rights (MRR) and PLR licenses. Upload them to your ready-made website and keep 100% of every customer sale.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="card-grid-4">
              {visible.map(item => (
                <div key={item.title} className="content-card">
                  <span className={`badge-tag ${item.badge}`} style={{ width: 'fit-content', marginBottom: '1rem' }}>{item.badgeText}</span>
                  <div className="card-icon">{item.icon}</div>
                  <h3 className="card-title" style={{ fontSize: '1.15rem' }}>{item.title}</h3>
                  <p className="card-desc">{item.desc}</p>
                  <div className="card-footer">
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Suggested Price: {item.price}</span>
                    <span className="badge-tag">{item.format}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="page-link">← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`page-link${currentPage === p ? ' active' : ''}`}>{p}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="page-link">Next →</button>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '2rem', borderRadius: 'var(--radius-lg)', marginTop: '3.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Need Access to the Entire Product Vault?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Get full download access to all 45+ MRR products along with your turnkey ready website.</p>
              <Link href="/pricing" className="btn btn-primary">Unlock Full Vault Access →</Link>
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
