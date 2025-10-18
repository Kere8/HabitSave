import { supabase } from './supabaseClient.js';

// Signup: registers a new user
export async function signup(email, password, full_name = null) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // extract user (v2 returns data.user)
    const user = data?.user || null;

    // If signUp returned a session (user is signed in immediately), attempt to create profile now.
    // Otherwise, profile creation will be attempted on first successful login.
    if (user && user.id) {
      try {
        // check current session
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData?.session || null;
        if (session) {
          await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            full_name: full_name || null,
            created_at: new Date()
          });
        } else {
          // no active session yet; caller should rely on login flow to create profile
        }
      } catch (insertErr) {
        return { data, user, insertError: insertErr };
      }
    }

    return { data, user };
  } catch (err) {
    return { error: err };
  }
}

// Login: authenticates user and returns session
export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // After login, ensure profile exists; create if missing
    const user = data?.user || null;
    if (user && user.id) {
      try {
        const { data: profileData, error: profileErr } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profileErr && profileErr.code === 'PGRST116') {
          // not found - insert
          await supabase.from('profiles').insert({ id: user.id, email: user.email, created_at: new Date() });
        }
      } catch (err2) {
        console.warn('Error ensuring profile', err2);
      }
    }
    return { data };
  } catch (err) {
    return { error: err };
  }
}

// Logout
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return {};
  } catch (err) {
    return { error: err };
  }
}

// Expose onAuthStateChange to allow the app to react to changes
export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => callback(event, session));
}

// Helper: get current session
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
}

// Fetch profile by user id
export async function getProfile(userId) {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) throw error;
    return { data };
  } catch (err) {
    return { error: err };
  }
}

// For debugging, attach supabase to window in dev
if (typeof window !== 'undefined') {
  window.supabase = supabase;
}
