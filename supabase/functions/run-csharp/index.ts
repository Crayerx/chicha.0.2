// Edge Function: compila y ejecuta código C# de verdad usando Judge0 CE
// (a través de RapidAPI), y devuelve stdout/stderr/errores de compilación.
//
// ── Setup ────────────────────────────────────────────────────────────
// 1) Conseguí una API key gratis en:
//    https://rapidapi.com/judge0-official/api/judge0-ce  (plan Basic, gratis)
// 2) Guardala como secret del proyecto de Supabase:
//    supabase secrets set RAPIDAPI_KEY=tu_api_key_aca
// 3) Deployá la función (sin verificación de JWT, porque acá se puede
//    probar código sin estar logueado):
//    supabase functions deploy run-csharp --no-verify-jwt
//
// El front-end la llama con `supabase.functions.invoke('run-csharp', { body })`
// desde `src/lib/runCode.ts`.

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
// "C# (Mono 6.6.0.161)" — id fijo en Judge0 CE. Se puede confirmar/actualizar
// consultando GET https://judge0-ce.p.rapidapi.com/languages con la misma key.
const CSHARP_LANGUAGE_ID = 51;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Método no permitido.' }, 405);
  }

  const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
  if (!rapidApiKey) {
    return json(
      { error: 'Falta configurar el secret RAPIDAPI_KEY en el proyecto de Supabase (ver comentario arriba en este archivo).' },
      500,
    );
  }

  let body: { source_code?: unknown; stdin?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Body inválido: se esperaba JSON.' }, 400);
  }

  const sourceCode = body.source_code;
  if (typeof sourceCode !== 'string' || !sourceCode.trim()) {
    return json({ error: 'Falta el código a compilar (source_code).' }, 400);
  }
  const stdin = typeof body.stdin === 'string' ? body.stdin : '';

  try {
    const judgeRes = await fetch(JUDGE0_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: CSHARP_LANGUAGE_ID,
        stdin,
      }),
    });

    if (!judgeRes.ok) {
      const text = await judgeRes.text();
      return json({ error: `Judge0 respondió ${judgeRes.status}: ${text.slice(0, 400)}` }, 502);
    }

    const result = await judgeRes.json();

    return json({
      stdout: result.stdout ?? '',
      stderr: result.stderr ?? '',
      compile_output: result.compile_output ?? '',
      status: result.status ?? null, // { id, description } — id 3 = "Accepted"
      time: result.time ?? null,
      memory: result.memory ?? null,
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Error inesperado al llamar a Judge0.' }, 500);
  }
});
