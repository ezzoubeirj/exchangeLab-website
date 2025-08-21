create table public.languages (
  id uuid not null default extensions.uuid_generate_v4 (),
  name public.languages_enum not null,
  description text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint languages_pkey primary key (id),
  constraint languages_name_key unique (name)
) TABLESPACE pg_default;

create table public.leads (
  id uuid not null default extensions.uuid_generate_v4 (),
  email text null,
  phone text null,
  created_at timestamp with time zone null default now(),
  test_completed boolean null default false,
  test_score integer null,
  test_completion_date timestamp with time zone null default (now() AT TIME ZONE 'utc'::text),
  status public.lead_status null default 'pending'::lead_status,
  level_id uuid null,
  session_id uuid null,
  session_date date null default CURRENT_DATE,
  last_name text not null default ''::text,
  first_name text not null default ''::text,
  updated_at timestamp with time zone null default now(),
  is_active boolean null default true,
  whatsapp_initial_message_sent boolean null default false,
  is_synch boolean null default false,
  use_existing_class boolean null default false,
  existing_class_id uuid null,
  manual_class_code text null,
  language_id uuid null,
  audience_type public.audience_type null,
  constraint leads_pkey primary key (id),
  constraint unique_email unique (email),
  constraint leads_existing_class_id_fkey foreign KEY (existing_class_id) references classes (id),
  constraint leads_language_id_fkey foreign KEY (language_id) references languages (id) on delete set null,
  constraint leads_level_id_fkey foreign KEY (level_id) references levels (id) on delete set null,
  constraint leads_session_id_fkey foreign KEY (session_id) references sessions (id)
) TABLESPACE pg_default;

create table public.levels (
  id uuid not null default extensions.uuid_generate_v4 (),
  language_id uuid not null,
  audience_type public.audience_type not null,
  name text not null,
  description text null,
  order_sequence integer not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint levels_pkey primary key (id),
  constraint unique_level unique (language_id, audience_type, name),
  constraint levels_language_id_fkey foreign KEY (language_id) references languages (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.submissions (
  id uuid not null default extensions.uuid_generate_v4 (),
  wp_submission_id text null,
  email text null,
  phone text null,
  firstname text null,
  lastname text null,
  form_data jsonb null,
  is_converted boolean not null default false,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  is_active boolean null default true,
  is_synch boolean not null default false,
  country text null,
  age integer null,
  parent_name text null,
  parent_email text null,
  parent_whatsapp text null,
  language text null,
  reason text null,
  constraint submissions_pkey primary key (id),
  constraint submissions_wp_submission_id_key unique (wp_submission_id)
) TABLESPACE pg_default;

-- the function that causes the call

create or replace function public.create_lead_from_exchangelabui(
  p_email text,
  p_phone text,
  p_firstname text,
  p_lastname text,
  p_language text,
  p_level text,
  p_audience_type text,
  p_score integer
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_language_id uuid;
  v_level_id uuid;
  v_lead_id uuid;
  v_audience_type public.audience_type;
begin
  -- Cast text to enum
  v_audience_type := p_audience_type::public.audience_type;

  -- Add explicit cast for language enum
  select id into v_language_id from languages where name = p_language::public.languages_enum;
  if v_language_id is null then
    return jsonb_build_object('error', 'Language not found');
  end if;

  select id into v_level_id from levels where name = p_level and language_id = v_language_id and audience_type = v_audience_type;
  if v_level_id is null then
    return jsonb_build_object('error', 'Level not found');
  end if;

  insert into leads (
    email, phone, test_completed, test_score, test_completion_date,
    level_id, last_name, first_name, is_synch, language_id, audience_type
  ) values (
    p_email, p_phone, true, p_score, now(),
    v_level_id, p_lastname, p_firstname, true, v_language_id, v_audience_type
  ) returning id into v_lead_id;

   -- Delete matching submission
  delete from submissions
  where email = p_email
    and firstname = p_firstname
    and lastname = p_lastname;

  return jsonb_build_object('lead_id', v_lead_id);
end;
$$;

-- Update the grant to match new signature
grant execute on function public.create_lead_from_exchangelabui(
  text, text, text, text, text, text, text, integer
) to public;