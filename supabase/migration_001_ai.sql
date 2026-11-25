-- Run once in the Supabase SQL Editor (adds AI extraction columns).
alter table public.invoices
  add column if not exists currency text not null default 'USD',
  add column if not exists invoice_date date,
  add column if not exists due_date date,
  add column if not exists po_number text,
  add column if not exists source text not null default 'manual',
  add column if not exists confidence numeric,
  add column if not exists extracted jsonb;
create index if not exists invoices_user_month_idx on public.invoices (user_id, source, created_at);
