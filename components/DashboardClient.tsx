'use client';

import { useMemo, useState } from 'react';

type RequestItem = {
  id: number | string;
  guest_name: string;
  song_title: string;
  artist: string;
  status: 'open' | 'accepted' | 'played' | 'rejected';
  created_at?: string;
  events?: { name?: string | null; code?: string | null } | null;
};

export default function DashboardClient({ initialRequests }: { initialRequests: RequestItem[] }) {
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'accepted' | 'played' | 'rejected'>('all');
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState('');
  const [eventName, setEventName] = useState(initialRequests[0]?.events?.name || 'Birthday Bash @ Club Room');
  const [eventCode, setEventCode] = useState(initialRequests[0]?.events?.code || 'PARTY-2026');
  const [guestLimit, setGuestLimit] = useState('3 pro Gast');
  const [eventStatus, setEventStatus] = useState('Aktiv');

  const stats = useMemo(() => ({
    total: requests.length,
    open: requests.filter((r) => r.status === 'open').length,
    accepted: requests.filter((r) => r.status === 'accepted').length,
    played: requests.filter((r) => r.status === 'played').length,
  }), [requests]);

  const filtered = useMemo(() => {
    return requests
      .filter((r) => (filter === 'all' ? true : r.status === filter))
      .filter((r) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return [r.song_title, r.artist, r.guest_name].some((v) => v.toLowerCase().includes(q));
      });
  }, [requests, filter, search]);

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 1800);
  }

  function updateStatus(id: RequestItem['id'], status: RequestItem['status']) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function saveEvent() {
    flash('Event gespeichert.');
  }

  function toggleEvent() {
    const next = eventStatus === 'Aktiv' ? 'Pausiert' : 'Aktiv';
    setEventStatus(next);
    flash(`Event ist jetzt ${next.toLowerCase()}.`);
  }

  function changeGuestLimit() {
    setGuestLimit((prev) => {
      const map: Record<string, string> = {
        '1 pro Gast': '2 pro Gast',
        '2 pro Gast': '3 pro Gast',
        '3 pro Gast': '4 pro Gast',
        '4 pro Gast': '1 pro Gast',
      };
      return map[prev] || '3 pro Gast';
    });
    flash('Gäste-Limit geändert.');
  }

  function randomizeEventCode() {
    const code = `PARTY-${Math.floor(1000 + Math.random() * 9000)}`;
    setEventCode(code);
    flash('Gast-Link wurde aktualisiert.');
  }

  function exportRequests() {
    flash(`Export gestartet: ${requests.length} Wünsche.`);
  }

  function manageBlacklist() {
    flash('Blacklist geöffnet.');
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`https://deinedomain.de/e/${eventCode}`);
      setCopied(true);
      flash('Gast-Link kopiert.');
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      flash('Kopieren nicht möglich.');
    }
  }

  return (
    <main className="page-shell">
      <div className="topbar">
        <div className="topbar-left">
          <div className="logo-box">🎧</div>
          <div>
            <h1 className="page-title">DJ Dashboard</h1>
            <p className="page-subtitle">{eventName}</p>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="btn btn-secondary">QR anzeigen</button>
          <button className="btn btn-primary" onClick={copyLink}>{copied ? 'Kopiert' : 'Gast-Link kopieren'}</button>
        </div>
      </div>

      {notice ? <div className="notice">{notice}</div> : null}

      <section className="stats-grid">
        <div className="panel panel-pad"><div className="stat-label">Gesamt</div><div className="stat-value">{stats.total}</div><div className="stat-sub">alle Wünsche</div></div>
        <div className="panel panel-pad"><div className="stat-label">Offen</div><div className="stat-value">{stats.open}</div><div className="stat-sub">neu eingegangen</div></div>
        <div className="panel panel-pad"><div className="stat-label">Angenommen</div><div className="stat-value">{stats.accepted}</div><div className="stat-sub">für später</div></div>
        <div className="panel panel-pad"><div className="stat-label">Gespielt</div><div className="stat-value">{stats.played}</div><div className="stat-sub">schon durch</div></div>
      </section>

      <section className="dashboard-grid">
        <div className="stack">
          <div className="panel panel-pad">
            <div className="section-head">
              <h2 className="section-title">Event bearbeiten</h2>
              <span className="badge badge-soft">Live Setup</span>
            </div>
            <div className="field-grid">
              <div className="full">
                <label className="label">Eventname</label>
                <input className="input" value={eventName} onChange={(e) => setEventName(e.target.value)} />
              </div>
              <div>
                <label className="label">Event-Code</label>
                <input className="input" value={eventCode} onChange={(e) => setEventCode(e.target.value.toUpperCase())} />
              </div>
              <div>
                <label className="label">Status</label>
                <input className="input" value={eventStatus} onChange={(e) => setEventStatus(e.target.value)} />
              </div>
              <div className="full">
                <label className="label">Limit für Gäste</label>
                <input className="input" value={guestLimit} onChange={(e) => setGuestLimit(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="panel panel-pad">
            <div className="toolbar">
              <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suche nach Song, Artist oder Gast" />
              <div className="filter-row">
                <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('all')}>Alle</button>
                <button className={`btn ${filter === 'open' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('open')}>Offen</button>
                <button className={`btn ${filter === 'accepted' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('accepted')}>Angenommen</button>
                <button className={`btn ${filter === 'played' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('played')}>Gespielt</button>
                <button className={`btn ${filter === 'rejected' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('rejected')}>Abgelehnt</button>
              </div>
            </div>
          </div>

          <div className="request-list">
            {filtered.map((item) => {
              const cls = item.status === 'open' ? 'live' : item.status;
              const badgeCls = item.status === 'open' ? 'badge-live' : item.status === 'accepted' ? 'badge-accepted' : item.status === 'played' ? 'badge-played' : 'badge-rejected';
              const label = item.status === 'open' ? 'LIVE / OFFEN' : item.status === 'accepted' ? 'Angenommen' : item.status === 'played' ? 'Gespielt' : 'Abgelehnt';

              return (
                <div key={item.id} className={`request-card ${cls}`}>
                  <div className="request-head">
                    <div>
                      <h3 className="request-title">{item.song_title}</h3>
                      <div className="request-meta">{item.artist}</div>
                      <div className="request-submeta">von {item.guest_name} • {new Date(item.created_at || Date.now()).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                      <span className={`badge ${badgeCls}`}>{label}</span>
                      <span className="request-id">#{item.id}</span>
                    </div>
                  </div>
                  <div className="request-actions">
                    <button className="btn btn-secondary" onClick={() => updateStatus(item.id, 'accepted')}>Annehmen</button>
                    <button className="btn btn-secondary" onClick={() => updateStatus(item.id, 'played')}>Gespielt</button>
                    <button className="btn btn-ghost" onClick={() => updateStatus(item.id, 'open')}>Zurück auf offen</button>
                    <button className="btn btn-ghost" onClick={() => updateStatus(item.id, 'rejected')}>Ablehnen</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stack">
          <div className="panel panel-pad">
            <div className="section-head">
              <h2 className="section-title">Event Übersicht</h2>
              <span className="badge badge-soft">{eventStatus}</span>
            </div>
            <div className="info-list">
              <div className="info-row"><span>Event-Code</span><span>{eventCode}</span></div>
              <div className="info-row"><span>Offene Limits</span><span>{guestLimit}</span></div>
              <div className="info-row"><span>Link</span><span>/e/{eventCode}</span></div>
            </div>
          </div>

          <div className="panel panel-pad">
            <h2 className="section-title">QR & Zugang</h2>
            <div className="qr-box">
              <div className="qr-code">▦</div>
              <div className="qr-note">QR-Code für Gästezugang</div>
            </div>
            <div className="row-2">
              <button className="btn btn-secondary">Link öffnen</button>
              <button className="btn btn-primary">Teilen</button>
            </div>
          </div>

          <div className="panel panel-pad">
            <h2 className="section-title">Bearbeiten & Aktionen</h2>
            <div className="side-actions">
              <button className="btn btn-primary btn-block" onClick={saveEvent}>Event speichern</button>
              <button className="btn btn-secondary btn-block" onClick={toggleEvent}>{eventStatus === 'Aktiv' ? 'Event pausieren' : 'Event aktivieren'}</button>
              <button className="btn btn-secondary btn-block" onClick={randomizeEventCode}>Gast-Link ändern</button>
              <button className="btn btn-secondary btn-block" onClick={changeGuestLimit}>Gäste-Limit ändern</button>
              <button className="btn btn-secondary btn-block" onClick={exportRequests}>Wünsche exportieren</button>
              <button className="btn btn-secondary btn-block" onClick={manageBlacklist}>Blacklist verwalten</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
