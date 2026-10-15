-- ============================================================
-- SOLUSI: StorageApiError / new row violates row-level security
-- Jalankan seluruh script ini di Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Pastikan bucket storage 'phone-images' ada dan public
INSERT INTO storage.buckets (id, name, public)
VALUES ('phone-images', 'phone-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Bersihkan policy lama agar tidak duplikat
DROP POLICY IF EXISTS "Public Read phone-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload phone-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update phone-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete phone-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Upload phone-images" ON storage.objects;

-- 3. Policy agar siapa pun (pengunjung web) bisa melihat gambar HP
CREATE POLICY "Public Read phone-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'phone-images');

-- 4. Policy agar user yang login (admin) bisa upload foto
CREATE POLICY "Authenticated Upload phone-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'phone-images');

-- 5. Policy agar user yang login bisa update foto
CREATE POLICY "Authenticated Update phone-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'phone-images');

-- 6. Policy agar user yang login bisa menghapus foto
CREATE POLICY "Authenticated Delete phone-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'phone-images');

-- ============================================================
-- 7. Update data alamat dan Google Maps toko HPSEC
-- ============================================================
UPDATE site_settings
SET 
  alamat_jalan = 'Jl. Bumi Cikarang Makmur',
  alamat_kelurahan = 'Sukadami',
  alamat_kecamatan = 'Cikarang Selatan',
  alamat_kabupaten = 'Kabupaten Bekasi',
  alamat_provinsi = 'Jawa Barat 17530',
  jam_buka = 'Setiap Hari 09.00 - 21.00 WIB',
  maps_url = 'https://maps.app.goo.gl/x9Vq41rede3bh5yYA',
  maps_embed = 'https://www.google.com/maps?q=-6.3557502,107.1079537&hl=id&z=17&output=embed'
WHERE id = 1;
