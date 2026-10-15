import PublicLayout from '@/components/PublicLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { IconWhatsApp, IconShield, IconCheck, IconClipboard } from '@/components/Icons';
import { waLink } from '@/lib/utils';
import styles from './page.module.css';

export const metadata = {
  title: 'Garansi & Panduan Belanja',
  description: 'Informasi garansi dan panduan belanja HP second di HPSEC Cikarang. Ketahui hak garansi dan cara transaksi yang aman.',
  alternates: { canonical: 'https://hpsec.id/garansi' },
};

export default function GaransiPage() {
  return (
    <PublicLayout>
      <section className={styles.headerSection}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__label">Garansi & Panduan</span>
            <h1 className="section-heading__title">Garansi &amp; Panduan Belanja</h1>
            <p className="section-heading__desc">
              Beli HP second dengan tenang. Pahami garansi dan proses transaksi di HPSEC.
            </p>
          </div>
        </div>
      </section>

      {/* Garansi Section */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className={styles.garansiBlock}>
              <div className={styles.garansiIcon}>
                <IconShield size={40} />
              </div>
              <div className={styles.garansiContent}>
                <h2>Garansi Toko HPSEC</h2>
                <p>
                  Setiap unit yang dijual di HPSEC dilengkapi dengan garansi toko.
                  Garansi ini bertujuan memberikan rasa aman kepada pembeli terhadap
                  kemungkinan masalah yang tidak terdeteksi saat pengecekan awal.
                </p>

                <div className={styles.notaBox}>
                  <h3 className={styles.notaTitle}>Catatan Penting</h3>
                  <p>
                    Detail garansi (durasi, cakupan, pengecualian, dan proses klaim) akan
                    diinformasikan langsung oleh pemilik toko saat transaksi. Pastikan untuk
                    menanyakan dan memahami syarat garansi sebelum melakukan pembelian.
                  </p>
                  {/* TODO: Detail garansi spesifik dari pemilik */}
                </div>

                <div className={styles.highlights}>
                  {[
                    'Garansi berlaku untuk setiap unit yang dijual',
                    'Syarat dan cakupan dijelaskan saat transaksi',
                    'Simpan bukti pembelian untuk klaim garansi',
                    'Klaim garansi dilakukan langsung di toko',
                  ].map((item, i) => (
                    <span key={i} className={styles.highlight}>
                      <IconCheck size={16} /> {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Panduan Cek IMEI */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <span className="section-heading__label">Tips</span>
              <h2 className="section-heading__title">Panduan Cek HP Second</h2>
              <p className="section-heading__desc">
                Beberapa hal yang bisa kamu periksa sebelum membeli HP bekas.
              </p>
            </div>
          </ScrollReveal>

          <div className={`grid grid--2 ${styles.tipsGrid}`}>
            {[
              {
                title: 'Cek IMEI',
                desc: 'Pastikan IMEI HP terdaftar resmi. Kamu bisa mengecek melalui situs resmi Kemenperin. Ini membantu memastikan perangkat legal.',
              },
              {
                title: 'Cek Kondisi Fisik',
                desc: 'Periksa layar, body, port charging, speaker, dan kamera. Perhatikan apakah ada lecet, penyok, atau kerusakan fisik.',
              },
              {
                title: 'Cek Fungsi',
                desc: 'Tes semua fitur: touchscreen, tombol, WiFi, Bluetooth, sensor fingerprint/Face ID, dan kualitas sinyal.',
              },
              {
                title: 'Cek Baterai',
                desc: 'Untuk iPhone, cek Battery Health di Settings. Untuk Android, gunakan kode dial atau aplikasi pihak ketiga.',
              },
            ].map((tip, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={styles.tipCard}>
                  <h3>{tip.title}</h3>
                  <p>{tip.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alur Transaksi */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <span className="section-heading__label">Alur</span>
              <h2 className="section-heading__title">Alur Transaksi di HPSEC</h2>
            </div>
          </ScrollReveal>

          <div className={styles.flowList}>
            {[
              { num: '1', title: 'Pilih Unit', desc: 'Lihat katalog online atau tanya lewat WhatsApp.' },
              { num: '2', title: 'Chat WhatsApp', desc: 'Konfirmasi ketersediaan, kondisi detail, dan jadwal kunjungan.' },
              { num: '3', title: 'Cek di Toko', desc: 'Datang langsung, periksa unit secara fisik.' },
              { num: '4', title: 'Bayar & Bawa Pulang', desc: 'Setuju dengan kondisi? Bayar dan HP langsung jadi milikmu.' },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={styles.flowItem}>
                  <span className={styles.flowNum}>{step.num}</span>
                  <div>
                    <h3 className={styles.flowTitle}>{step.title}</h3>
                    <p className={styles.flowDesc}>{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className={styles.ctaBlock}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--lg">
                <IconWhatsApp size={20} /> Mulai Chat Sekarang
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
