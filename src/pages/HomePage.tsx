import { useCallback, useState } from 'react';
import { ArrowDown, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ParticipantSearch } from '../features/participant-search/ParticipantSearch';
import { WelcomeAnimation } from '../features/welcome-animation/WelcomeAnimation';
import type { Participant } from '../types';

export function HomePage() {
  const [selected, setSelected] = useState<Participant | null>(null);
  const navigate = useNavigate();
  const done = useCallback(() => {
    if (selected) navigate(`/hasil/${selected.id}`, { state: { participant: selected } });
  }, [navigate, selected]);
  return <><section className="home-hero px-5"><div className="home-hero-content"><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-bold text-[#725315] shadow-sm"><MapPin size={15}/> Yogyakarta · 2026</div><p className="font-semibold uppercase tracking-[.18em] text-[#8b6214]">Pertemuan Konseptor Pidato Pemerintahan</p><h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#0d2c52] sm:text-6xl">Temukan Meja Diskusi Anda</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-700">Selamat datang. Temukan meja diskusi Anda, lalu bersiaplah berjumpa dengan rekan-rekan baru dari berbagai daerah.</p><button className="btn btn-primary mt-8" onClick={()=>document.querySelector('#pencarian')?.scrollIntoView({behavior:'smooth'})}>Temukan Meja Saya <ArrowDown size={18}/></button></div></section><div className="px-5 py-16"><ParticipantSearch onFound={setSelected}/></div>{selected&&<WelcomeAnimation participant={selected} onDone={done}/>}</>;
}
