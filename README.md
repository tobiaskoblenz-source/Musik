# DJ Request App

Schlanke private DJ-Wunsch-App mit Next.js und Supabase.

## Was drin ist
- einfache Gäste-Seite unter `/e/[eventCode]`
- freie Eingabe für Song und Artist
- API zum Absenden von Wünschen
- einfaches Dashboard mit letzten Wünschen
- DJ-Login per Magic Link

## Setup
1. Supabase-Projekt anlegen
2. `supabase/schema.sql` im SQL Editor ausführen
3. `.env.example` nach `.env.local` kopieren
4. Werte eintragen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Abhängigkeiten installieren:
   - `npm install`
6. Starten:
   - `npm run dev`

## Demo
- Startseite: `/`
- Login: `/login`
- Dashboard: `/dashboard`
- Gäste-Seite: `/e/PARTY-2026`

## Nächste sinnvolle Schritte
- Dashboard mit Status-Buttons
- Event-Erstellung im UI
- Realtime Updates
- QR-Code
- Duplicate-Erkennung
- Zugriffsschutz fürs Dashboard mit Middleware
