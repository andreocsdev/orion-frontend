import {
  getDailyCheckHistory,
  getOrCreateDailyCheck,
} from "@/app/_lib/api/fetch-generated";
import { HomeDailyInteractive } from "./home-daily-interactive";

type Props = { name: string };

export async function HomeDailyBlock({ name }: Props) {
  const [historyRes, dailyCheckRes] = await Promise.all([
    getDailyCheckHistory(),
    getOrCreateDailyCheck(),
  ]);

  if (dailyCheckRes.status !== 200) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-lg">Checklist Diário</h2>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar o checklist.
        </p>
      </div>
    );
  }

  const history = historyRes.status === 200 ? historyRes.data : [];

  return (
    <HomeDailyInteractive
      name={name}
      initialHistory={history}
      initialDailyCheck={dailyCheckRes.data}
    />
  );
}
