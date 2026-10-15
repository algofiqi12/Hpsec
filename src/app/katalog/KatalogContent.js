'use client';

import { useState, useMemo } from 'react';
import PhoneCard from '@/components/PhoneCard';
import ScrollReveal from '@/components/ScrollReveal';
import { IconSearch, IconWhatsApp } from '@/components/Icons';
import { waLink } from '@/lib/utils';
import styles from './page.module.css';

export default function KatalogContent({ initialPhones = [] }) {
  const [phones] = useState(initialPhones);
  const [search, setSearch] = useState('');
  const [kondisi, setKondisi] = useState('');
  const [merek, setMerek] = useState('');
  const [showTersedia, setShowTersedia] = useState(true);
  const [sortBy, setSortBy] = useState('');

  const merekList = useMemo(() => {
    return [...new Set(phones.map((p) => p.merek))].sort();
  }, [phones]);

  const filtered = useMemo(() => {
    let result = [...phones];

    if (showTersedia) {
      result = result.filter((p) => p.tersedia);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.nama.toLowerCase().includes(q) ||
          p.merek.toLowerCase().includes(q) ||
          p.warna.toLowerCase().includes(q)
      );
    }

    if (kondisi) {
      result = result.filter((p) => p.kondisi === kondisi);
    }

    if (merek) {
      result = result.filter((p) => p.merek === merek);
    }

    if (sortBy === 'harga-asc') {
      result.sort((a, b) => a.harga - b.harga);
    } else if (sortBy === 'harga-desc') {
      result.sort((a, b) => b.harga - a.harga);
    }

    return result;
  }, [phones, search, kondisi, merek, showTersedia, sortBy]);

  return (
    <>
      <section className={styles.headerSection}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__label">Katalog HP</span>
            <h1 className="section-heading__title">Pilih HP Second Impianmu</h1>
            <p className="section-heading__desc">
              Semua unit sudah dicek dan bergaransi. Chat WhatsApp untuk tanya ketersediaan.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.catalogSection}>
        <div className="container">
          {/* Controls Bar */}
          <div className={styles.controls}>
            {/* Search */}
            <div className={styles.searchBox}>
              <IconSearch size={18} />
              <input
                type="text"
                placeholder="Cari tipe, merek, atau warna..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className={styles.clearBtn}
                  aria-label="Hapus pencarian"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Filter Row */}
            <div className={styles.filters}>
              {/* Merek */}
              <select
                value={merek}
                onChange={(e) => setMerek(e.target.value)}
                className={styles.select}
                aria-label="Filter merek"
              >
                <option value="">Semua Merek</option>
                {merekList.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              {/* Kondisi */}
              <select
                value={kondisi}
                onChange={(e) => setKondisi(e.target.value)}
                className={styles.select}
                aria-label="Filter kondisi"
              >
                <option value="">Semua Kondisi</option>
                <option value="Mulus">Mulus</option>
                <option value="Normal">Normal</option>
                <option value="Ada minus">Ada minus</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.select}
                aria-label="Urutkan harga"
              >
                <option value="">Urutkan</option>
                <option value="harga-asc">Harga: Rendah ke Tinggi</option>
                <option value="harga-desc">Harga: Tinggi ke Rendah</option>
              </select>

              {/* Tersedia Toggle */}
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showTersedia}
                  onChange={(e) => setShowTersedia(e.target.checked)}
                />
                <span>Hanya yang tersedia</span>
              </label>
            </div>
          </div>

          {/* Result Count */}
          <div className={styles.resultInfo}>
            <p>Menampilkan <strong>{filtered.length}</strong> unit</p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className={styles.catalogGrid}>
              {filtered.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} compact />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Unit Tidak Ditemukan</p>
              <p className={styles.emptyDesc}>
                Coba ubah kata kunci pencarian atau reset filter.
              </p>
              <div className={styles.emptyActions}>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setKondisi('');
                    setMerek('');
                    setShowTersedia(false);
                    setSortBy('');
                  }}
                  className="btn btn--outline"
                >
                  Reset Filter
                </button>
                <a
                  href={waLink('Halo HPSEC, saya mencari HP dengan kriteria tertentu. Bisa dibantu?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--wa"
                >
                  <IconWhatsApp size={18} />
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
