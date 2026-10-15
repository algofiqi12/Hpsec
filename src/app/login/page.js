'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import styles from './page.module.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';
  const configured = isSupabaseConfigured();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!configured) {
      setError('Supabase belum terhubung. Konfigurasikan file .env.local terlebih dahulu.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Email atau password salah.');
        setLoading(false);
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError('Terjadi kesalahan. Coba lagi.');
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>HP</span>
          <span className={styles.logoSec}>SEC</span>
        </div>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>Masuk untuk mengelola stok dan data toko.</p>

        {!configured && (
          <div className="admin-alert warning" style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
            <strong>Perhatian:</strong> Supabase belum dikonfigurasikan di <code>.env.local</code>. Buat project Supabase gratis dan masukkan URL &amp; Anon Key.
          </div>
        )}

        {error && (
          <div className="admin-alert error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="admin-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@hpsec.id"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="admin-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--lg"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className={styles.wrap}>
        <div className={styles.card}>
          <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Memuat...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

