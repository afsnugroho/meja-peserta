# Menyiapkan Supabase

1. Buat proyek baru di Supabase dan simpan kata sandi database dengan aman.
2. Buka **SQL Editor**, salin isi `supabase/migrations/202607140001_initial.sql`, lalu jalankan sekali. Skrip membuat tabel, indeks, pengamanan RLS, dan fungsi pencarian terbatas.
3. Buka **Authentication → Providers** dan pastikan Email aktif. Matikan pendaftaran publik bila akun admin hanya dibuat oleh panitia.
4. Buka **Authentication → Users → Add user**, lalu buat akun admin. Setiap akun terautentikasi dianggap admin oleh kebijakan saat ini, jadi hanya buat akun untuk pengelola tepercaya.
5. Buka **Project Settings → API**. Salin Project URL dan anon/public key ke `.env`:

   ```text
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```

6. Jangan pernah memasukkan `service_role` key ke `.env` frontend, GitHub, atau Vercel.
7. Uji pencarian sebagai pengguna umum. Pengguna anonim tidak boleh dapat membaca tabel `participants` secara langsung; mereka hanya dapat menjalankan tiga fungsi yang mengembalikan satu hasil atau maksimal lima kandidat.

Untuk lingkungan produksi dengan trafik besar, tambahkan rate limiting pada gateway/Edge Function Supabase. RPC saat ini sudah membatasi panjang minimum pencarian nama dan jumlah hasil, tetapi tidak menggantikan pembatasan per alamat IP.
