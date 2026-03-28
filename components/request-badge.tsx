import { RequestStatus } from '@/types';

const map: Record<RequestStatus, string> = {
  open: '🕒 Offen',
  accepted: '✅ Angenommen',
  played: '🎵 Gespielt',
  rejected: '❌ Abgelehnt',
};

export function RequestBadge({ status }: { status: RequestStatus }) {
  return <span className="inline-flex rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium">{map[status]}</span>;
}
