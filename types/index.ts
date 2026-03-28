export type RequestStatus = 'open' | 'accepted' | 'played' | 'rejected';

export type EventRecord = {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  max_open_per_guest: number;
  owner_id: string;
  created_at: string;
};

export type SongRequestRecord = {
  id: string;
  event_id: string;
  guest_name: string;
  song_title: string;
  artist: string;
  note: string | null;
  status: RequestStatus;
  created_at: string;
};
