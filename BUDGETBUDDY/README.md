BUD — local dev setup (Supabase)

Prereqs:
- Node.js and npm
- Supabase project (you provided the URL & anon key)

1) Install dependencies

```bash
npm install
```

2) Create .env (if using Vite) or rely on hardcoded fallback for quick testing.

3) Start a static server (or use Vite)

```bash
npm run start
# or
npx serve .
```

4) Create `profiles` table & RLS policy in the Supabase SQL editor. See `SUPABASE_SETUP.md` for exact SQL.

5) Open http://localhost:5000 (or the port your server uses) and test signup/login.

Notes:
- The project uses client-side Supabase JS. For production, use environment variables and server-side protections.
