/*
# Add daily XP goal to user_stats

1. Changes to `user_stats`
   - `daily_goal_xp` (int, default 80) — XP que el usuario quiere ganar por
     día. 80 XP ≈ 10 min de estudio (1 paso de lección ronda los 80 XP).
     Configurable desde el perfil.
   - `xp_today` (int, default 0) — XP acumulado en el día calendario actual.
     Se resetea a 0 la primera vez que se registra actividad en un día
     distinto a `xp_today_date`.
   - `xp_today_date` (date) — a qué día calendario corresponde `xp_today`.

2. Notes
   - Igual que el resto de las stats, este contador se calcula y resetea
     client-side en `useUserStats` (mismo criterio de "día calendario" que
     ya usa el streak); esta migración solo agrega las columnas para
     persistirlo por usuario.
   - No reemplaza `lesson_progress.total_xp` (que es XP acumulado por
     lección, para siempre) — este es un contador aparte, del día en curso,
     pensado para la barra de objetivo diario.
*/

ALTER TABLE user_stats
  ADD COLUMN IF NOT EXISTS daily_goal_xp int NOT NULL DEFAULT 80;

ALTER TABLE user_stats
  ADD COLUMN IF NOT EXISTS xp_today int NOT NULL DEFAULT 0;

ALTER TABLE user_stats
  ADD COLUMN IF NOT EXISTS xp_today_date date;
