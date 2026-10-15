'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

/**
 * Form HP yang dipakai untuk tambah dan edit.
 * @param {object} props
 * @param {object} [props.initialData] - Data HP untuk edit, kosong untuk tambah baru
 * @param {boolean} [props.isEdit] - Mode edit atau tambah
 */
export default function PhoneForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    id: initialData?.id || '',
    nama: initialData?.nama || '',
    merek: initialData?.merek || '',
    warna: initialData?.warna || '',
    storage: initialData?.storage || '',
    ram: initialData?.ram || '',
    harga: initialData?.harga || '',
    kondisi: initialData?.kondisi || 'Mulus',
    kelengkapan: initialData?.kelengkapan || '',
    garansi: initialData?.garansi || 'Garansi toko 1 bulan',
    deskripsi: initialData?.deskripsi || '',
    foto: initialData?.foto || '',
    unggulan: initialData?.unggulan ?? true,
    tersedia: initialData?.tersedia ?? true,
  });

  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(initialData?.foto || '');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function generateId() {
    const slug = `${form.nama}-${form.storage}-${form.warna}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setForm((prev) => ({ ...prev, id: slug }));
  }

  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
  }

  async function uploadFoto() {
    if (!fotoFile) return form.foto;

    const supabase = createClient();
    const ext = fotoFile.name.split('.').pop();
    const fileName = `${form.id || Date.now()}.${ext}`;

    const { data, error: uploadError } = await supabase.storage
      .from('phone-images')
      .upload(fileName, fotoFile, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Gagal upload foto (${uploadError.message}). Pastikan Storage Policy sudah diaktifkan di Supabase SQL Editor.`);
    }

    const { data: urlData } = supabase.storage
      .from('phone-images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validasi
      if (!form.id || !form.nama || !form.merek || !form.warna || !form.harga) {
        setError('ID, nama, merek, warna, dan harga wajib diisi.');
        setLoading(false);
        return;
      }

      const supabase = createClient();

      // Cek sesi login admin
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Sesi admin tidak aktif atau belum login. Silakan login terlebih dahulu di halaman /login.');
        setLoading(false);
        return;
      }

      // Upload foto jika ada
      const fotoUrl = await uploadFoto();

      const phoneData = {
        ...form,
        harga: parseInt(form.harga, 10),
        foto: fotoUrl,
      };

      if (isEdit) {
        const { error: updateError } = await supabase
          .from('phones')
          .update(phoneData)
          .eq('id', initialData.id);

        if (updateError) throw updateError;
        setSuccess('HP berhasil diupdate!');
      } else {
        const { error: insertError } = await supabase
          .from('phones')
          .insert(phoneData);

        if (insertError) {
          if (insertError.code === '23505') {
            setError('ID sudah dipakai. Ubah ID atau gunakan ID unik lain.');
          } else {
            throw insertError;
          }
          setLoading(false);
          return;
        }
        setSuccess('HP berhasil ditambahkan!');
      }

      setTimeout(() => router.push('/admin/phones'), 1000);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.');
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && <div className="admin-alert error">{error}</div>}
      {success && <div className="admin-alert success">{success}</div>}

      {/* ID */}
      <div className="admin-form-group">
        <label className="admin-form-label" htmlFor="id">ID / Slug</label>
        <span className="admin-form-hint">Digunakan sebagai URL: /hp/[id]. Contoh: iphone-12-64-hitam</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            id="id"
            name="id"
            className="admin-form-input"
            value={form.id}
            onChange={handleChange}
            required
            disabled={isEdit}
            placeholder="iphone-12-64-hitam"
            style={{ flex: 1 }}
          />
          {!isEdit && (
            <button type="button" onClick={generateId} className="btn btn--outline" style={{ whiteSpace: 'nowrap' }}>
              Auto ID
            </button>
          )}
        </div>
      </div>

      {/* Nama & Merek */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="nama">Nama HP</label>
          <input id="nama" name="nama" className="admin-form-input" value={form.nama} onChange={handleChange} required placeholder="iPhone 12 64GB" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="merek">Merek</label>
          <input id="merek" name="merek" className="admin-form-input" value={form.merek} onChange={handleChange} required placeholder="Apple" />
        </div>
      </div>

      {/* Warna & Storage & RAM */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="warna">Warna</label>
          <input id="warna" name="warna" className="admin-form-input" value={form.warna} onChange={handleChange} required placeholder="Hitam" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="storage">Storage</label>
          <input id="storage" name="storage" className="admin-form-input" value={form.storage} onChange={handleChange} placeholder="128GB" />
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="ram">RAM</label>
          <input id="ram" name="ram" className="admin-form-input" value={form.ram} onChange={handleChange} placeholder="8GB" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="harga">Harga (Rp)</label>
          <input id="harga" name="harga" type="number" className="admin-form-input" value={form.harga} onChange={handleChange} required min="0" placeholder="5200000" />
        </div>
      </div>

      {/* Kondisi & Kelengkapan */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="kondisi">Kondisi</label>
          <select id="kondisi" name="kondisi" className="admin-form-select" value={form.kondisi} onChange={handleChange}>
            <option value="Mulus">Mulus</option>
            <option value="Normal">Normal</option>
            <option value="Ada minus">Ada minus</option>
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label" htmlFor="kelengkapan">Kelengkapan</label>
          <input id="kelengkapan" name="kelengkapan" className="admin-form-input" value={form.kelengkapan} onChange={handleChange} placeholder="Fullset / Unit + Charger / Unit only" />
        </div>
      </div>

      {/* Garansi */}
      <div className="admin-form-group">
        <label className="admin-form-label" htmlFor="garansi">Garansi</label>
        <input id="garansi" name="garansi" className="admin-form-input" value={form.garansi} onChange={handleChange} placeholder="Garansi toko 1 bulan" />
      </div>

      {/* Deskripsi */}
      <div className="admin-form-group">
        <label className="admin-form-label" htmlFor="deskripsi">Deskripsi / Catatan</label>
        <textarea id="deskripsi" name="deskripsi" className="admin-form-textarea" value={form.deskripsi} onChange={handleChange} placeholder="Catatan kondisi, catatan teknisi, dll." />
      </div>

      {/* Foto */}
      <div className="admin-form-group">
        <label className="admin-form-label">Foto Utama</label>
        <span className="admin-form-hint">Upload foto produk (JPG/PNG/WebP, maks 2MB)</span>
        <div className="admin-photo-upload" onClick={() => document.getElementById('foto-input').click()}>
          {fotoPreview ? (
            <img src={fotoPreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }} />
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Klik untuk upload foto</p>
          )}
        </div>
        <input id="foto-input" type="file" accept="image/*" onChange={handleFotoChange} style={{ display: 'none' }} />
        {form.foto && !fotoFile && (
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>
            Foto saat ini: {form.foto}
          </p>
        )}
      </div>

      {/* Toggles */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" name="tersedia" checked={form.tersedia} onChange={handleChange} style={{ accentColor: 'var(--olive)', width: '18px', height: '18px' }} />
            <span className="admin-form-label" style={{ margin: 0 }}>Tersedia</span>
          </label>
        </div>
        <div className="admin-form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" name="unggulan" checked={form.unggulan} onChange={handleChange} style={{ accentColor: 'var(--mustard)', width: '18px', height: '18px' }} />
            <span className="admin-form-label" style={{ margin: 0 }}>Unggulan</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="admin-form-actions">
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? 'Menyimpan...' : isEdit ? 'Update HP' : 'Tambah HP'}
        </button>
        <button type="button" className="btn btn--outline" onClick={() => router.back()}>
          Batal
        </button>
      </div>
    </form>
  );
}
