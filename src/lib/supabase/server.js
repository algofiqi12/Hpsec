import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Supabase client untuk Server Components, Server Actions, dan Route Handlers.
 * Membaca/menulis cookies untuk session management.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ini bisa terjadi saat dipanggil dari Server Component
            // yang tidak bisa set cookies. Aman diabaikan jika
            // middleware sudah me-refresh session.
          }
        },
      },
    }
  );
}

/**
 * Supabase admin client dengan service role key.
 * HANYA digunakan di server-side untuk operasi admin yang bypass RLS.
 */
export function createAdminClient() {
  const { createClient } = require('@supabase/supabase-js');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
