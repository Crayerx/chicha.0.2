import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null;

export interface LessonProgress {
  lesson_id: string;
  current_step: number;
  total_xp: number;
  completed_steps: number[];
  is_finished: boolean;
  quiz_score: number;
}

export interface UserStats {
  id: string;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
  updated_at?: string;
}
