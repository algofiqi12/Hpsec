'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { IconHome, IconPhone, IconClipboard, IconMenu, IconX } from '@/components/Icons';
import '@/app/admin.css';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: IconHome },
  { href: '/admin/phones', label: 'Kelola HP', icon: IconPhone },
  { href: '/admin/site', label: 'Data Toko', icon: IconClipboard },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  function isActive(href) {
    if (href === '/admin') return pathname === '/admin' || pathname === '/admin/';
    return pathname.startsWith(href);
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-sidebar-logo">
            <span>HP</span><span>SEC</span>
            <span className="admin-sidebar-badge">Admin</span>
          </Link>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-group">
            <p className="admin-nav-label">Menu</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="admin-nav-group">
            <p className="admin-nav-label">Website</p>
            <Link href="/" className="admin-nav-link" target="_blank">
              <IconHome size={18} />
              Lihat Website
            </Link>
            <Link href="/katalog" className="admin-nav-link" target="_blank">
              <IconPhone size={18} />
              Lihat Katalog
            </Link>
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="admin-overlay open" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile toggle */}
      <button
        className="admin-sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <IconX size={20} /> : <IconMenu size={20} />}
      </button>

      {/* Main content */}
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
