'use client';
import { useEffect, useState } from 'react';

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
}

const emptyForm = { title: '', description: '', price: '', originalPrice: '', category: 'General', imageUrl: '', active: true };

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    const data = await fetch('/api/courses').then(r => r.json());
    setCourses(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify({ ...form, price: Number(form.price), originalPrice: Number(form.originalPrice) }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setMsg('✅ Course added successfully!');
      setForm(emptyForm);
      await load();
    } else {
      const err = await res.json();
      setMsg('❌ Error: ' + err.error);
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete course "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/courses?id=${id}`, { method: 'DELETE' });
    await load();
  }

  async function handleToggle(id: string, current: boolean) {
    await fetch(`/api/courses?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ active: !current }),
      headers: { 'Content-Type': 'application/json' },
    });
    await load();
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Course Manager</h1>
      <p style={{ color: '#64748b', margin: '0 0 2rem' }}>Add, remove, and manage all courses on the platform</p>

      {/* Add Course Form */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>➕ Add New Course</h2>
        {msg && <div style={{ padding: '0.75rem 1rem', borderRadius: 8, background: msg.startsWith('✅') ? '#f0fdf4' : '#fef2f2', color: msg.startsWith('✅') ? '#16a34a' : '#dc2626', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>{msg}</div>}
        <form onSubmit={handleAdd}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Course Title *</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Instagram Marketing Masterclass" required />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['General', 'Marketing', 'E-Commerce', 'AI & Tools', 'Design', 'Business', 'Finance'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Description *</label>
            <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief course description..." required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={labelStyle}>Price (₹) *</label>
              <input style={inputStyle} type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="1499" required />
            </div>
            <div>
              <label style={labelStyle}>Original Price (₹)</label>
              <input style={inputStyle} type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} placeholder="2999" />
            </div>
            <div>
              <label style={labelStyle}>Image URL</label>
              <input style={inputStyle} value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <button type="submit" disabled={saving} style={btnStyle}>
            {saving ? 'Adding...' : '+ Add Course'}
          </button>
        </form>
      </div>

      {/* Courses Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>All Courses ({courses.length})</h2>
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading courses...</div>
        ) : courses.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No courses yet. Add your first course above.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Title', 'Category', 'Price', 'Status', 'Created', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: '#475569', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={c._id} style={{ borderBottom: i < courses.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#0f172a' }}>
                      <div>{c.title}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 400, marginTop: 2 }}>{c.description.slice(0, 60)}...</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>{c.category}</span></td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>
                      ₹{c.price.toLocaleString()}
                      {c.originalPrice > 0 && <div style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.8rem', textDecoration: 'line-through' }}>₹{c.originalPrice.toLocaleString()}</div>}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <button onClick={() => handleToggle(c._id, c.active)} style={{
                        padding: '0.25rem 0.75rem', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                        background: c.active ? '#dcfce7' : '#fee2e2', color: c.active ? '#16a34a' : '#dc2626'
                      }}>
                        {c.active ? '● Active' : '○ Inactive'}
                      </button>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#94a3b8', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <button onClick={() => handleDelete(c._id, c.title)} style={{ padding: '0.4rem 0.75rem', background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
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
const btnStyle: React.CSSProperties = { padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' };
