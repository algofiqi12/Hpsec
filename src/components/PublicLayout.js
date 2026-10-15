import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloating from '@/components/WhatsAppFloating';

/**
 * Wrapper untuk halaman publik — menambahkan Header, Footer, dan WA Floating.
 * Digunakan di setiap halaman publik (bukan admin/login).
 */
export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
