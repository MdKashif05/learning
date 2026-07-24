'use client';
import { useEffect, useState } from 'react';

interface Coupon {
  _id: string;
  code: string;
  discount: number;
  expiryDate: string;
  active: boolean;
  usageLimit: number;
  usedCount: number;
  createdAt: string;
}

const emptyForm = { code: '', discount: '', expiryDate: '', active: true, usageLimit: '0' };

export default function CouponsAdmin() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    const data = await fetch('/api/coupons').then(r => r.json());
    setCoupons(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/coupons', {
      method: 'POST',
      body: JSON.stringify({ ...form, discount: Number(form.discount), usageLimit: Number(form.usageLimit), expiryDate: new Date(form.expiryDate) }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setMsg('✅ Coupon created successfully!');
      setForm(emptyForm);
      await load();
    } else {
      const err = await res.json();
      setMsg('❌ Error: ' + err.error);
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  }

  async function handleDelete(id: string, code: string) {
    if (!confirm(`Delete coupon "${code}"?`)) return;
    await fetch(`/api/coupons?id=${id}`, { method: 'DELETE' });
    await load();
  }

  async function handleToggle(id: string, current: boolean) {
    await fetch(`/api/coupons?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ active: !current }),
      headers: { 'Content-Type': 'application/json' },
    });
    await load();
  }

  const isExpired = (date: string) => new Date(date) < new Date();

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Coupon Manager</h1>
      <p style={{ color: '#64748b', margin: '0 0 2rem' }}>Create and manage discount codes for the pricing page</p>

      {/* Add Coupon Form */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>🏷️ Create New Coupon</h2>
        {msg && <div style={{ padding: '0.75rem 1rem', borderRadius: 8, background: msg.startsWith('✅') ? '#f0fdf4' : '#fef2f2', color: msg.startsWith('✅') ? '#16a34a' : '#dc2626', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>{msg}</div>}
        <form onSubmit={handleAdd}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Coupon Code *</label>
              <input style={inputStyle} value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. LAUNCH50" required />
            </div>
            <div>
              <label style={labelStyle}>Discount % *</label>
              <input style={inputStyle} type="number" min="1" max="100" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} placeholder="e.g. 30" required />
            </div>
            <div>
              <label style={labelStyle}>Expiry Date *</label>
              <input style={inputStyle} type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Usage Limit (0 = unlimited)</label>
              <input style={inputStyle} type="number" min="0" value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: e.target.value })} placeholder="0" />
            </div>
          </div>
          <button type="submit" disabled={saving} style={btnStyle}>
            {saving ? 'Creating...' : '+ Create Coupon'}
          </button>
        </form>
      </div>

      {/* Coupons Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>All Coupons ({coupons.length})</h2>
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading coupons...</div>
        ) : coupons.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No coupons yet. Create your first coupon above.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Code', 'Discount', 'Expiry', 'Used', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coupons.map((c, i) => {
                  const expired = isExpired(c.expiryDate);
                  return (
                    <tr key={c._id} style={{ borderBottom: i < coupons.length - 1 ? '1px solid #f1f5f9' : 'none', opacity: expired ? 0.6 : 1 }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <code style={{ background: '#f1f5f9', padding: '0.25rem 0.6rem', borderRadius: 6, fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em', fontSize: '0.95rem' }}>{c.code}</code>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{ fontWeight: 800, color: '#16a34a', fontSize: '1.1rem' }}>{c.discount}%</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: 4 }}>OFF</span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', whiteSpace: 'nowrap' }}>
                        <span style={{ color: expired ? '#dc2626' : '#0f172a', fontWeight: expired ? 700 : 400 }}>
                          {new Date(c.expiryDate).toLocaleDateString()}
                        </span>
                        {expired && <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 4, marginLeft: 6, fontWeight: 700 }}>EXPIRED</span>}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                        {c.usedCount} {c.usageLimit > 0 ? `/ ${c.usageLimit}` : '/ ∞'}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <button onClick={() => handleToggle(c._id, c.active)} style={{
                          padding: '0.25rem 0.75rem', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                          background: c.active && !expired ? '#dcfce7' : '#fee2e2', color: c.active && !expired ? '#16a34a' : '#dc2626'
                        }}>
                          {c.active && !expired ? '● Active' : '○ Inactive'}
                        </button>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <button onClick={() => handleDelete(c._id, c.code)} style={{ padding: '0.4rem 0.75rem', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 700, color: '#0f172a', fontSize: '0.875rem', marginBottom: '0.4rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 0.9rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' };
const btnStyle: React.CSSProperties = { padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' };
