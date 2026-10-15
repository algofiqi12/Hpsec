'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconWhatsApp, IconMenu, IconX } from './Icons';
import { waLink } from '@/lib/utils';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/katalog', label: 'Katalog' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/kontak', label: 'Kontak' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="HPSEC - Beranda">
          <span className={styles.logoMark}>HP</span>
          <span className={styles.logoSec}>SEC</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Navigasi utama">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn--wa ${styles.navWa}`}
            onClick={() => setMenuOpen(false)}
          >
            <IconWhatsApp size={18} />
            Chat Kami
          </a>
        </nav>

        <div className={styles.headerActions}>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn--wa ${styles.waDesktop}`}
          >
            <IconWhatsApp size={18} />
            Chat Kami
          </a>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
