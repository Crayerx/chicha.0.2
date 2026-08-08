/*
# Create user_stats table (single-tenant, no auth)

1. New Tables
- `user_stats`
  - `id` (text, primary key) — fixed value 'default' (single-tenant, one row total)
  - `current_streak` (int, default 0) — consecutive days with at least one completed step
  - `longest_streak` (int, default 0) — best streak ever reached
  - `last_active_date` (date) — last calendar day the user completed a step
  - `updated_at` (timestamptz, default now()) — last time the row was touched

2. Security
- Enable RLS on `user_stats`.
- Allow anon + authenticated full CRUD, matching `lesson_progress`, because the
  app has no sign-in and the data is intentionally shared/public (single-tenant).

3. Notes
- The app reads/writes via the anon key, so policies MUST include `anon`.
- Single-row design (id is always 'default'), upserted from the client.
- Streak math (consecutive day check, reset on gap) happens client-side in
  `useUserStats`; this table just persists the result.
*/

CREATE TABLE IF NOT EXISTS user_stats (
  id text PRIMARY KEY DEFAULT 'default',
  current_streak int NOT NULL DEFAULT 0,
  longest_streak int NOT NULL DEFAULT 0,
  last_active_date date,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_user_stats" ON user_stats;
CREATE POLICY "anon_select_user_stats"
ON user_stats FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_user_stats" ON user_stats;
CREATE POLICY "anon_insert_user_stats"
ON user_stats FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_user_stats" ON user_stats;
CREATE POLICY "anon_update_user_stats"
ON user_stats FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_user_stats" ON user_stats;
CREATE POLICY "anon_delete_user_stats"
ON user_stats FOR DELETE
TO anon, authenticated USING (true);
