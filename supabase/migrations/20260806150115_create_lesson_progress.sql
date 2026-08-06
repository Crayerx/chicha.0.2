/*
# Create lesson_progress table (single-tenant, no auth)

1. New Tables
- `lesson_progress`
  - `lesson_id` (text, primary key) — e.g. 'argentina'
  - `current_step` (int, default 1) — the step the user is currently on (1..10)
  - `total_xp` (int, default 0) — accumulated XP for this lesson
  - `completed_steps` (int[], default '{}') — array of completed step numbers
  - `is_finished` (boolean, default false) — whether the user reached the victory modal
  - `quiz_score` (int, default 0) — final quiz score
  - `updated_at` (timestamptz, default now()) — last time progress was saved

2. Security
- Enable RLS on `lesson_progress`.
- Allow anon + authenticated full CRUD because the app has no sign-in and the data is intentionally shared/public (single-tenant).

3. Notes
- The app reads/writes via the anon key, so policies MUST include `anon`.
- Uses a single-row-per-lesson design (lesson_id is the PK), so progress is upserted.
*/

CREATE TABLE IF NOT EXISTS lesson_progress (
  lesson_id text PRIMARY KEY,
  current_step int NOT NULL DEFAULT 1,
  total_xp int NOT NULL DEFAULT 0,
  completed_steps int[] NOT NULL DEFAULT '{}',
  is_finished boolean NOT NULL DEFAULT false,
  quiz_score int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_select_lesson_progress"
ON lesson_progress FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_insert_lesson_progress"
ON lesson_progress FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_update_lesson_progress"
ON lesson_progress FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_delete_lesson_progress"
ON lesson_progress FOR DELETE
TO anon, authenticated USING (true);