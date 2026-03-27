"use client";

import type { DailyCheck } from "@/app/_lib/api/fetch-generated";
import { HomeHeader } from "./home-header";
import { DailyCheckList } from "./daily-check-list";
import { updateDailyCheckAction } from "../_actions/update-daily-check";
import { useMemo, useState } from "react";

type Props = {
  name: string;
  initialHistory: DailyCheck[];
  initialDailyCheck: DailyCheck;
};

function toDateKey(dateLike: string | Date) {
  const d = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
  return d.toLocaleDateString("en-CA");
}

function calcStreak(history: DailyCheck[]): number {
  const checkMap = new Map(history.map((c) => [c.checkDate.slice(0, 10), c]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = toDateKey(today);
  const todayCheck = checkMap.get(todayKey);

  let streak = 0;
  let cursor = new Date(today);

  if (todayCheck && !(todayCheck.read_bible && todayCheck.read_lesson)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const key = toDateKey(cursor);
    const check = checkMap.get(key);
    if (check?.read_bible && check?.read_lesson) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

function mergeHistory(
  history: DailyCheck[],
  updated: DailyCheck,
): DailyCheck[] {
  const updatedKey = updated.checkDate.slice(0, 10);
  let found = false;

  const next = history.map((item) => {
    const itemKey = item.checkDate.slice(0, 10);
    if (itemKey === updatedKey) {
      found = true;
      return updated;
    }
    return item;
  });

  if (!found) {
    next.push(updated);
  }

  return next;
}

export function HomeDailyInteractive({
  name,
  initialHistory,
  initialDailyCheck,
}: Props) {
  const [history, setHistory] = useState(initialHistory);
  const [dailyCheck, setDailyCheck] = useState(initialDailyCheck);
  const [isUpdating, setIsUpdating] = useState(false);

  const streak = useMemo(() => calcStreak(history), [history]);

  async function onToggle(field: "read_bible" | "read_lesson") {
    if (isUpdating) return;

    const previous = dailyCheck;
    const optimistic: DailyCheck = {
      ...dailyCheck,
      [field]: !dailyCheck[field],
    };

    setIsUpdating(true);
    setDailyCheck(optimistic);
    setHistory((prev) => mergeHistory(prev, optimistic));

    try {
      const updated = await updateDailyCheckAction({
        [field]: !previous[field],
      });
      setDailyCheck(updated);
      setHistory((prev) => mergeHistory(prev, updated));
    } catch {
      setDailyCheck(previous);
      setHistory((prev) => mergeHistory(prev, previous));
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <HomeHeader name={name} streak={streak} />
      <DailyCheckList
        dailyCheck={dailyCheck}
        onToggle={onToggle}
        isUpdating={isUpdating}
      />
    </div>
  );
}
