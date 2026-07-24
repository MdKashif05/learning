'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/courses', label: 'Courses', icon: '📚' },
  { href: '/admin/coupons', label: 'Coupons', icon: '🏷️' },
  { href: '/admin/banners', label: 'Banners', icon: '🖼️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('bl_admin') === 'true') setAuthed(true);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password: pw }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      sessionStorage.setItem('bl_admin', 'true');
      setAuthed(true);
    } else {
      setError('Incorrect password. Try again.');
    }
  }

  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '2.5rem', width: '100%', maxWidth: 400,
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem', fontSize: '1.5rem', color: '#fff', fontWeight: 800
            }}>E</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>
              Admin Panel
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>budget learning.in · Eclipse Private Limited</p>
          </div>
          <form onSubmit={handleLogin}>
            <label style={{ display: 'block', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Admin Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              style={{
                width: '100%', padding: '0.85rem 1rem', border: '1px solid #e2e8f0',
                borderRadius: 8, fontSize: '0.95rem', outline: 'none', marginBottom: '0.75rem',
                background: '#f8fafc', boxSizing: 'border-box'
              }}
              autoFocus
            />
            {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>{error}</p>}
            <button type="submit" style={{
              width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer'
            }}>
              Login to Admin →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 240 : 64, background: '#0f172a', color: '#f8fafc',
        display: 'flex', flexDirection: 'column', transition: 'width 0.2s ease', flexShrink: 0
      }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', color: '#fff'
          }}>E</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.2 }}>budget learning</div>
              <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Panel</div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.7rem 0.85rem', borderRadius: 8, marginBottom: '0.25rem',
                background: active ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
                color: active ? '#60a5fa' : '#94a3b8',
                textDecoration: 'none', fontWeight: active ? 700 : 500,
                fontSize: '0.9rem', transition: 'all 0.15s ease'
              }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => {
            sessionStorage.removeItem('bl_admin');
            setAuthed(false);
          }} style={{
            width: '100%', padding: '0.6rem', background: 'rgba(239,68,68,0.1)',
            color: '#f87171', border: 'none', borderRadius: 8, fontWeight: 600,
            fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center'
          }}>
            <span>🚪</span>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{
          background: '#fff', borderBottom: '1px solid #e2e8f0',
          padding: '0 1.5rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: 'transparent', border: '1px solid #e2e8f0', padding: '0.4rem 0.6rem',
            borderRadius: 6, cursor: 'pointer', color: '#475569'
          }}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/" target="_blank" style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              ↗ View Public Site
            </Link>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem', fontWeight: 800
            }}>A</div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
