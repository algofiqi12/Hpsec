'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { formatHarga } from '@/lib/utils';
import { IconPhone, IconArrowRight } from '@/components/Icons';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, tersedia: 0, terjual: 0 });
  const [recentPhones, setRecentPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      const { data: phones } = await supabase
        .from('phones')
        .select('*')
        .order('created_at', { ascending: false });

      if (phones) {
        setStats({
          total: phones.length,
          tersedia: phones.filter((p) => p.tersedia).length,
          terjual: phones.filter((p) => !p.tersedia).length,
        });
        setRecentPhones(phones.slice(0, 5));
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Dashboard</h1>
      </div>

      <div className="admin-content">
        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <p className="admin-stat-label">Total HP</p>
            <p className="admin-stat-value blue">{loading ? '...' : stats.total}</p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-label">Tersedia</p>
            <p className="admin-stat-value green">{loading ? '...' : stats.tersedia}</p>
          </div>
          <div className="admin-stat-card">
            <p className="admin-stat-label">Terjual</p>
            <p className="admin-stat-value red">{loading ? '...' : stats.terjual}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link href="/admin/phones/new" className="btn btn--primary">
            <IconPhone size={18} /> Tambah HP Baru
          </Link>
          <Link href="/admin/phones" className="btn btn--outline">
            Lihat Semua HP <IconArrowRight size={16} />
          </Link>
        </div>

        {/* Recent */}
        <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>
          HP Terbaru
        </h2>

        {loading ? (
          <p className="text-muted">Memuat data...</p>
        ) : recentPhones.length > 0 ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Kondisi</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPhones.map((phone) => (
                  <tr key={phone.id}>
                    <td style={{ fontWeight: 600 }}>{phone.nama}</td>
                    <td className="mono" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                      {formatHarga(phone.harga)}
                    </td>
                    <td>
                      <span className={`badge badge--${phone.kondisi === 'Mulus' ? 'mulus' : phone.kondisi === 'Normal' ? 'normal' : 'minus'}`}>
                        {phone.kondisi}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${phone.tersedia ? 'badge--mulus' : 'badge--terjual'}`} style={{ transform: 'none' }}>
                        {phone.tersedia ? 'Tersedia' : 'Terjual'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty">
            <p className="admin-empty-title">Belum ada data HP</p>
            <p>Tambahkan HP pertamamu atau jalankan migration SQL di Supabase.</p>
          </div>
        )}
      </div>
    </>
  );
}
