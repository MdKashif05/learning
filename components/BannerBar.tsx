'use client';
import { useEffect, useState } from 'react';

interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  active: boolean;
}

export default function BannerBar() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch('/api/banners')
      .then(r => r.json())
      .then((banners: Banner[]) => {
        const active = Array.isArray(banners) ? banners.find(b => b.active) : null;
        if (active) setBanner(active);
      })
      .catch(() => {});
  }, []);

  if (!banner || dismissed) return null;

  return (
    <div style={{
      background: banner.bgColor,
      color: '#fff',
      textAlign: 'center',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      fontSize: '0.9rem',
      fontWeight: 600,
      position: 'relative',
    }}>
      <span>{banner.title}</span>
      {banner.subtitle && <span style={{ opacity: 0.85, fontWeight: 400 }}>{banner.subtitle}</span>}
      <a href={banner.ctaLink} style={{
        background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)',
        color: '#fff', padding: '0.3rem 0.9rem', borderRadius: 20, textDecoration: 'none',
        fontWeight: 700, fontSize: '0.85rem', backdropFilter: 'blur(4px)'
      }}>
        {banner.ctaText} →
      </a>
      <button onClick={() => setDismissed(true)} style={{
        position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '1.1rem'
      }}>×</button>
    </div>
  );
}
