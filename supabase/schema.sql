-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Contact form submissions
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  service text,
  budget text,
  message text,
  page_source text,
  status text default 'new',
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table contact_submissions enable row level security;

-- Allow anonymous inserts (for the contact form)
create policy "Allow anonymous inserts"
  on contact_submissions
  for insert
  to anon
  with check (true);

-- Only authenticated users (admin) can read submissions
create policy "Allow authenticated reads"
  on contact_submissions
  for select
  to authenticated
  using (true);
