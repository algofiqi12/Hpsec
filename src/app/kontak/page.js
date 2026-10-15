import PublicLayout from '@/components/PublicLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { IconWhatsApp, IconMapPin, IconClock, IconExternalLink } from '@/components/Icons';
import siteData from '@/data/site.json';
import { waLink, formatAlamat } from '@/lib/utils';
import styles from './page.module.css';

export const metadata = {
  title: 'Kontak',
  description: 'Hubungi HPSEC lewat WhatsApp atau datang langsung ke toko di Cikarang Selatan, Kabupaten Bekasi.',
  alternates: { canonical: 'https://hpsec.id/kontak' },
};

export default function KontakPage() {
  const alamat = formatAlamat();
  const sosialEntries = Object.entries(siteData.sosial).filter(([, v]) => v);
  const mapsSearchUrl = siteData.mapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(alamat)}`;

  return (
    <PublicLayout>
      <section className={styles.headerSection}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__label">Kontak</span>
            <h1 className="section-heading__title">Hubungi HPSEC</h1>
            <p className="section-heading__desc">
              Langsung chat lewat WhatsApp atau datang ke toko. Kami siap bantu!
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            {/* WA Big Card */}
            <ScrollReveal>
              <div className={styles.waCard}>
                <div className={styles.waIcon}>
                  <IconWhatsApp size={40} />
                </div>
                <h2 className={styles.waTitle}>Chat WhatsApp</h2>
                <p className={styles.waNumber}>{siteData.waTampil}</p>
                <p className={styles.waDesc}>
                  Cara tercepat untuk tanya stok, harga, atau apa pun tentang HP second.
                </p>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--lg">
                  <IconWhatsApp size={20} />
                  Mulai Chat Sekarang
                </a>
              </div>
            </ScrollReveal>

            {/* Info Card */}
            <ScrollReveal delay={120}>
              <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Informasi Toko</h2>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}><IconMapPin size={20} /></div>
                    <div>
                      <h3>Alamat</h3>
                      <p>{alamat}</p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}><IconWhatsApp size={20} /></div>
                    <div>
                      <h3>WhatsApp</h3>
                      <p><a href={`tel:${siteData.wa}`}>{siteData.waTampil}</a></p>
                    </div>
                  </div>

                  {siteData.jamBuka && (
                    <div className={styles.infoItem}>
                      <div className={styles.infoIcon}><IconClock size={20} /></div>
                      <div>
                        <h3>Jam Buka</h3>
                        <p>{siteData.jamBuka}</p>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline mt-3"
                >
                  <IconExternalLink size={18} />
                  Buka di Google Maps
                </a>

                {sosialEntries.length > 0 && (
                  <div className={styles.socialSection}>
                    <h3>Media Sosial</h3>
                    <div className={styles.socialLinks}>
                      {sosialEntries.map(([platform, url]) => (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                          {platform}
                          <IconExternalLink size={14} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Google Maps Embed */}
          {siteData.mapsEmbed && (
            <ScrollReveal>
              <div className={styles.mapWrap}>
                <iframe
                  src={siteData.mapsEmbed}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi HPSEC di Google Maps"
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
