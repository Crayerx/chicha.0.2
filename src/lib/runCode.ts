import { supabase, isSupabaseConfigured } from './supabase';

export interface RunResult {
  stdout: string;
  stderr: string;
  compileOutput: string;
  statusId: number | null;
  statusDescription: string;
  time: string | null;
  memory: number | null;
}

/** true cuando Judge0 devolvió "Accepted" (status.id === 3), sin importar el output. */
export function ranSuccessfully(result: RunResult): boolean {
  return result.statusId === 3;
}

/**
 * Compila y ejecuta código C# de verdad, vía la Edge Function `run-csharp`
 * (que a su vez llama a Judge0 CE). Lanza un Error con mensaje legible si
 * algo falla — la UI lo muestra directamente en la consola de salida.
 */
export async function runCSharp(sourceCode: string, stdin = ''): Promise<RunResult> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase no está configurado: no se puede compilar código en este entorno.');
  }

  const { data, error } = await supabase.functions.invoke('run-csharp', {
    body: { source_code: sourceCode, stdin },
  });

  if (error) {
    throw new Error(error.message ?? 'No se pudo conectar con el compilador.');
  }
  if (data?.error) {
    throw new Error(data.error as string);
  }

  return {
    stdout: data?.stdout ?? '',
    stderr: data?.stderr ?? '',
    compileOutput: data?.compile_output ?? '',
    statusId: data?.status?.id ?? null,
    statusDescription: data?.status?.description ?? 'Desconocido',
    time: data?.time ?? null,
    memory: data?.memory ?? null,
  };
}
