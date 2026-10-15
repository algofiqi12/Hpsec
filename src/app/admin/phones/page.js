'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { formatHarga } from '@/lib/utils';
import { IconPhone, IconSearch } from '@/components/Icons';

export default function AdminPhonesPage() {
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function fetchPhones() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('phones')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setPhones(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPhones();
  }, []);

  async function toggleTersedia(phone) {
    const supabase = createClient();
    const { error } = await supabase
      .from('phones')
      .update({ tersedia: !phone.tersedia })
      .eq('id', phone.id);

    if (!error) {
      setPhones((prev) =>
        prev.map((p) => (p.id === phone.id ? { ...p, tersedia: !p.tersedia } : p))
      );
      setMessage(`${phone.nama} ditandai ${!phone.tersedia ? 'tersedia' : 'terjual'}.`);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  async function toggleUnggulan(phone) {
    const supabase = createClient();
    const { error } = await supabase
      .from('phones')
      .update({ unggulan: !phone.unggulan })
      .eq('id', phone.id);

    if (!error) {
      setPhones((prev) =>
        prev.map((p) => (p.id === phone.id ? { ...p, unggulan: !p.unggulan } : p))
      );
    }
  }

  async function deletePhone(phone) {
    if (!confirm(`Yakin hapus ${phone.nama}? Tindakan ini tidak bisa dibatalkan.`)) return;

    const supabase = createClient();
    const { error } = await supabase.from('phones').delete().eq('id', phone.id);

    if (!error) {
      setPhones((prev) => prev.filter((p) => p.id !== phone.id));
      setMessage(`${phone.nama} berhasil dihapus.`);
      setTimeout(() => setMessage(''), 3000);
    }
  }

  const filtered = phones.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.nama.toLowerCase().includes(q) || p.merek.toLowerCase().includes(q);
  });

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Kelola HP</h1>
        <Link href="/admin/phones/new" className="btn btn--primary">
          <IconPhone size={16} /> Tambah HP
        </Link>
      </div>

      <div className="admin-content">
        {message && <div className="admin-alert success">{message}</div>}

        {/* Search */}
        <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: '#fff', border: '2px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '0 0.75rem'
          }}>
            <IconSearch size={18} />
            <input
              type="text"
              placeholder="Cari nama atau merek..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none', outline: 'none', background: 'transparent',
                padding: '0.6rem 0', width: '100%', fontSize: '0.9rem',
                fontFamily: 'var(--font-body)', color: 'var(--text)'
              }}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-muted">Memuat data...</p>
        ) : filtered.length > 0 ? (
          <div className="admin-table-wrap" style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Kondisi</th>
                  <th>Tersedia</th>
                  <th>Unggulan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((phone) => (
                  <tr key={phone.id}>
                    <td>
                      {phone.foto ? (
                        <img src={phone.foto} alt={phone.nama} className="admin-table-img" />
                      ) : (
                        <div className="admin-table-img" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'var(--surface)', color: 'var(--muted)', fontSize: '0.6rem'
                        }}>
                          No foto
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{phone.nama}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                        {phone.warna} {phone.storage && `· ${phone.storage}`}
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {formatHarga(phone.harga)}
                    </td>
                    <td>
                      <span className={`badge badge--${phone.kondisi === 'Mulus' ? 'mulus' : phone.kondisi === 'Normal' ? 'normal' : 'minus'}`}>
                        {phone.kondisi}
                      </span>
                    </td>
                    <td>
                      <label className="admin-toggle">
                        <input
                          type="checkbox"
                          checked={phone.tersedia}
                          onChange={() => toggleTersedia(phone)}
                        />
                        <span className="admin-toggle-slider" />
                      </label>
                    </td>
                    <td>
                      <label className="admin-toggle">
                        <input
                          type="checkbox"
                          checked={phone.unggulan}
                          onChange={() => toggleUnggulan(phone)}
                        />
                        <span className="admin-toggle-slider" />
                      </label>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <Link href={`/admin/phones/${phone.id}/edit`} className="admin-table-btn edit">
                          Edit
                        </Link>
                        <button onClick={() => deletePhone(phone)} className="admin-table-btn delete">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty">
            <p className="admin-empty-title">
              {search ? 'Tidak ada HP yang cocok' : 'Belum ada data HP'}
            </p>
            <p>{search ? 'Coba kata kunci lain.' : 'Tambahkan HP pertamamu.'}</p>
          </div>
        )}

        <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--muted)' }}>
          Total: {filtered.length} HP
        </p>
      </div>
    </>
  );
}
