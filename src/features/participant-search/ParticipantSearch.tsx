import { useEffect, useState } from 'react';
import { Search, UserRound } from 'lucide-react';
import { findById, searchByName } from '../../lib/supabase/api';
import type { Participant } from '../../types';
export function ParticipantSearch({ onFound }: { onFound: (p: Participant) => void }) {
  const [mode, setMode] = useState<'id' | 'name'>('id');
  const [value, setValue] = useState('');
  const [results, setResults] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (mode !== 'name' || value.trim().length < 3) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      setMessage('');
      try {
        const found = await searchByName(value);
        setResults(found.slice(0, 5));
        if (!found.length)
          setMessage('Peserta belum ditemukan. Periksa kembali ID atau ejaan nama Anda.');
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Pencarian belum dapat dilakukan.');
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [mode, value]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === 'name') return;
    setLoading(true);
    setMessage('');
    try {
      const found = await findById(value);
      if (found) onFound(found);
      else setMessage('Peserta belum ditemukan. Periksa kembali ID atau ejaan nama Anda.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Pencarian belum dapat dilakukan.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <section id="pencarian" className="card mx-auto max-w-xl p-5 sm:p-8">
      <div className="mb-5 flex rounded-full bg-slate-100 p-1" role="tablist">
        <button
          className={`flex-1 rounded-full px-3 py-2 text-sm font-bold ${mode === 'id' ? 'bg-white text-[#0d2c52] shadow-sm' : 'text-slate-500'}`}
          onClick={() => {
            setMode('id');
            setValue('');
            setMessage('');
          }}
        >
          Berdasarkan ID
        </button>
        <button
          className={`flex-1 rounded-full px-3 py-2 text-sm font-bold ${mode === 'name' ? 'bg-white text-[#0d2c52] shadow-sm' : 'text-slate-500'}`}
          onClick={() => {
            setMode('name');
            setValue('');
            setMessage('');
          }}
        >
          Berdasarkan Nama
        </button>
      </div>
      <form onSubmit={submit}>
        <label className="label" htmlFor="search">
          {mode === 'id' ? 'Nomor ID Peserta' : 'Nama Peserta'}
        </label>
        <div className="flex gap-2">
          <input
            id="search"
            className="field"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={mode === 'id' ? 'Contoh: DIY-007 atau 001' : 'Ketik minimal 3 karakter'}
            autoComplete="off"
          />
          <button
            className="btn btn-primary !px-4"
            disabled={loading || !value.trim()}
            aria-label="Cari"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      {loading && <p className="mt-4 text-sm text-slate-500">Sedang mencari...</p>}
      {message && (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <p>{message}</p>
          <button
            className="mt-2 font-bold underline"
            onClick={() => {
              setValue('');
              setMessage('');
            }}
          >
            Coba Lagi
          </button>
        </div>
      )}
      {results.length > 0 && (
        <ul className="mt-4 space-y-2">
          {results.map((p) => (
            <li key={p.id}>
              <button
                className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-[#b48a31]"
                onClick={() => onFound(p)}
              >
                <UserRound className="text-[#b48a31]" />
                <span>
                  <strong className="block text-[#0d2c52]">{p.name}</strong>
                  <small className="text-slate-500">{p.region || p.province}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
