'use client';

import Link from 'next/link';
import { IconWhatsApp } from './Icons';
import { formatHarga, waLinkProduk, kondisiBadgeClass } from '@/lib/utils';
import styles from './PhoneCard.module.css';

export default function PhoneCard({ phone, compact = false }) {
  const specs = [phone.warna, phone.storage, phone.ram].filter(Boolean).join(' · ');

  return (
    <div className={`card phone-card ${compact ? 'phone-card--compact' : ''} ${styles.card} ${!phone.tersedia ? styles.sold : ''}`}>
      <Link href={`/hp/${phone.id}`} className={styles.imgLink}>
        <div className="phone-card__img-wrap">
          {phone.foto ? (
            <img
              src={phone.foto}
              alt={`${phone.nama} ${phone.warna}`}
              loading="lazy"
              width={400}
              height={400}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="placeholder-img" style={phone.foto ? { display: 'none' } : {}}>
            Foto belum tersedia
          </div>

          <div className="phone-card__badge">
            <span className={`badge ${kondisiBadgeClass(phone.kondisi)}`}>
              {phone.kondisi}
            </span>
          </div>

          {!phone.tersedia && (
            <div className="phone-card__sold-overlay">
              <span className="phone-card__sold-label">Terjual</span>
            </div>
          )}
        </div>
      </Link>

      <div className="phone-card__body">
        <Link href={`/hp/${phone.id}`} className={styles.nameLink}>
          <h3 className="phone-card__name">{phone.nama}</h3>
        </Link>
        {specs && <p className="phone-card__specs">{specs}</p>}
        <p className="phone-card__kelengkapan">{phone.kelengkapan}</p>
        <p className="phone-card__garansi">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          {phone.garansi}
        </p>

        <div className="phone-card__footer">
          <span className="price price--small">{formatHarga(phone.harga)}</span>
          {phone.tersedia ? (
            <a
              href={waLinkProduk(phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa"
            >
              <IconWhatsApp size={16} />
              Tanya
            </a>
          ) : (
            <span className="btn btn--outline btn--disabled">Terjual</span>
          )}
        </div>
      </div>
    </div>
  );
}
