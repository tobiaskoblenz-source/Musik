import { createServerSupabase } from '@/lib/supabase';
import DashboardClient from '@/components/DashboardClient';

export default async function DashboardPage() {
  const supabase = createServerSupabase();
  const { data: requests } = await supabase
    .from('requests')
    .select('id,guest_name,song_title,artist,status,created_at,events(name,code)')
    .order('created_at', { ascending: false })
    .limit(50);

  return <DashboardClient initialRequests={(requests as any[]) || []} />;
}
