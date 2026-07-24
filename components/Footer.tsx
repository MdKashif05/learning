import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-title">budget learning<span style={{ color: 'var(--accent-blue)' }}>.in</span></div>
            <div className="footer-company-tag">Eclipse Private Limited (Temporary Name)</div>
            <p className="footer-desc">
              budget learning helps students, creators, and beginners launch their own online business with ready-made websites, digital products, and step-by-step tools.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/templates">Ready-Made Sites</Link></li>
              <li><Link href="/vault">Digital Vault</Link></li>
              <li><Link href="/training">Training Roadmap</Link></li>
              <li><Link href="/pricing">Pricing Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Company & Support</h4>
            <ul className="footer-links">
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/contact">Office Location</Link></li>
              <li><Link href="/contact">WhatsApp Support</Link></li>
              <li><Link href="/contact">Email Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Social Media</h4>
            <ul className="footer-links">
              <li><span style={{ color: '#94a3b8' }}>Instagram: Coming Soon</span></li>
              <li><span style={{ color: '#94a3b8' }}>YouTube: Coming Soon</span></li>
              <li><span style={{ color: '#94a3b8' }}>LinkedIn: Coming Soon</span></li>
              <li><span style={{ color: '#94a3b8' }}>X (Twitter): Coming Soon</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 budget learning.in. All Rights Reserved. Operated under <strong>Eclipse Private Limited</strong>.</div>
          <div>Location: Currently Remote / India</div>
        </div>
      </div>
    </footer>
  );
}
