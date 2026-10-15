import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';
import PhoneCard from '@/components/PhoneCard';
import ScrollReveal from '@/components/ScrollReveal';
import { IconWhatsApp, IconShield, IconTag, IconRepeat, IconCheck, IconMapPin, IconArrowRight, IconMessageCircle, IconShoppingBag, IconPhone } from '@/components/Icons';
import { waLink, formatAlamat } from '@/lib/utils';
import { getPhonesServer } from '@/lib/phones';
import siteData from '@/data/site.json';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const phones = await getPhonesServer();
  const unitTersedia = phones.filter((p) => p.tersedia);
  const listUnggulan = unitTersedia.filter((p) => p.unggulan);
  const listLainnya = unitTersedia.filter((p) => !p.unggulan);
  // Tampilkan unggulan terlebih dahulu, kemudian unit terbaru lainnya (maks 6)
  const unggulan = [...listUnggulan, ...listLainnya].slice(0, 6);
  const alamat = formatAlamat();

  return (
    <PublicLayout>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>Toko HP Second Terpercaya di Cikarang</span>
            <h1 className={styles.heroTitle}>
              HP Second Berkualitas,{' '}
              <span className={styles.heroAccent}>Harga Bersahabat</span>
            </h1>
            <p className={styles.heroDesc}>
              Semua unit dicek sebelum dijual, bergaransi, dan siap tukar tambah.
              Langsung chat, tanpa ribet.
            </p>
            <div className={styles.heroCta}>
              <Link href="/katalog" className="btn btn--primary btn--lg">
                <IconPhone size={20} />
                Lihat Katalog
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--wa btn--lg"
              >
                <IconWhatsApp size={20} />
                Chat WhatsApp
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroStamp}>
                <span>DICEK</span>
                <span>&amp;</span>
                <span>GARANSI</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroBg} aria-hidden="true" />
      </section>

      {/* ===== KEUNGGULAN ===== */}
      <section className={`section ${styles.keunggulan}`}>
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <span className="section-heading__label">Kenapa HPSEC?</span>
              <h2 className="section-heading__title">Beli HP Second yang Aman</h2>
              <p className="section-heading__desc">
                Setiap unit kami cek sebelum dijual, supaya kamu nggak perlu khawatir.
              </p>
            </div>
          </ScrollReveal>

          <div className={`grid grid--4 ${styles.keunggulanGrid}`}>
            {[
              {
                icon: <IconCheck size={28} />,
                title: 'Unit Dicek',
                desc: 'Setiap HP dicek kondisi fisik dan fungsinya sebelum dijual.',
              },
              {
                icon: <IconShield size={28} />,
                title: 'Bergaransi',
                desc: 'Ada garansi toko untuk kenyamanan pembelian kamu.',
              },
              {
                icon: <IconTag size={28} />,
                title: 'Harga Terjangkau',
                desc: 'Harga kompetitif dan transparan, tanpa biaya tersembunyi.',
              },
              {
                icon: <IconRepeat size={28} />,
                title: 'Tukar Tambah',
                desc: 'Bisa tukarkan HP lamamu dan tambah sedikit untuk HP baru.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={styles.keunggulanCard}>
                  <div className={styles.keunggulanIcon}>{item.icon}</div>
                  <h3 className={styles.keunggulanTitle}>{item.title}</h3>
                  <p className={styles.keunggulanDesc}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LAYANAN ===== */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <span className="section-heading__label">Layanan Kami</span>
              <h2 className="section-heading__title">Jual, Beli, atau Tukar Tambah</h2>
              <p className="section-heading__desc">
                Apa pun kebutuhanmu, HPSEC siap bantu.
              </p>
            </div>
          </ScrollReveal>

          <div className={`grid grid--3 ${styles.layananGrid}`}>
            {[
              {
                icon: <IconShoppingBag size={32} />,
                title: 'Beli HP Second',
                desc: 'Pilih dari katalog kami. Unit sudah dicek dan bergaransi.',
                link: '/layanan#beli',
              },
              {
                icon: <IconTag size={32} />,
                title: 'Jual HP Kamu',
                desc: 'Ingin jual HP lama? Chat kami, kirim info HP, dan dapatkan estimasi harga.',
                link: '/layanan#jual',
              },
              {
                icon: <IconRepeat size={32} />,
                title: 'Tukar Tambah',
                desc: 'Tukarkan HP lama dan tambahkan selisih untuk HP yang kamu mau.',
                link: '/layanan#tukar-tambah',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <Link href={item.link} className={styles.layananCard}>
                  <div className={styles.layananIcon}>{item.icon}</div>
                  <h3 className={styles.layananTitle}>{item.title}</h3>
                  <p className={styles.layananDesc}>{item.desc}</p>
                  <span className={styles.layananLink}>
                    Selengkapnya <IconArrowRight size={16} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUK UNGGULAN ===== */}
      {unggulan.length > 0 && (
        <section className="section">
          <div className="container">
            <ScrollReveal>
              <div className={styles.sliderHeader}>
                <div className="section-heading" style={{ marginBottom: 0 }}>
                  <span className="section-heading__label">Katalog Pilihan</span>
                  <h2 className="section-heading__title">HP Unggulan Minggu Ini</h2>
                  <p className="section-heading__desc">
                    Unit pilihan yang siap pakai. Geser untuk melihat lainnya.
                  </p>
                </div>
                <Link href="/katalog" className={styles.sliderSeeAllLink}>
                  Lihat Semua <IconArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            <div className={styles.productSlider}>
              {unggulan.map((phone) => (
                <div key={phone.id} className={styles.sliderItem}>
                  <PhoneCard phone={phone} compact />
                </div>
              ))}

              <Link href="/katalog" className={styles.moreCard}>
                <div className={styles.moreCardInner}>
                  <span className={styles.moreIcon}>
                    <IconArrowRight size={20} />
                  </span>
                  <span className={styles.moreText}>Lihat Semua Katalog</span>
                  <span className={styles.moreCount}>{phones.filter((p) => p.tersedia).length}+ Unit</span>
                </div>
              </Link>
            </div>

            <ScrollReveal>
              <div className={styles.seeAll}>
                <Link href="/katalog" className="btn btn--primary">
                  Lihat Semua Katalog <IconArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== CARA BELANJA ===== */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <span className="section-heading__label">Gampang Banget</span>
              <h2 className="section-heading__title">Cara Belanja di HPSEC</h2>
              <p className="section-heading__desc">
                Tiga langkah mudah, dari pilih sampai bawa pulang.
              </p>
            </div>
          </ScrollReveal>

          <div className={`grid grid--3 ${styles.stepsGrid}`}>
            {[
              {
                num: '01',
                title: 'Pilih HP',
                desc: 'Lihat katalog dan temukan HP yang sesuai budget dan kebutuhan kamu.',
              },
              {
                num: '02',
                title: 'Chat WhatsApp',
                desc: 'Tanya ketersediaan, kondisi, dan jadwalkan waktu untuk cek unit langsung.',
              },
              {
                num: '03',
                title: 'Cek & Bayar',
                desc: 'Datang ke toko, cek unit langsung, dan bayar. Langsung bawa pulang!',
              },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className={styles.stepCard}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOKASI ===== */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className={styles.lokasiWrap}>
              <div className={styles.lokasiContent}>
                <div className="section-heading">
                  <span className="section-heading__label">Lokasi Toko</span>
                  <h2 className="section-heading__title">Datang Langsung ke HPSEC</h2>
                </div>
                <div className={styles.lokasiInfo}>
                  <div className={styles.lokasiItem}>
                    <IconMapPin size={20} />
                    <span>{alamat}</span>
                  </div>
                  {siteData.jamBuka && (
                    <div className={styles.lokasiItem}>
                      <IconMapPin size={20} />
                      <span>{siteData.jamBuka}</span>
                    </div>
                  )}
                </div>
                <div className={styles.lokasiActions}>
                  {siteData.mapsUrl ? (
                    <a href={siteData.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                      <IconMapPin size={18} />
                      Buka di Google Maps
                    </a>
                  ) : (
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(alamat)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline"
                    >
                      <IconMapPin size={18} />
                      Buka di Google Maps
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA PENUTUP ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaTitle}>Tertarik? Langsung Chat Aja!</h2>
              <p className={styles.ctaDesc}>
                Tanya stok, nego harga, atau konsultasi tukar tambah.
                Kami balas cepat lewat WhatsApp.
              </p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--wa btn--lg"
              >
                <IconWhatsApp size={22} />
                Chat WhatsApp Sekarang
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
