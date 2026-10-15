import phonesData from '@/data/phones.json';

/**
 * Helper data fetching untuk Server Components
 * Mengambil dari Supabase jika env vars valid, fallback ke phones.json
 */
export async function getPhonesServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key && !url.includes('YOUR_PROJECT')) {
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('phones')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch {
      // Fallback ke data lokal
    }
  }

  return phonesData;
}

/**
 * Helper untuk mengambil 1 phone berdasarkan ID di Server Component
 */
export async function getPhoneByIdServer(id) {
  const phones = await getPhonesServer();
  return phones.find((p) => p.id === id) || null;
}
