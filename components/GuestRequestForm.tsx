'use client';

import { useState } from 'react';

export default function GuestRequestForm({ eventCode, disabled }: { eventCode: string; disabled: boolean }) {
  const [guestName, setGuestName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventCode, guestName, songTitle, artist })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || 'Etwas ist schiefgelaufen.');
        return;
      }

      setGuestName('');
      setSongTitle('');
      setArtist('');
      setMessage('Dein Wunsch wurde abgesendet.');
    } catch {
      setLoading(false);
      setError('Etwas ist schiefgelaufen.');
    }
  }

  return (
    <form className="guest-form" onSubmit={onSubmit}>
      <div>
        <label className="label">Dein Name</label>
        <input
          className="input"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          required
          disabled={disabled || loading}
          placeholder="z. B. Laura"
        />
      </div>

      <div>
        <label className="label">Song</label>
        <input
          className="input"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          required
          disabled={disabled || loading}
          placeholder="z. B. Freed From Desire"
          autoComplete="off"
        />
      </div>

      <div>
        <label className="label">Artist</label>
        <input
          className="input"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
          disabled={disabled || loading}
          placeholder="z. B. Gala"
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={disabled || loading}>
        {disabled ? 'Aktuell pausiert' : loading ? 'Senden...' : 'Wunsch absenden'}
      </button>
      {disabled ? <div className="guest-disabled">Dieses Event nimmt aktuell keine neuen Wünsche an.</div> : null}
      {message ? <div className="guest-success">{message}</div> : null}
      {error ? <div className="guest-error">{error}</div> : null}
    </form>
  );
}
