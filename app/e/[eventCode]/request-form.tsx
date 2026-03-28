'use client';

import { FormEvent, useState } from 'react';
import { Button, Input, Textarea } from '@/components/ui';

type Props = {
  event: {
    id: string;
    name: string;
    code: string;
    is_active: boolean;
    max_open_per_guest: number;
  };
};

export default function GuestRequestForm({ event }: Props) {
  const [guestName, setGuestName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventCode: event.code,
        guestName,
        songTitle,
        artist,
        note,
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.error || 'Etwas ist schiefgelaufen.');
      return;
    }

    setSongTitle('');
    setArtist('');
    setNote('');
    setMessage('Wunsch erfolgreich gesendet.');
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <Input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Dein Name" />
      <Input value={songTitle} onChange={(e) => setSongTitle(e.target.value)} placeholder="Songtitel" />
      <Input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
      <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Notiz an den DJ (optional)" rows={4} />
      <div className="rounded-2xl border border-black/10 bg-black/5 p-3 text-sm text-black/60">
        {event.is_active ? `Maximal ${event.max_open_per_guest} offene Wünsche pro Gast.` : 'Das Event ist aktuell pausiert.'}
      </div>
      <Button disabled={loading || !event.is_active || !guestName || !songTitle || !artist}>
        {loading ? 'Sende...' : 'Wunsch senden'}
      </Button>
      {message ? <p className="text-sm text-black/65">{message}</p> : null}
    </form>
  );
}
