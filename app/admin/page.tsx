'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: '1.5rem',
      border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      display: 'flex', alignItems: 'center', gap: '1rem'
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 12, background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{value}</div>
        <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ courses: 0, coupons: 0, banners: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [courses, coupons, banners] = await Promise.all([
        fetch('/api/courses').then(r => r.json()),
        fetch('/api/coupons').then(r => r.json()),
        fetch('/api/banners').then(r => r.json()),
      ]);
      setStats({
        courses: Array.isArray(courses) ? courses.length : 0,
        coupons: Array.isArray(coupons) ? coupons.filter((c: any) => c.active).length : 0,
        banners: Array.isArray(banners) ? banners.filter((b: any) => b.active).length : 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#64748b', margin: '0.25rem 0 0' }}>Welcome back, Admin — budget learning.in overview</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <StatCard label="Total Courses" value={loading ? 0 : stats.courses} icon="📚" color="rgba(37,99,235,0.12)" />
        <StatCard label="Active Coupons" value={loading ? 0 : stats.coupons} icon="🏷️" color="rgba(16,185,129,0.12)" />
        <StatCard label="Active Banners" value={loading ? 0 : stats.banners} icon="🖼️" color="rgba(124,58,237,0.12)" />
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Quick Actions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {[
          { href: '/admin/courses', title: 'Manage Courses', desc: 'Add, edit, or remove courses from the platform', icon: '📚', color: '#2563eb' },
          { href: '/admin/coupons', title: 'Manage Coupons', desc: 'Create discount codes with expiry dates and limits', icon: '🏷️', color: '#10b981' },
          { href: '/admin/banners', title: 'Manage Banners', desc: 'Control promotional banners shown on the homepage', icon: '🖼️', color: '#7c3aed' },
        ].map(action => (
          <Link key={action.href} href={action.href} style={{
            display: 'block', background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: 12, padding: '1.5rem', textDecoration: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.15s ease'
          }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{action.icon}</div>
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>{action.title}</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>{action.desc}</div>
            <div style={{ color: action.color, fontWeight: 700, fontSize: '0.85rem', marginTop: '0.75rem' }}>Open → </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
