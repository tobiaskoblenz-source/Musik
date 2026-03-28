import { createServerSupabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import GuestRequestForm from '@/components/GuestRequestForm';

export default async function GuestEventPage({ params }: { params: { eventCode: string } }) {
  const supabase = createServerSupabase();
  const { data: event } = await supabase
    .from('events')
    .select('id,name,code,is_active')
    .eq('code', params.eventCode)
    .single();

  if (!event) notFound();

  return (
    <main className="guest-page">
      <div className="guest-wrap">
        <div className="guest-head">
          <div className="guest-logo">🎧</div>
          <h1 className="guest-title">Songwunsch</h1>
          <p className="guest-sub">{event.name}</p>
          <div className="guest-badge-wrap">
            <span className="badge badge-soft">Live beim DJ</span>
          </div>
        </div>

        <div className="panel guest-card">
          <GuestRequestForm eventCode={event.code} disabled={!event.is_active} />
        </div>
      </div>
    </main>
  );
}
