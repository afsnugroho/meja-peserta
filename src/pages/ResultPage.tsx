import { Copy, Search, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getParticipant } from '../lib/supabase/api';
import type { Participant } from '../types';
export function ResultPage() {
  const { participantId } = useParams();
  const location = useLocation();
  const [participant, setParticipant] = useState<Participant | null>(
    (location.state as { participant?: Participant } | null)?.participant ?? null,
  );
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!participant && participantId)
      getParticipant(participantId)
        .then(setParticipant)
        .catch(() =>
          setMessage('Data belum dapat dimuat. Periksa koneksi internet, lalu coba kembali.'),
        );
  }, [participant, participantId]);
  async function share() {
    if (!participant) return;
    const text = `Halo, ${participant.name}! Besok Anda akan bergabung di MEJA ${participant.table_number}. Dari Yogyakarta, Menyatukan Narasi Bangsa. 🇮🇩`;
    if (navigator.share) await navigator.share({ title: 'Meja Diskusi Saya', text });
    else {
      await navigator.clipboard.writeText(text);
      setMessage('Hasil berhasil disalin.');
    }
  }
  if (!participant)
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">{message || 'Memuat hasil...'}</div>
    );
  return (
    <section className="mx-auto max-w-2xl px-5 py-12">
      <div className="card overflow-hidden">
        <div className="bg-[#0d2c52] px-6 py-8 text-center text-white">
          <p className="text-lg">Halo, {participant.name}</p>
          <p className="mt-2 text-white/70">Besok Anda akan bergabung di</p>
          <div className="mt-5 text-5xl font-black text-[#f1cb70] sm:text-7xl">
            MEJA {participant.table_number}
          </div>
        </div>
        <div className="space-y-5 p-6 text-center sm:p-10">
          <p className="text-xl font-bold text-[#0d2c52]">
            Selamat berjumpa dengan rekan-rekan baru.
          </p>
          <p className="leading-7 text-slate-600">
            Semoga satu meja menjadi awal dari banyak kolaborasi.
            <br />
            Mari saling mengenal, saling menginspirasi, dan pulang membawa jejaring baru.
          </p>
          <div className="rounded-xl bg-[#f8f5ed] p-4 text-left text-sm">
            <p>
              <b>Nama:</b> {participant.name}
            </p>
            <p>
              <b>Daerah asal:</b> {participant.region || participant.province}
            </p>
          </div>
          <p className="font-bold text-[#a77a22]">Dari Yogyakarta, Menyatukan Narasi Bangsa. 🇮🇩</p>
          {message && (
            <p className="text-sm text-emerald-700">
              <Copy className="inline" size={15} /> {message}
            </p>
          )}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn btn-secondary">
              <Search size={18} /> Cari Peserta Lain
            </Link>
            <button className="btn btn-primary" onClick={share}>
              <Share2 size={18} /> Bagikan Hasil
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
