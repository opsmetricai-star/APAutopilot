create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  vendor text not null,
  invoice_number text not null,
  amount numeric(14,2) not null,
  status text not null default 'Needs review',
  created_at timestamptz not null default now()
);
alter table public.invoices enable row level security;
create policy "own invoices select" on public.invoices for select using (auth.uid() = user_id);
create policy "own invoices insert" on public.invoices for insert with check (auth.uid() = user_id);
create policy "own invoices update" on public.invoices for update using (auth.uid() = user_id);
create policy "own invoices delete" on public.invoices for delete using (auth.uid() = user_id);

create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'none',
  status text not null default 'inactive',
  updated_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;
create policy "own subscription select" on public.subscriptions for select using (auth.uid() = user_id);
-- Writes to subscriptions happen only via service role after verified payment.
