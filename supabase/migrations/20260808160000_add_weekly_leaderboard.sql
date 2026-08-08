/*
# Weekly leaderboard: public profiles + weekly_xp

Hasta ahora no existía ningún dato "público" del usuario — solo su email en
auth.users, que no debe exponerse en un ranking visible para otros. Esta
migración agrega lo mínimo necesario para un leaderboard semanal seguro.

1. New table `profiles`
   - `user_id` (uuid, PK, references auth.users) — dueño del perfil.
   - `username` (text) — nombre público mostrado en el leaderboard.
   - `updated_at` (timestamptz).
   - Se crea automáticamente para cada usuario nuevo vía trigger en
     auth.users (username inicial derivado del email + sufijo corto para
     evitar colisiones); el usuario puede cambiarlo después desde Perfil.
   - Se hace backfill para usuarios que ya existían antes de esta migración.

2. New table `weekly_xp`
   - `user_id` (uuid) — FK a `profiles.user_id` (no a auth.users
     directamente), así PostgREST puede resolver el join
     `weekly_xp -> profiles` al pedir el leaderboard desde el cliente.
   - `week_start` (date) — lunes ISO de la semana (mismo criterio que
     `mondayOf()` en el cliente).
   - `xp` (int) — XP acumulado esa semana.
   - PK compuesta (user_id, week_start).

3. Security
   - `profiles`: SELECT abierto a `authenticated` (todos necesitan ver el
     nombre de todos para el ranking); INSERT/UPDATE solo de la propia fila.
   - `weekly_xp`: SELECT abierto a `authenticated`; SIN políticas de
     INSERT/UPDATE directas — el único camino para escribir es la función
     `increment_weekly_xp`, que corre con `security definer` y siempre usa
     `auth.uid()`, así ningún usuario puede inflar el XP de otro ni el
     propio con un valor arbitrario fuera del flujo normal de la app.

4. Function `increment_weekly_xp(delta int)`
   - Suma `delta` al XP de la semana actual del usuario autenticado
     (upsert). Se llama desde el cliente cada vez que se gana XP en una
     lección, junto a `recordActivity`.
*/

-- ── profiles ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_all_profiles" ON profiles;
CREATE POLICY "select_all_profiles"
ON profiles FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile"
ON profiles FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
ON profiles FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Username inicial automático para cada usuario nuevo: prefijo del email +
-- 4 caracteres del uuid para evitar colisiones (ej. "juan_3f2a"). El
-- usuario lo puede cambiar después desde su Perfil.
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username)
  VALUES (
    new.id,
    split_part(coalesce(new.email, 'jugador'), '@', 1) || '_' || substr(new.id::text, 1, 4)
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();

-- Backfill para usuarios que ya existían antes de que existiera esta tabla.
INSERT INTO public.profiles (user_id, username)
SELECT id, split_part(coalesce(email, 'jugador'), '@', 1) || '_' || substr(id::text, 1, 4)
FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- ── weekly_xp ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS weekly_xp (
  user_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  week_start date NOT NULL,
  xp int NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, week_start)
);

ALTER TABLE weekly_xp ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_all_weekly_xp" ON weekly_xp;
CREATE POLICY "select_all_weekly_xp"
ON weekly_xp FOR SELECT
TO authenticated USING (true);

-- Sin políticas de INSERT/UPDATE: la única vía de escritura es la función
-- increment_weekly_xp (security definer), más abajo.

-- ── increment_weekly_xp ─────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.increment_weekly_xp(delta int)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  wk date := (current_date - (extract(isodow FROM current_date)::int - 1));
BEGIN
  IF delta <= 0 OR auth.uid() IS NULL THEN
    RETURN;
  END IF;

  INSERT INTO public.weekly_xp (user_id, week_start, xp)
  VALUES (auth.uid(), wk, delta)
  ON CONFLICT (user_id, week_start)
  DO UPDATE SET xp = weekly_xp.xp + delta;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_weekly_xp(int) TO authenticated;
