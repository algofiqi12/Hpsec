'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import PhoneForm from '@/components/admin/PhoneForm';

export default function EditPhonePage() {
  const params = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPhone() {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from('phones')
        .select('*')
        .eq('id', params.id)
        .single();

      if (fetchError || !data) {
        setError('HP tidak ditemukan.');
      } else {
        setPhone(data);
      }
      setLoading(false);
    }

    fetchPhone();
  }, [params.id]);

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Edit HP</h1>
      </div>
      <div className="admin-content">
        {loading && <p className="text-muted">Memuat data...</p>}
        {error && <div className="admin-alert error">{error}</div>}
        {phone && <PhoneForm initialData={phone} isEdit />}
      </div>
    </>
  );
}
