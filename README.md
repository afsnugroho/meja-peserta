# Temukan Meja Diskusi Anda

Aplikasi penyambutan digital untuk membantu peserta Pertemuan Konseptor Pidato Pemerintahan menemukan meja diskusinya. Antarmuka dibuat terutama untuk ponsel, menggunakan bahasa Indonesia, pencarian aman melalui fungsi Supabase, pengalaman kejutan, serta ruang admin untuk mengelola dan mengimpor data.

## Menjalankan di komputer

1. Pasang Node.js 20 atau lebih baru.
2. Salin `.env.example` menjadi `.env`, lalu isi dua nilai dari Supabase.
3. Jalankan `npm install`.
4. Jalankan `npm run dev`, lalu buka alamat yang tampil.

Pemeriksaan kualitas: `npm run lint`, `npm run type-check`, `npm run test`, dan `npm run build`.

## Struktur utama

- `src/features`: pencarian, animasi, dan fitur admin.
- `src/lib`: akses Supabase dan pemrosesan Excel.
- `src/pages`: halaman untuk setiap rute.
- `src/routes`: perlindungan halaman admin.
- `supabase/migrations`: tabel, indeks, RLS, dan fungsi pencarian publik.
- `tests`: pengujian logika serta tampilan.

Data peserta tidak disimpan di penyimpanan browser. Kunci `service_role` tidak digunakan oleh frontend.

Lanjutkan ke [SUPABASE_SETUP.md](SUPABASE_SETUP.md) dan [DEPLOYMENT.md](DEPLOYMENT.md).
