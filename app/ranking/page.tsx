import { getRanking } from "@/app/_lib/api/fetch-generated";
import { BookOpen, Trophy } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { RankCard } from "./_components/rank-card";

const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default async function RankingPage() {
  const res = await getRanking();
  const entries = res.status === 200 ? res.data : [];

  const now = new Date();
  const currentMonth = MONTHS_PT[now.getMonth()];
  const currentYear = now.getFullYear();

  return (
    <div className="flex flex-col px-5 pb-5">
      <PageHeader
        className="bg-linear-to-r from-blue-600 to-blue-900"
        icon={<Trophy className="w-5 h-5 text-white" />}
        title="Ranking"
        description={`${currentMonth} ${currentYear} · Cada check vale 20 pts`}
      />

      <div className="mt-5 flex items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <BookOpen className="size-3.5 text-indigo-400" />
          Bíblia
        </span>
        <span className="flex items-center gap-1">
          <BookOpen className="size-3.5 text-emerald-400" />
          Lição
        </span>
        <span className="text-gray-300">·</span>
        <span>1 check = 20 pts</span>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {entries.length === 0 ? (
          <p className="mt-16 text-center text-gray-400">
            Nenhum dado disponível ainda.
          </p>
        ) : (
          entries.map((entry, i) => (
            <RankCard key={entry.id} entry={entry} position={i} />
          ))
        )}
      </div>
    </div>
  );
}
