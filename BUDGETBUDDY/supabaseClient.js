import { createClient } from '@supabase/supabase-js';

// Prefer environment variables (Vite: import.meta.env.VITE_*) when available
const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) || process.env.SUPABASE_URL || 'https://nuifujrrvxthtjhzoykd.supabase.co';
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51aWZ1anJydnh0aHRqaHpveWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzQwNTIsImV4cCI6MjA3NTM1MDA1Mn0.OtMxA8M3h2kI-ylHEhK7PWOtJmAA8QTEW0o-P8ncsBA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
