/*
# Move to per-user data (Supabase Auth)

Until now `lesson_progress` and `user_stats` were single-tenant: every
visitor with the anon key read and overwrote the SAME rows. This migration
ties both tables to `auth.users` so each signed-in user gets their own
progress, protected by RLS.

1. Changes to `lesson_progress`
   - Add `user_id uuid` referencing `auth.users`.
   - IMPORTANT: existing rows have no owner and are deleted (see note below).
   - Primary key becomes the pair `(user_id, lesson_id)`.
   - RLS policies now require `auth.uid() = user_id` — anonymous access is
     removed entirely.

2. Changes to `user_stats`
   - Drop the old single fixed-id design (`id = 'default'`).
   - `user_id uuid` (referencing `auth.users`) becomes the primary key —
     one streak record per user.
   - Same per-user RLS as above.

3. Data note
   This project had no real users yet (single shared demo row), so there is
   nothing meaningful to migrate to a specific `user_id` — old anonymous
   rows are wiped as part of this migration. If you already have real
   traffic you care about, back up `lesson_progress` / `user_stats` before
   running this.

4. Security
   RLS stays enabled on both tables. Only the `authenticated` role can
   read/write, and only rows where `user_id = auth.uid()`. The `anon` role
   loses all access — signed-out visitors can no longer see or touch
   progress data.
*/

-- ── lesson_progress ─────────────────────────────────────────────────────

-- Old anonymous rows have no owner; there are no real users to attribute
-- them to yet, so we clear the table before enforcing the new NOT NULL
-- user_id + composite primary key.
TRUNCATE TABLE lesson_progress;

ALTER TABLE lesson_progress
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE lesson_progress
  ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE lesson_progress
  DROP CONSTRAINT IF EXISTS lesson_progress_pkey;

ALTER TABLE lesson_progress
  ADD PRIMARY KEY (user_id, lesson_id);

DROP POLICY IF EXISTS "anon_select_lesson_progress" ON lesson_progress;
DROP POLICY IF EXISTS "anon_insert_lesson_progress" ON lesson_progress;
DROP POLICY IF EXISTS "anon_update_lesson_progress" ON lesson_progress;
DROP POLICY IF EXISTS "anon_delete_lesson_progress" ON lesson_progress;

DROP POLICY IF EXISTS "select_own_lesson_progress" ON lesson_progress;
CREATE POLICY "select_own_lesson_progress"
ON lesson_progress FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_lesson_progress" ON lesson_progress;
CREATE POLICY "insert_own_lesson_progress"
ON lesson_progress FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_lesson_progress" ON lesson_progress;
CREATE POLICY "update_own_lesson_progress"
ON lesson_progress FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_lesson_progress" ON lesson_progress;
CREATE POLICY "delete_own_lesson_progress"
ON lesson_progress FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- ── user_stats ──────────────────────────────────────────────────────────

TRUNCATE TABLE user_stats;

ALTER TABLE user_stats
  DROP CONSTRAINT IF EXISTS user_stats_pkey;

ALTER TABLE user_stats
  DROP COLUMN IF EXISTS id;

ALTER TABLE user_stats
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE user_stats
  ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE user_stats
  ADD PRIMARY KEY (user_id);

DROP POLICY IF EXISTS "anon_select_user_stats" ON user_stats;
DROP POLICY IF EXISTS "anon_insert_user_stats" ON user_stats;
DROP POLICY IF EXISTS "anon_update_user_stats" ON user_stats;
DROP POLICY IF EXISTS "anon_delete_user_stats" ON user_stats;

DROP POLICY IF EXISTS "select_own_user_stats" ON user_stats;
CREATE POLICY "select_own_user_stats"
ON user_stats FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_user_stats" ON user_stats;
CREATE POLICY "insert_own_user_stats"
ON user_stats FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_user_stats" ON user_stats;
CREATE POLICY "update_own_user_stats"
ON user_stats FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_user_stats" ON user_stats;
CREATE POLICY "delete_own_user_stats"
ON user_stats FOR DELETE
TO authenticated USING (auth.uid() = user_id);
