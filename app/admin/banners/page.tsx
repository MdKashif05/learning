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
  createdAt: string;
}

const emptyForm = { title: '', subtitle: '', ctaText: 'Get Started', ctaLink: '/pricing', bgColor: '#2563eb', active: true };

export default function BannersAdmin() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    const data = await fetch('/api/banners').then(r => r.json());
    setBanners(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/banners', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setMsg('✅ Banner created!');
      setForm(emptyForm);
      await load();
    } else {
      const err = await res.json();
      setMsg('❌ Error: ' + err.error);
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this banner?')) return;
    await fetch(`/api/banners?id=${id}`, { method: 'DELETE' });
    await load();
  }

  async function handleToggle(id: string, current: boolean) {
    await fetch(`/api/banners?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ active: !current }),
      headers: { 'Content-Type': 'application/json' },
    });
    await load();
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Banner Manager</h1>
      <p style={{ color: '#64748b', margin: '0 0 2rem' }}>Manage promotional banners displayed at the top of your site</p>

      {/* Preview of active banner */}
      {banners.filter(b => b.active).length > 0 && (
        <div style={{
          borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem',
          background: banners.filter(b => b.active)[0].bgColor,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>📢 Live Banner Preview</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>{banners.filter(b => b.active)[0].title}</div>
          </div>
          <a href={banners.filter(b => b.active)[0].ctaLink} style={{ background: '#fff', color: '#0f172a', padding: '0.5rem 1.25rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
            {banners.filter(b => b.active)[0].ctaText}
          </a>
        </div>
      )}

      {/* Add Banner Form */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>🖼️ Create New Banner</h2>
        {msg && <div style={{ padding: '0.75rem 1rem', borderRadius: 8, background: msg.startsWith('✅') ? '#f0fdf4' : '#fef2f2', color: msg.startsWith('✅') ? '#16a34a' : '#dc2626', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>{msg}</div>}
        <form onSubmit={handleAdd}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Banner Title *</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. 🔥 Limited Offer: 40% OFF Today Only!" required />
            </div>
            <div>
              <label style={labelStyle}>Background Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input type="color" value={form.bgColor} onChange={e => setForm({ ...form, bgColor: e.target.value })} style={{ width: 48, height: 42, border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', padding: 2 }} />
                <input style={{ ...inputStyle, flex: 1 }} value={form.bgColor} onChange={e => setForm({ ...form, bgColor: e.target.value })} placeholder="#2563eb" />
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Subtitle / Description</label>
            <input style={inputStyle} value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Use code SAVE40 at checkout" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Button Text</label>
              <input style={inputStyle} value={form.ctaText} onChange={e => setForm({ ...form, ctaText: e.target.value })} placeholder="Get Started" />
            </div>
            <div>
              <label style={labelStyle}>Button Link</label>
              <input style={inputStyle} value={form.ctaLink} onChange={e => setForm({ ...form, ctaLink: e.target.value })} placeholder="/pricing" />
            </div>
          </div>
          <button type="submit" disabled={saving} style={btnStyle}>
            {saving ? 'Creating...' : '+ Create Banner'}
          </button>
        </form>
      </div>

      {/* Banners Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>All Banners ({banners.length})</h2>
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading banners...</div>
        ) : banners.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No banners yet. Create your first banner above.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {banners.map((b, i) => (
              <div key={b._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderBottom: i < banners.length - 1 ? '1px solid #f1f5f9' : 'none', flexWrap: 'wrap' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: b.bgColor, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{b.title}</div>
                  {b.subtitle && <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{b.subtitle}</div>}
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: 2 }}>Button: "{b.ctaText}" → {b.ctaLink}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button onClick={() => handleToggle(b._id, b.active)} style={{
                    padding: '0.3rem 0.75rem', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                    background: b.active ? '#dcfce7' : '#fee2e2', color: b.active ? '#16a34a' : '#dc2626'
                  }}>
                    {b.active ? '● Active' : '○ Inactive'}
                  </button>
                  <button onClick={() => handleDelete(b._id)} style={{ padding: '0.4rem 0.75rem', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 700, color: '#0f172a', fontSize: '0.875rem', marginBottom: '0.4rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' };
const btnStyle: React.CSSProperties = { padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' };
