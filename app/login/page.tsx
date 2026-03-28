'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
    setMessage(error ? error.message : 'Magic Link wurde gesendet.');
  }

  return (
    <main className="guest-page">
      <div className="guest-wrap">
        <div className="guest-head">
          <div className="guest-logo">🎧</div>
          <h1 className="guest-title">DJ-Login</h1>
          <p className="guest-sub">Melde dich per Magic Link an.</p>
        </div>

        <div className="panel guest-card">
          <form className="guest-form" onSubmit={login}>
            <div>
              <label className="label">E-Mail</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button className="btn btn-primary" type="submit">Magic Link senden</button>
            {message ? <div className="guest-success">{message}</div> : null}
          </form>
        </div>
      </div>
    </main>
  );
}
