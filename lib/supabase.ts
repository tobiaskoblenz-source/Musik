import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function createBrowserSupabase() {
  return createClient(url, anon);
}

export function createServerSupabase() {
  return createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });
}
