/*
# Add streak freeze to user_stats

1. Changes to `user_stats`
   - `freeze_available` (boolean, default true) — whether the user currently
     has an unused streak freeze to spend.
   - `freeze_week_start` (date) — the Monday of the ISO week the current
     `freeze_available` value belongs to. Used to grant exactly one freeze
     per calendar week: whenever `recordActivity()` runs in a new week, the
     freeze is replenished client-side and this column is updated.

2. Notes
   - Streak-freeze logic (when to consume it, when to replenish it) lives in
     `useUserStats`, same as the rest of the streak math. This migration only
     adds the columns needed to persist it per user.
*/

ALTER TABLE user_stats
  ADD COLUMN IF NOT EXISTS freeze_available boolean NOT NULL DEFAULT true;

ALTER TABLE user_stats
  ADD COLUMN IF NOT EXISTS freeze_week_start date;
