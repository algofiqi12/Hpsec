import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicLayout from '@/components/PublicLayout';
import PhoneCard from '@/components/PhoneCard';
import PhoneImage from '@/components/PhoneImage';
import ScrollReveal from '@/components/ScrollReveal';
import { IconWhatsApp, IconShield } from '@/components/Icons';
import { formatHarga, waLinkProduk, waLink, kondisiBadgeClass } from '@/lib/utils';
import { getPhonesServer, getPhoneByIdServer } from '@/lib/phones';
import phonesData from '@/data/phones.json';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const phone = await getPhoneByIdServer(id);
  if (!phone) return { title: 'HP Tidak Ditemukan' };

  return {
    title: `${phone.nama} ${phone.warna}`,
    description: `${phone.nama} ${phone.warna} ${phone.kondisi} - ${formatHarga(phone.harga)}. ${phone.kelengkapan}. ${phone.garansi}. Beli di HPSEC Cikarang.`,
    alternates: { canonical: `https://hpsec.id/hp/${phone.id}` },
  };
}

export default async function DetailHPPage({ params }) {
  const { id } = await params;
  const phones = await getPhonesServer();
  const phone = phones.find((p) => p.id === id);
  if (!phone) notFound();

  const specs = [phone.warna, phone.storage, phone.ram].filter(Boolean);
  const similarPhones = phones
    .filter((p) => p.id !== phone.id && p.tersedia && (p.merek === phone.merek || Math.abs(p.harga - phone.harga) < 2000000))
    .slice(0, 3);

  const waMessage = phone.tersedia
    ? `Halo HPSEC, saya tertarik dengan ${phone.nama} (${phone.warna}). Apakah masih tersedia?`
    : `Halo HPSEC, saya mencari unit serupa ${phone.nama}. Apakah ada stok?`;

  return (
    <PublicLayout>
      <section className={styles.breadcrumb}>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/katalog">Katalog</Link></li>
              <li aria-current="page">{phone.nama}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div className={styles.detailGrid}>
            {/* Image */}
            <ScrollReveal>
              <div className={styles.imageSection}>
                <div className={styles.mainImage}>
                  <PhoneImage
                    src={phone.foto}
                    alt={`${phone.nama} ${phone.warna}`}
                  />

                  {!phone.tersedia && (
                    <div className="phone-card__sold-overlay">
                      <span className="phone-card__sold-label">Terjual</span>
                    </div>
                  )}

                  <div className={styles.imageBadge}>
                    <span className={`badge ${kondisiBadgeClass(phone.kondisi)}`}>
                      {phone.kondisi}
                    </span>
                  </div>
                </div>

                {phone.fotoGaleri && phone.fotoGaleri.length > 0 && (
                  <div className={styles.gallery}>
                    {phone.fotoGaleri.map((foto, i) => (
                      <div key={i} className={styles.thumb}>
                        <img src={foto} alt={`${phone.nama} foto ${i + 1}`} loading="lazy" width={120} height={120} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={100}>
              <div className={styles.infoSection}>
                <h1 className={styles.phoneName}>{phone.nama}</h1>

                <div className={styles.specsLine}>
                  {specs.map((s, i) => (
                    <span key={i} className={styles.specTag}>{s}</span>
                  ))}
                </div>

                <div className={styles.priceBlock}>
                  <span className="price">{formatHarga(phone.harga)}</span>
                  <span className={`badge ${phone.tersedia ? 'badge--mulus' : 'badge--terjual'}`} style={{ transform: 'none' }}>
                    {phone.tersedia ? 'Tersedia' : 'Terjual'}
                  </span>
                </div>

                <div className={styles.detailNota}>
                  <div className={styles.notaRow}>
                    <span className={styles.notaLabel}>Merek</span>
                    <span className={styles.notaValue}>{phone.merek}</span>
                  </div>
                  <div className={styles.notaRow}>
                    <span className={styles.notaLabel}>Warna</span>
                    <span className={styles.notaValue}>{phone.warna}</span>
                  </div>
                  {phone.storage && (
                    <div className={styles.notaRow}>
                      <span className={styles.notaLabel}>Storage</span>
                      <span className={`${styles.notaValue} mono`}>{phone.storage}</span>
                    </div>
                  )}
                  {phone.ram && (
                    <div className={styles.notaRow}>
                      <span className={styles.notaLabel}>RAM</span>
                      <span className={`${styles.notaValue} mono`}>{phone.ram}</span>
                    </div>
                  )}
                  <div className={styles.notaRow}>
                    <span className={styles.notaLabel}>Kondisi</span>
                    <span className={styles.notaValue}>{phone.kondisi}</span>
                  </div>
                  <div className={styles.notaRow}>
                    <span className={styles.notaLabel}>Kelengkapan</span>
                    <span className={styles.notaValue}>{phone.kelengkapan}</span>
                  </div>
                  <div className={styles.notaRow}>
                    <span className={styles.notaLabel}>Garansi</span>
                    <span className={styles.notaValue}>
                      <IconShield size={14} /> {phone.garansi}
                    </span>
                  </div>
                </div>

                {phone.deskripsi && (
                  <div className={styles.descBlock}>
                    <h3>Catatan</h3>
                    <p>{phone.deskripsi}</p>
                  </div>
                )}

                <div className={styles.ctaBlock}>
                  {phone.tersedia ? (
                    <a
                      href={waLinkProduk(phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--wa btn--lg"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <IconWhatsApp size={22} />
                      Tanya via WhatsApp
                    </a>
                  ) : (
                    <a
                      href={waLink(waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline btn--lg"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <IconWhatsApp size={22} />
                      Tanya Unit Serupa
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {similarPhones.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <ScrollReveal>
              <div className="section-heading">
                <span className="section-heading__label">Rekomendasi</span>
                <h2 className="section-heading__title">Unit Serupa</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid--3">
              {similarPhones.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 80}>
                  <PhoneCard phone={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
