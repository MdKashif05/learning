'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/templates', label: 'Ready-Made Sites' },
  { href: '/vault', label: 'Digital Vault' },
  { href: '/training', label: 'Training' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container navbar">
        <Link href="/" className="brand-logo">
          <div className="logo-icon">E</div>
          <div className="brand-text">
            <span className="brand-name">budget learning<span style={{ color: 'var(--accent-blue)' }}>.in</span></span>
            <span className="company-subtext">Eclipse Private Limited</span>
          </div>
        </Link>

        <ul className={`nav-menu${menuOpen ? ' open' : ''}`} id="navMenu">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link${pathname === link.href ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link href="/pricing" className="btn btn-primary btn-sm">Get Started</Link>
          <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
