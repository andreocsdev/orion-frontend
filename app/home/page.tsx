import { authClient } from "../_lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { HomeDailyBlock } from "./_components/home-daily-block";
import { HomeEventsBlock } from "./_components/home-events-block";
import { VerseOfDay } from "./_components/verse-of-day";

export default async function HomePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  return (
    <div className="flex flex-col gap-4 px-5 pb-5">
      <HomeDailyBlock name={session.data.user.name} />
      <VerseOfDay />
      <HomeEventsBlock />
    </div>
  );
}
