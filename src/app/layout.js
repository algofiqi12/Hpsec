import './globals.css';

export const metadata = {
  metadataBase: new URL('https://hpsec.id'),
  title: {
    default: 'HPSEC - Jual Beli HP Second di Cikarang',
    template: '%s | HPSEC',
  },
  description:
    'Jual beli dan tukar tambah HP second di Cikarang. Unit dicek, bergaransi, harga terjangkau. Chat WhatsApp HPSEC sekarang.',
  keywords: [
    'HP second Cikarang',
    'jual beli HP bekas',
    'tukar tambah HP',
    'HP second bergaransi',
    'HPSEC',
    'HP second Bekasi',
  ],
  openGraph: {
    title: 'HPSEC - Jual Beli HP Second di Cikarang',
    description:
      'Jual beli dan tukar tambah HP second di Cikarang. Unit dicek, bergaransi, harga terjangkau.',
    url: 'https://hpsec.id',
    siteName: 'HPSEC',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HPSEC - Jual Beli HP Second di Cikarang',
    description:
      'Jual beli dan tukar tambah HP second di Cikarang. Unit dicek, bergaransi, harga terjangkau.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://hpsec.id',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobilePhoneStore',
    name: 'HPSEC',
    url: 'https://hpsec.id',
    telephone: '+6281326511633',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cikarang Selatan',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID',
    },
    description:
      'Jual beli dan tukar tambah HP second di Cikarang. Unit dicek, bergaransi, harga terjangkau.',
  };

  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
