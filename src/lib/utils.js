import siteData from '@/data/site.json';

/**
 * Format harga ke format Rupiah Indonesia
 * @param {number} harga
 * @returns {string}
 */
export function formatHarga(harga) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(harga);
}

/**
 * Generate WhatsApp link dengan pesan otomatis
 * @param {string} pesan
 * @returns {string}
 */
export function waLink(pesan = 'Halo HPSEC, saya ingin bertanya tentang HP second.') {
  return `https://wa.me/${siteData.wa}?text=${encodeURIComponent(pesan)}`;
}

/**
 * Generate WA link untuk produk tertentu
 * @param {object} phone
 * @returns {string}
 */
export function waLinkProduk(phone) {
  const pesan = `Halo HPSEC, saya tertarik dengan ${phone.nama} (${phone.warna}). Apakah masih tersedia?`;
  return waLink(pesan);
}

/**
 * Generate WA link untuk jual HP
 * @returns {string}
 */
export function waLinkJual() {
  return waLink('Halo HPSEC, saya ingin menjual HP saya. Merek/tipe: ... Kondisi: ...');
}

/**
 * Generate WA link untuk tukar tambah
 * @returns {string}
 */
export function waLinkTukarTambah() {
  return waLink('Halo HPSEC, saya ingin tukar tambah. HP saya: ... Saya tertarik dengan: ...');
}

/**
 * Dapatkan CSS class untuk badge kondisi
 * @param {string} kondisi
 * @returns {string}
 */
export function kondisiBadgeClass(kondisi) {
  switch (kondisi) {
    case 'Mulus': return 'badge--mulus';
    case 'Normal': return 'badge--normal';
    case 'Ada minus': return 'badge--minus';
    default: return 'badge--normal';
  }
}

/**
 * Format alamat dari site.json
 * @returns {string}
 */
export function formatAlamat() {
  const a = siteData.alamat;
  const parts = [a.jalan, a.kelurahan, a.kecamatan, a.kabupaten, a.provinsi].filter(Boolean);
  return parts.join(', ');
}
