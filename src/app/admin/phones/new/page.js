'use client';

import PhoneForm from '@/components/admin/PhoneForm';

export default function NewPhonePage() {
  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Tambah HP Baru</h1>
      </div>
      <div className="admin-content">
        <PhoneForm />
      </div>
    </>
  );
}
