"use client";

import type { DailyCheck } from "@/app/_lib/api/fetch-generated";
import { BookOpen, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  dailyCheck: DailyCheck;
  onToggle: (field: "read_bible" | "read_lesson") => Promise<void>;
  isUpdating?: boolean;
};

function CheckItem({
  label,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`flex h-full items-center gap-3 rounded-2xl border bg-white px-4 py-4 text-left transition-colors ${
        checked ? "border-green-400" : "border-gray-200"
      } ${disabled ? "opacity-70" : ""}`}
    >
      <div className={`${iconBg} p-2 rounded-xl shrink-0`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-black">{label}</p>
        <p className="text-xs text-gray-500 truncate">{subtitle}</p>
      </div>
      <div
        className={`size-5 shrink-0 rounded-sm border-2 ${
          checked ? "border-green-500 bg-green-500" : "border-gray-300"
        } flex items-center justify-center`}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="size-3 fill-white">
            <path
              d="M1 4l3 3 5-6"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

export function DailyCheckList({
  dailyCheck,
  onToggle,
  isUpdating = false,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <CheckItem
        label="Leitura da Bíblia"
        subtitle="Já leu hoje?"
        icon={BookOpen}
        iconBg="bg-purple-100"
        iconColor="text-purple-600"
        checked={dailyCheck.read_bible}
        onChange={() => onToggle("read_bible")}
        disabled={isUpdating}
      />
      <CheckItem
        label="Leitura da Lição"
        subtitle="Já leu hoje?"
        icon={GraduationCap}
        iconBg="bg-pink-100"
        iconColor="text-pink-600"
        checked={dailyCheck.read_lesson}
        onChange={() => onToggle("read_lesson")}
        disabled={isUpdating}
      />
    </div>
  );
}
