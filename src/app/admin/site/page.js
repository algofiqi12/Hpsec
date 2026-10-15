'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AdminSitePage() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSite() {
      const supabase = createClient();
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) setForm(data);
      setLoading(false);
    }
    fetchSite();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from('site_settings')
        .update(form)
        .eq('id', 1);

      if (updateError) throw updateError;
      setMessage('Data toko berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Gagal menyimpan.');
    }
    setSaving(false);
  }

  if (loading) return <div className="admin-content"><p className="text-muted">Memuat...</p></div>;
  if (!form) return <div className="admin-content"><div className="admin-alert error">Data toko tidak ditemukan. Jalankan migration SQL terlebih dahulu.</div></div>;

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Data Toko</h1>
      </div>
      <div className="admin-content">
        {message && <div className="admin-alert success">{message}</div>}
        {error && <div className="admin-alert error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: '560px' }}>
          {/* Identitas */}
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
            Identitas
          </h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="nama">Nama Toko</label>
              <input id="nama" name="nama" className="admin-form-input" value={form.nama} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="domain">Domain</label>
              <input id="domain" name="domain" className="admin-form-input" value={form.domain} onChange={handleChange} />
            </div>
          </div>

          {/* WhatsApp */}
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', margin: '1.5rem 0 1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
            WhatsApp
          </h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="wa">Nomor WA (format intl)</label>
              <input id="wa" name="wa" className="admin-form-input" value={form.wa} onChange={handleChange} placeholder="6281326511633" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="wa_tampil">Nomor Tampilan</label>
              <input id="wa_tampil" name="wa_tampil" className="admin-form-input" value={form.wa_tampil} onChange={handleChange} placeholder="0813-2651-1633" />
            </div>
          </div>

          {/* Alamat */}
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', margin: '1.5rem 0 1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
            Alamat
          </h3>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="alamat_jalan">Jalan / Patokan</label>
            <input id="alamat_jalan" name="alamat_jalan" className="admin-form-input" value={form.alamat_jalan} onChange={handleChange} placeholder="Jl. Contoh No. 123" />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="alamat_kelurahan">Kelurahan</label>
              <input id="alamat_kelurahan" name="alamat_kelurahan" className="admin-form-input" value={form.alamat_kelurahan} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="alamat_kecamatan">Kecamatan</label>
              <input id="alamat_kecamatan" name="alamat_kecamatan" className="admin-form-input" value={form.alamat_kecamatan} onChange={handleChange} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="alamat_kabupaten">Kabupaten</label>
              <input id="alamat_kabupaten" name="alamat_kabupaten" className="admin-form-input" value={form.alamat_kabupaten} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="alamat_provinsi">Provinsi</label>
              <input id="alamat_provinsi" name="alamat_provinsi" className="admin-form-input" value={form.alamat_provinsi} onChange={handleChange} />
            </div>
          </div>

          {/* Operasional */}
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', margin: '1.5rem 0 1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
            Operasional
          </h3>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="jam_buka">Jam Buka</label>
            <input id="jam_buka" name="jam_buka" className="admin-form-input" value={form.jam_buka} onChange={handleChange} placeholder="Senin - Sabtu, 09:00 - 18:00" />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="maps_url">Google Maps URL</label>
              <input id="maps_url" name="maps_url" className="admin-form-input" value={form.maps_url} onChange={handleChange} placeholder="https://maps.google.com/..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="maps_embed">Maps Embed URL</label>
              <input id="maps_embed" name="maps_embed" className="admin-form-input" value={form.maps_embed} onChange={handleChange} placeholder="https://www.google.com/maps/embed?..." />
            </div>
          </div>

          {/* Media Sosial */}
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', margin: '1.5rem 0 1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
            Media Sosial
          </h3>

          {['instagram', 'tiktok', 'facebook', 'tokopedia', 'shopee'].map((platform) => (
            <div className="admin-form-group" key={platform}>
              <label className="admin-form-label" htmlFor={`sosial_${platform}`} style={{ textTransform: 'capitalize' }}>
                {platform}
              </label>
              <input
                id={`sosial_${platform}`}
                name={`sosial_${platform}`}
                className="admin-form-input"
                value={form[`sosial_${platform}`]}
                onChange={handleChange}
                placeholder={`https://${platform}.com/hpsec`}
              />
            </div>
          ))}

          <div className="admin-form-actions">
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
