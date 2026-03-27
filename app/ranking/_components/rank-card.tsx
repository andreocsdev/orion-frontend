import { RankingEntry } from "@/app/_lib/api/fetch-generated";
import { BookOpen } from "lucide-react";
import { RankAvatar } from "./rank-avatar";

const MEDAL: Record<number, string> = { 0: "🥇", 1: "🥈", 2: "🥉" };

export function RankCard({
  entry,
  position,
}: {
  entry: RankingEntry;
  position: number;
}) {
  const isTop3 = position < 3;

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border px-4 py-3 transition-shadow ${
        isTop3
          ? "border-purple-200 bg-linear-to-r from-purple-50 to-indigo-50 shadow-sm"
          : "border-gray-100 bg-white"
      }`}
    >
      <div className="w-8 shrink-0 text-center">
        {isTop3 ? (
          <span className="text-2xl">{MEDAL[position]}</span>
        ) : (
          <span className="text-sm font-bold text-gray-400">
            {position + 1}
          </span>
        )}
      </div>

      <RankAvatar name={entry.name} image={entry.image} />

      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <p className="truncate font-semibold text-gray-900">{entry.name}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <BookOpen className="size-3 text-indigo-400" />
            {entry.bibleCount} Bíblia
          </span>
          <span className="text-gray-300">·</span>
          <span className="flex items-center gap-1">
            <BookOpen className="size-3 text-emerald-400" />
            {entry.lessonCount} Lição
          </span>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-lg font-bold text-blue-700">{entry.score}</p>
        <p className="text-xs text-gray-400">pts</p>
      </div>
    </div>
  );
}
