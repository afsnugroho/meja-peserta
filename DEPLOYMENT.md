# Menerbitkan ke Vercel

1. Buat repositori GitHub baru, lalu kirim seluruh isi folder proyek. Pastikan `.env` tidak ikut terkirim.
2. Di Vercel pilih **Add New → Project**, lalu pilih repositori tersebut.
3. Vercel akan mengenali Vite. Build command adalah `npm run build` dan output directory adalah `dist`.
4. Pada **Settings → Environment Variables**, tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` untuk Production, Preview, dan Development.
5. Tekan **Deploy**. Berkas `vercel.json` memastikan tautan seperti `/hasil/...` dan `/admin` tetap bekerja saat dimuat langsung.
6. Setelah selesai, buka domain Vercel dan uji pencarian ID, pencarian nama, login admin, impor file kecil, serta tampilan ponsel.
7. Setiap perubahan berikutnya yang dikirim ke GitHub akan mendapat preview deployment. Gabungkan ke cabang produksi setelah preview lulus pemeriksaan.
