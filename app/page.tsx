import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="home-shell">
      <div className="home-card">
        <h1 className="hero-title">Private DJ Request App</h1>
        <p className="hero-sub">Schlichte Gäste-Seite, großes DJ-Dashboard und ein Workflow nur für dich.</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/dashboard">Zum Dashboard</Link>
          <Link className="btn btn-secondary" href="/e/PARTY-2026">Gäste-Seite öffnen</Link>
          <Link className="btn btn-secondary" href="/login">DJ-Login</Link>
        </div>
      </div>
    </main>
  );
}
