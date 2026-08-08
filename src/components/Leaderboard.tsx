import { Trophy, Crown, Medal } from 'lucide-react';
import { useWeeklyLeaderboard, type LeaderboardRow } from '@/hooks/useWeeklyLeaderboard';

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-4 w-4 text-gold-300" />;
  if (rank === 2) return <Medal className="h-4 w-4 text-slate2-300" />;
  if (rank === 3) return <Medal className="h-4 w-4 text-ember-400" />;
  return (
    <span className="font-mono text-xs font-bold text-slate2-500">#{rank}</span>
  );
}

function Row({ row }: { row: LeaderboardRow }) {
  return (
    <div
      className={`flex items-center gap-3 border-2 px-3 py-2 ${
        row.isMe
          ? 'border-gold-400 bg-gold-400/10'
          : 'border-ink-600 bg-ink-800/40'
      }`}
    >
      <div className="grid w-7 shrink-0 place-items-center">
        <RankBadge rank={row.rank} />
      </div>
      <span
        className={`min-w-0 flex-1 truncate font-mono text-xs font-bold uppercase tracking-widest ${
          row.isMe ? 'text-gold-200' : 'text-slate2-300'
        }`}
      >
        {row.username}
        {row.isMe && <span className="ml-1.5 text-gold-400">(vos)</span>}
      </span>
      <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-slate2-400">
        {row.xp} XP
      </span>
    </div>
  );
}

export default function Leaderboard() {
  const { rows, myRow, loaded } = useWeeklyLeaderboard();
  const meInTop = rows.some((r) => r.isMe);

  return (
    <section className="mt-10">
      <h2 className="mb-1 flex items-center gap-2 font-pixel text-sm text-gold-300 text-shadow-pixel">
        <Trophy className="h-4 w-4" />
        LIGA SEMANAL
      </h2>
      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate2-500">
        XP ganado esta semana — se reinicia cada lunes
      </p>

      {loaded && rows.length === 0 ? (
        <div className="border-2 border-dashed border-ink-500 bg-ink-800/40 p-8 text-center">
          <p className="font-terminal text-lg text-slate2-400">
            Todavía nadie ganó XP esta semana. Completá un paso de lección para
            abrir la tabla.
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {rows.map((row) => (
            <Row key={row.userId} row={row} />
          ))}
          {myRow && !meInTop && (
            <>
              <div className="py-1 text-center font-mono text-[10px] tracking-widest text-slate2-600">
                ···
              </div>
              <Row row={myRow} />
            </>
          )}
        </div>
      )}
    </section>
  );
}
