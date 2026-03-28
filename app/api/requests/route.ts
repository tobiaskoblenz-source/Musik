import { createServerSupabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { eventCode, guestName, songTitle, artist } = await req.json();

    if (!eventCode || !guestName || !songTitle || !artist) {
      return NextResponse.json({ error: 'Bitte alle Felder ausfüllen.' }, { status: 400 });
    }

    const supabase = createServerSupabase();

    const { data: event } = await supabase
      .from('events')
      .select('id,is_active,max_open_per_guest')
      .eq('code', eventCode)
      .single();

    if (!event) {
      return NextResponse.json({ error: 'Event nicht gefunden.' }, { status: 404 });
    }

    if (!event.is_active) {
      return NextResponse.json({ error: 'Dieses Event ist pausiert.' }, { status: 400 });
    }

    const { count } = await supabase
      .from('requests')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', event.id)
      .ilike('guest_name', guestName.trim())
      .in('status', ['open', 'accepted']);

    if ((count || 0) >= event.max_open_per_guest) {
      return NextResponse.json({ error: `Maximal ${event.max_open_per_guest} offene Wünsche pro Gast.` }, { status: 400 });
    }

    const { error } = await supabase.from('requests').insert({
      event_id: event.id,
      guest_name: guestName.trim(),
      song_title: songTitle.trim(),
      artist: artist.trim(),
      status: 'open'
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
}
