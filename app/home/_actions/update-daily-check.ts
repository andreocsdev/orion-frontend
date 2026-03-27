"use server";

import { updateDailyCheck } from "@/app/_lib/api/fetch-generated";

export async function updateDailyCheckAction(data: {
  read_bible?: boolean;
  read_lesson?: boolean;
}) {
  const result = await updateDailyCheck(data);

  if (result.status !== 200) {
    throw new Error("Failed to update daily check");
  }

  return result.data;
}
