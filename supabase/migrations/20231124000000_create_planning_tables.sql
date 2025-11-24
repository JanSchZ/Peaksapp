-- Create plans table
create table public.plans (
  id uuid not null default gen_random_uuid(),
  coach_id uuid references auth.users not null,
  athlete_id uuid references auth.users,
  title text not null,
  start_date date not null,
  end_date date,
  goal text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);

-- Create plan_weeks table
create table public.plan_weeks (
  id uuid not null default gen_random_uuid(),
  plan_id uuid references public.plans on delete cascade not null,
  week_number int not null,
  focus text,
  volume_tier text, -- 'High', 'Medium', 'Low', 'Deload'
  created_at timestamptz default now(),
  primary key (id)
);

-- Create plan_days table
create table public.plan_days (
  id uuid not null default gen_random_uuid(),
  week_id uuid references public.plan_weeks on delete cascade not null,
  day_of_week int not null, -- 0 (Sunday) to 6 (Saturday)
  date date not null,
  workout_data jsonb, -- Stores { title: "Squat", volume: "4000kg", exercises: [...] }
  is_rest_day boolean default false,
  created_at timestamptz default now(),
  primary key (id)
);

-- Enable RLS
alter table public.plans enable row level security;
alter table public.plan_weeks enable row level security;
alter table public.plan_days enable row level security;

-- Policies (Simplified for now: Users can see/edit their own stuff)
create policy "Users can view plans they created or are assigned to"
  on public.plans for select
  using (auth.uid() = coach_id or auth.uid() = athlete_id);

create policy "Coaches can insert plans"
  on public.plans for insert
  with check (auth.uid() = coach_id);

create policy "Coaches can update their plans"
  on public.plans for update
  using (auth.uid() = coach_id);

-- Policies for weeks (cascade from plan)
create policy "Users can view weeks for visible plans"
  on public.plan_weeks for select
  using (exists (
    select 1 from public.plans
    where plans.id = plan_weeks.plan_id
    and (plans.coach_id = auth.uid() or plans.athlete_id = auth.uid())
  ));

create policy "Coaches can manage weeks"
  on public.plan_weeks for all
  using (exists (
    select 1 from public.plans
    where plans.id = plan_weeks.plan_id
    and plans.coach_id = auth.uid()
  ));

-- Policies for days (cascade from week -> plan)
create policy "Users can view days for visible plans"
  on public.plan_days for select
  using (exists (
    select 1 from public.plan_weeks
    join public.plans on plans.id = plan_weeks.plan_id
    where plan_weeks.id = plan_days.week_id
    and (plans.coach_id = auth.uid() or plans.athlete_id = auth.uid())
  ));

create policy "Coaches can manage days"
  on public.plan_days for all
  using (exists (
    select 1 from public.plan_weeks
    join public.plans on plans.id = plan_weeks.plan_id
    where plan_weeks.id = plan_days.week_id
    and plans.coach_id = auth.uid()
  ));
