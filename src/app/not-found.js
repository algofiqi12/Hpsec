import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <span className={styles.code}>404</span>
          <h1 className={styles.title}>Halaman Tidak Ditemukan</h1>
          <p className={styles.desc}>
            Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
          </p>
          <div className={styles.actions}>
            <Link href="/" className="btn btn--primary">
              Kembali ke Beranda
            </Link>
            <Link href="/katalog" className="btn btn--outline">
              Lihat Katalog
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
