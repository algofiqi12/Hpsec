import Link from 'next/link';
import { IconWhatsApp, IconMapPin, IconClock } from './Icons';
import siteData from '@/data/site.json';
import { waLink, formatAlamat } from '@/lib/utils';
import styles from './Footer.module.css';

export default function Footer() {
  const alamat = formatAlamat();
  const sosialEntries = Object.entries(siteData.sosial).filter(([, v]) => v);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>HP</span>
              <span className={styles.logoSec}>SEC</span>
            </Link>
            <p className={styles.tagline}>
              Jual beli &amp; tukar tambah HP second terpercaya di Cikarang.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn--wa ${styles.waBtn}`}
            >
              <IconWhatsApp size={18} />
              Chat WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Navigasi</h3>
            <ul className={styles.linkList}>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/katalog">Katalog HP</Link></li>
              <li><Link href="/layanan">Layanan</Link></li>
              <li><Link href="/garansi">Garansi</Link></li>
              <li><Link href="/tentang">Tentang Kami</Link></li>
              <li><Link href="/kontak">Kontak</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Hubungi Kami</h3>
            <ul className={styles.contactList}>
              <li>
                <IconWhatsApp size={16} />
                <a href={`tel:${siteData.wa}`}>{siteData.waTampil}</a>
              </li>
              {alamat && (
                <li>
                  <IconMapPin size={16} />
                  <span>{alamat}</span>
                </li>
              )}
              {siteData.jamBuka && (
                <li>
                  <IconClock size={16} />
                  <span>{siteData.jamBuka}</span>
                </li>
              )}
            </ul>

            {sosialEntries.length > 0 && (
              <div className={styles.socials}>
                {sosialEntries.map(([platform, url]) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}>
                    {platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} {siteData.nama}. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
