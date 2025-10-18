Steps to create the `profiles` table and RLS policy in Supabase

1. Open your Supabase project dashboard and go to the SQL Editor.

2. Run the following SQL to create the `profiles` table:

```sql
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now()
);
```

3. Enable Row Level Security (RLS) for the `profiles` table:

```sql
alter table profiles enable row level security;
```

4. Create a policy that allows users to select/insert/update/delete only their own profile row:

```sql
create policy "Users can view and edit their own profile"
  on profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);
```

5. Optionally, create a `profiles` record when a user signs up automatically by using a database trigger or via your application code. The project code (auth.js) already inserts a row after signup.

6. Test it:
- Use the app to sign up a user. Check the Supabase Auth > Users list to confirm the account exists.
- In the Table Editor, open the `profiles` table and confirm a row with the same id exists.

Notes:
- Make sure your anon public key has the necessary permissions — the anon key can insert into tables if RLS policies allow it for the authenticated user.
- For production, do not expose service_role keys on the client. Use server-side functions for privileged operations.
