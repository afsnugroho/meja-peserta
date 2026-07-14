create extension if not exists pg_trgm;
create table public.participants (
  id uuid primary key default gen_random_uuid(),
  participant_id text unique not null,
  name text not null,
  institution text,
  region text,
  province text not null,
  table_number integer not null check (table_number > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index participants_id_ci_unique on public.participants (lower(participant_id));
create index participants_participant_id_idx on public.participants (participant_id);
create index participants_name_lower_idx on public.participants (lower(name));
create index participants_name_trgm_idx on public.participants using gin (lower(name) gin_trgm_ops);
create index participants_province_idx on public.participants (province);
create index participants_table_number_idx on public.participants (table_number);
create function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at=now(); return new; end $$;
create trigger participants_updated_at before update on public.participants for each row execute function public.set_updated_at();
alter table public.participants enable row level security;
create policy "authenticated admins can read" on public.participants for select to authenticated using (true);
create policy "authenticated admins can insert" on public.participants for insert to authenticated with check (true);
create policy "authenticated admins can update" on public.participants for update to authenticated using (true) with check (true);
create policy "authenticated admins can delete" on public.participants for delete to authenticated using (true);
create function public.find_participant_by_id(search_id text) returns table(id uuid,participant_id text,name text,institution text,region text,province text,table_number integer) language sql security definer stable set search_path=public as $$ select p.id,p.participant_id,p.name,p.institution,p.region,p.province,p.table_number from participants p where lower(p.participant_id)=lower(trim(search_id)) limit 1 $$;
create function public.search_participants_by_name(search_name text) returns table(id uuid,participant_id text,name text,institution text,region text,province text,table_number integer) language sql security definer stable set search_path=public as $$ select p.id,p.participant_id,p.name,p.institution,p.region,p.province,p.table_number from participants p where length(trim(search_name))>=3 and lower(p.name) like '%'||lower(trim(search_name))||'%' order by similarity(lower(p.name),lower(trim(search_name))) desc,p.name limit 5 $$;
create function public.get_public_participant(public_id uuid) returns table(id uuid,participant_id text,name text,institution text,region text,province text,table_number integer) language sql security definer stable set search_path=public as $$ select p.id,p.participant_id,p.name,p.institution,p.region,p.province,p.table_number from participants p where p.id=public_id limit 1 $$;
revoke all on function public.find_participant_by_id(text) from public; revoke all on function public.search_participants_by_name(text) from public; revoke all on function public.get_public_participant(uuid) from public;
grant execute on function public.find_participant_by_id(text) to anon,authenticated; grant execute on function public.search_participants_by_name(text) to anon,authenticated; grant execute on function public.get_public_participant(uuid) to anon,authenticated;
