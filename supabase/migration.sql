-- ============================================
-- HPSEC Database Migration
-- Jalankan di Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Tabel phones
CREATE TABLE IF NOT EXISTS phones (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  merek TEXT NOT NULL,
  warna TEXT NOT NULL,
  storage TEXT DEFAULT '',
  ram TEXT DEFAULT '',
  harga INTEGER NOT NULL DEFAULT 0,
  kondisi TEXT NOT NULL DEFAULT 'Normal' CHECK (kondisi IN ('Mulus', 'Normal', 'Ada minus')),
  kelengkapan TEXT NOT NULL DEFAULT '',
  garansi TEXT DEFAULT '',
  deskripsi TEXT DEFAULT '',
  foto TEXT DEFAULT '',
  unggulan BOOLEAN DEFAULT false,
  tersedia BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabel foto galeri per unit
CREATE TABLE IF NOT EXISTS phone_photos (
  id BIGSERIAL PRIMARY KEY,
  phone_id TEXT REFERENCES phones(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabel site settings (1 row saja)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  nama TEXT DEFAULT 'HPSEC',
  domain TEXT DEFAULT 'https://hpsec.id',
  wa TEXT DEFAULT '6281326511633',
  wa_tampil TEXT DEFAULT '0813-2651-1633',
  alamat_jalan TEXT DEFAULT 'Jl. Bumi Cikarang Makmur',
  alamat_kelurahan TEXT DEFAULT 'Sukadami',
  alamat_kecamatan TEXT DEFAULT 'Cikarang Selatan',
  alamat_kabupaten TEXT DEFAULT 'Kabupaten Bekasi',
  alamat_provinsi TEXT DEFAULT 'Jawa Barat 17530',
  jam_buka TEXT DEFAULT 'Setiap Hari 09.00 - 21.00 WIB',
  maps_url TEXT DEFAULT 'https://maps.app.goo.gl/x9Vq41rede3bh5yYA',
  maps_embed TEXT DEFAULT 'https://www.google.com/maps?q=-6.3557502,107.1079537&hl=id&z=17&output=embed',
  sosial_instagram TEXT DEFAULT '',
  sosial_tiktok TEXT DEFAULT '',
  sosial_facebook TEXT DEFAULT '',
  sosial_tokopedia TEXT DEFAULT '',
  sosial_shopee TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default site settings
INSERT INTO site_settings (id, alamat_jalan, alamat_kelurahan, alamat_kecamatan, alamat_kabupaten, alamat_provinsi, jam_buka, maps_url, maps_embed)
VALUES (1, 'Jl. Bumi Cikarang Makmur', 'Sukadami', 'Cikarang Selatan', 'Kabupaten Bekasi', 'Jawa Barat 17530', 'Setiap Hari 09.00 - 21.00 WIB', 'https://maps.app.goo.gl/x9Vq41rede3bh5yYA', 'https://www.google.com/maps?q=-6.3557502,107.1079537&hl=id&z=17&output=embed')
ON CONFLICT (id) DO UPDATE SET
  alamat_jalan = EXCLUDED.alamat_jalan,
  maps_url = EXCLUDED.maps_url,
  maps_embed = EXCLUDED.maps_embed,
  jam_buka = EXCLUDED.jam_buka;

-- 4. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER phones_updated_at
  BEFORE UPDATE ON phones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. Row Level Security (RLS)

-- Phones: semua orang bisa baca, hanya authenticated user bisa write
ALTER TABLE phones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Phones: public read" ON phones
  FOR SELECT USING (true);

CREATE POLICY "Phones: auth insert" ON phones
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Phones: auth update" ON phones
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Phones: auth delete" ON phones
  FOR DELETE USING (auth.role() = 'authenticated');

-- Phone photos: sama seperti phones
ALTER TABLE phone_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Photos: public read" ON phone_photos
  FOR SELECT USING (true);

CREATE POLICY "Photos: auth insert" ON phone_photos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Photos: auth update" ON phone_photos
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Photos: auth delete" ON phone_photos
  FOR DELETE USING (auth.role() = 'authenticated');

-- Site settings: semua bisa baca, authenticated bisa update
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site: public read" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Site: auth update" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 6. Indexes
CREATE INDEX IF NOT EXISTS idx_phones_merek ON phones(merek);
CREATE INDEX IF NOT EXISTS idx_phones_tersedia ON phones(tersedia);
CREATE INDEX IF NOT EXISTS idx_phones_unggulan ON phones(unggulan);
CREATE INDEX IF NOT EXISTS idx_phone_photos_phone_id ON phone_photos(phone_id);

-- 7. Storage bucket untuk foto HP + Policy RLS
INSERT INTO storage.buckets (id, name, public)
VALUES ('phone-images', 'phone-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Hapus policy lama jika ada untuk mencegah error duplikasi
DROP POLICY IF EXISTS "Public Read phone-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload phone-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update phone-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete phone-images" ON storage.objects;

-- Policy agar siapa saja bisa melihat foto di website
CREATE POLICY "Public Read phone-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'phone-images');

-- Policy agar user admin (authenticated) bisa upload foto
CREATE POLICY "Authenticated Upload phone-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'phone-images');

-- Policy agar user admin bisa update foto
CREATE POLICY "Authenticated Update phone-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'phone-images');

-- Policy agar user admin bisa hapus foto
CREATE POLICY "Authenticated Delete phone-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'phone-images');

-- 8. Seed data awal (contoh)
INSERT INTO phones (id, nama, merek, warna, storage, ram, harga, kondisi, kelengkapan, garansi, foto, unggulan, tersedia, deskripsi) VALUES
  ('iphone-12-64-hitam', 'iPhone 12 64GB', 'Apple', 'Hitam', '64GB', '', 5200000, 'Mulus', 'Fullset', 'Garansi toko 1 bulan', '', true, true, 'Unit mulus, baterai sehat, siap pakai.'),
  ('samsung-s21-128-biru', 'Samsung Galaxy S21 128GB', 'Samsung', 'Phantom Blue', '128GB', '8GB', 4500000, 'Normal', 'Unit + Charger', 'Garansi toko 1 bulan', '', true, true, 'Kondisi normal, layar dan body terawat.'),
  ('iphone-11-128-putih', 'iPhone 11 128GB', 'Apple', 'Putih', '128GB', '', 4800000, 'Mulus', 'Fullset', 'Garansi toko 1 bulan', '', true, true, 'Fullset, kondisi mulus, baterai masih bagus.'),
  ('xiaomi-redmi-note-12-128-hijau', 'Xiaomi Redmi Note 12 128GB', 'Xiaomi', 'Mint Green', '128GB', '6GB', 2100000, 'Ada minus', 'Unit only', 'Garansi toko 1 bulan', '', false, true, 'Ada minus lecet kecil di bagian belakang. Fungsi normal semua.'),
  ('iphone-13-128-midnight', 'iPhone 13 128GB', 'Apple', 'Midnight', '128GB', '', 7200000, 'Mulus', 'Fullset', 'Garansi toko 1 bulan', '', true, true, 'Mulus, fullset, siap pakai untuk daily driver.'),
  ('samsung-a54-128-hitam', 'Samsung Galaxy A54 128GB', 'Samsung', 'Awesome Black', '128GB', '8GB', 3200000, 'Mulus', 'Fullset', 'Garansi toko 1 bulan', '', true, false, 'Unit mulus, performa lancar.')
ON CONFLICT (id) DO NOTHING;
