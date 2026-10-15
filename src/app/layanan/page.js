import PublicLayout from '@/components/PublicLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { IconWhatsApp, IconShoppingBag, IconTag, IconRepeat, IconCheck, IconChevronDown } from '@/components/Icons';
import { waLink, waLinkJual, waLinkTukarTambah } from '@/lib/utils';
import styles from './page.module.css';

export const metadata = {
  title: 'Layanan',
  description: 'Layanan jual beli dan tukar tambah HP second di HPSEC Cikarang. Beli HP berkualitas, jual HP lama, atau tukar tambah dengan mudah.',
  alternates: { canonical: 'https://hpsec.id/layanan' },
};

export default function LayananPage() {
  return (
    <PublicLayout>
      <section className={styles.headerSection}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__label">Layanan</span>
            <h1 className="section-heading__title">Apa yang Bisa Kami Bantu?</h1>
            <p className="section-heading__desc">
              HPSEC melayani jual, beli, dan tukar tambah HP second. Semua proses mudah dan transparan lewat WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Beli HP */}
      <section id="beli" className="section">
        <div className="container">
          <ScrollReveal>
            <div className={styles.serviceBlock}>
              <div className={styles.serviceIcon}>
                <IconShoppingBag size={36} />
              </div>
              <div className={styles.serviceContent}>
                <h2 className={styles.serviceTitle}>Beli HP Second</h2>
                <p className={styles.serviceDesc}>
                  Pilih dari katalog kami. Semua unit sudah dicek kondisi fisik dan fungsinya, dilengkapi garansi toko.
                </p>
                <div className={styles.serviceSteps}>
                  <h3 className={styles.stepsLabel}>Cara Beli:</h3>
                  <ol className={styles.stepsList}>
                    <li>Lihat katalog dan pilih HP yang kamu inginkan.</li>
                    <li>Chat WhatsApp untuk konfirmasi ketersediaan dan kondisi detail.</li>
                    <li>Datang ke toko, cek unit langsung.</li>
                    <li>Setuju? Bayar dan langsung bawa pulang.</li>
                  </ol>
                </div>
                <div className={styles.serviceHighlights}>
                  {['Unit sudah dicek', 'Bergaransi toko', 'Harga transparan', 'Bisa COD di toko'].map((h, i) => (
                    <span key={i} className={styles.highlight}>
                      <IconCheck size={16} /> {h}
                    </span>
                  ))}
                </div>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                  <IconWhatsApp size={18} /> Chat untuk Beli HP
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Jual HP */}
      <section id="jual" className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className={styles.serviceBlock}>
              <div className={`${styles.serviceIcon} ${styles.serviceIconAlt}`}>
                <IconTag size={36} />
              </div>
              <div className={styles.serviceContent}>
                <h2 className={styles.serviceTitle}>Jual HP ke HPSEC</h2>
                <p className={styles.serviceDesc}>
                  Punya HP lama yang ingin dijual? Chat kami, kirim detail HP, dan dapatkan estimasi harga.
                </p>
                <div className={styles.serviceSteps}>
                  <h3 className={styles.stepsLabel}>Cara Jual:</h3>
                  <ol className={styles.stepsList}>
                    <li>Chat WhatsApp, kirim merek, tipe, kondisi, dan foto HP kamu.</li>
                    <li>Kami berikan estimasi harga.</li>
                    <li>Datang ke toko untuk cek unit langsung.</li>
                    <li>Deal? Pembayaran langsung di tempat.</li>
                  </ol>
                </div>
                <a href={waLinkJual()} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                  <IconWhatsApp size={18} /> Chat untuk Jual HP
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tukar Tambah */}
      <section id="tukar-tambah" className="section">
        <div className="container">
          <ScrollReveal>
            <div className={styles.serviceBlock}>
              <div className={styles.serviceIcon}>
                <IconRepeat size={36} />
              </div>
              <div className={styles.serviceContent}>
                <h2 className={styles.serviceTitle}>Tukar Tambah</h2>
                <p className={styles.serviceDesc}>
                  Tukarkan HP lama kamu dan tambahkan selisih harga untuk HP yang kamu inginkan.
                </p>
                <div className={styles.serviceSteps}>
                  <h3 className={styles.stepsLabel}>Cara Tukar Tambah:</h3>
                  <ol className={styles.stepsList}>
                    <li>Chat WhatsApp, ceritakan HP lama kamu dan HP yang diinginkan.</li>
                    <li>Kami berikan estimasi nilai tukar dan selisih yang perlu dibayar.</li>
                    <li>Datang ke toko untuk cek kedua unit.</li>
                    <li>Bayar selisih, langsung bawa HP baru.</li>
                  </ol>
                </div>
                <a href={waLinkTukarTambah()} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                  <IconWhatsApp size={18} /> Chat untuk Tukar Tambah
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <span className="section-heading__label">FAQ</span>
              <h2 className="section-heading__title">Pertanyaan yang Sering Ditanyakan</h2>
            </div>
          </ScrollReveal>

          <div className={styles.faqList}>
            {[
              {
                q: 'Apakah HP yang dijual bergaransi?',
                a: 'Ya, setiap unit yang dijual di HPSEC dilengkapi garansi toko. Detail durasi dan cakupan garansi bisa ditanyakan langsung.',
              },
              {
                q: 'Bagaimana cara mengetahui kondisi unit?',
                a: 'Setiap HP kami cek sebelum dijual. Kondisi tercantum di katalog (Mulus, Normal, atau Ada minus). Kamu juga bisa cek langsung di toko.',
              },
              {
                q: 'Metode pembayaran apa yang diterima?',
                a: 'Detail metode pembayaran bisa ditanyakan langsung lewat WhatsApp saat transaksi.',
              },
              {
                q: 'Apakah bisa kirim ke luar kota?',
                a: 'Untuk saat ini, transaksi dilakukan langsung di toko. Silakan hubungi kami untuk diskusi lebih lanjut.',
              },
              {
                q: 'Dokumen apa yang perlu dibawa saat menjual HP?',
                a: 'Bawa HP beserta kelengkapan yang ada dan KTP untuk proses verifikasi.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <details className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>
                    {item.q}
                    <IconChevronDown size={20} />
                  </summary>
                  <p className={styles.faqAnswer}>{item.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
