import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client untuk digunakan di Client Components (browser).
 * Menggunakan anon key — akses dikontrol oleh RLS policies.
 */
export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    url.startsWith('http') &&
    !url.includes('YOUR_PROJECT')
  );
}

export function createClient() {
  const url = isSupabaseConfigured()
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : 'https://placeholder.supabase.co';
  const key = isSupabaseConfigured()
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : 'placeholder-anon-key';
  return createBrowserClient(url, key);
}
