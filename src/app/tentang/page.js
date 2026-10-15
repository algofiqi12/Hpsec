import PublicLayout from '@/components/PublicLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { IconWhatsApp, IconCheck } from '@/components/Icons';
import { waLink } from '@/lib/utils';
import styles from './page.module.css';

export const metadata = {
  title: 'Tentang Kami',
  description: 'Kenali HPSEC, toko jual beli HP second terpercaya di Cikarang. Unit dicek, bergaransi, harga transparan.',
  alternates: { canonical: 'https://hpsec.id/tentang' },
};

export default function TentangPage() {
  return (
    <PublicLayout>
      <section className={styles.headerSection}>
        <div className="container">
          <div className="section-heading">
            <span className="section-heading__label">Tentang Kami</span>
            <h1 className="section-heading__title">Kenalan dengan HPSEC</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <ScrollReveal>
              <div className={styles.story}>
                <h2 className={styles.storyTitle}>Toko HP Second yang Jujur</h2>
                <p>
                  HPSEC adalah toko jual beli HP second yang berlokasi di Cikarang Selatan, Kabupaten Bekasi.
                  Kami percaya bahwa membeli HP bekas seharusnya tidak perlu was-was.
                </p>
                <p>
                  Itulah kenapa setiap unit yang kami jual sudah dicek kondisinya terlebih dahulu.
                  Kami menjelaskan kondisi apa adanya — mulus, normal, atau ada minus — supaya kamu tahu persis
                  apa yang kamu beli.
                </p>
                <p>
                  Selain jual, kami juga melayani pembelian HP dari pelanggan dan tukar tambah.
                  Prosesnya mudah, transparan, dan semuanya lewat WhatsApp.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className={styles.commitCard}>
                <div className={styles.commitStamp}>
                  <span>KOMITMEN</span>
                </div>
                <h3 className={styles.commitTitle}>Yang Kami Pegang</h3>
                <ul className={styles.commitList}>
                  {[
                    'Setiap unit dicek sebelum dijual',
                    'Kondisi dijelaskan apa adanya',
                    'Harga transparan, tanpa biaya tersembunyi',
                    'Ada garansi toko',
                    'Proses transaksi yang mudah dan cepat',
                  ].map((item, i) => (
                    <li key={i}>
                      <IconCheck size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Foto Toko Placeholder */}
      <section className="section section--alt">
        <div className="container">
          <ScrollReveal>
            <div className={styles.photoSection}>
              <div className={styles.photoPlaceholder}>
                <span>Foto toko akan ditampilkan di sini</span>
              </div>
              <p className={styles.photoCaption}>
                {/* TODO: Foto toko asli dari pemilik */}
                Suasana toko HPSEC — tempat kamu bisa cek HP langsung sebelum beli.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className={styles.ctaBlock}>
              <h2>Mau Tanya atau Mampir?</h2>
              <p>Langsung chat kami atau datang ke toko. Kami senang bantu kamu pilih HP yang pas.</p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--lg">
                <IconWhatsApp size={20} /> Chat WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
