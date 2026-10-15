import PublicLayout from '@/components/PublicLayout';
import { getPhonesServer } from '@/lib/phones';
import KatalogContent from './KatalogContent';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Katalog HP',
  description: 'Daftar HP second berkualitas bergaransi di HPSEC Cikarang. Cari iPhone, Samsung, Xiaomi dengan kondisi terbaik.',
  alternates: { canonical: 'https://hpsec.id/katalog' },
};

export default async function KatalogPage() {
  const phones = await getPhonesServer();

  return (
    <PublicLayout>
      <KatalogContent initialPhones={phones} />
    </PublicLayout>
  );
}
