import {
  getDailyCheckHistory,
  getRanking,
  getUserProfile,
} from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { EventCard } from "@/components/event-card";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Coins,
  Flame,
  ShieldCheck,
  Trophy,
  UserRound,
  UsersRound,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

function getFirstName(name: string) {
  return name.split(" ")[0] ?? name;
}

export default async function PerfilPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  const [historyRes, profileRes, rankingRes] = await Promise.all([
    getDailyCheckHistory(),
    getUserProfile(),
    getRanking(),
  ]);

  if (profileRes.status !== 200) {
    return (
      <p className="p-5 text-sm text-muted-foreground">
        Erro ao carregar perfil.
      </p>
    );
  }

  const history = historyRes.status === 200 ? historyRes.data : [];
  const profile = profileRes.data;
  const isAdmin = profile.role === "ADMIN";

  const userScore = history.reduce((total, check) => {
    const biblePoints = check.read_bible ? 20 : 0;
    const lessonPoints = check.read_lesson ? 20 : 0;
    return total + biblePoints + lessonPoints;
  }, 0);
  const rankingPosition =
    rankingRes.status === 200
      ? rankingRes.data.findIndex((entry) => entry.id === profile.id) + 1
      : 0;

  return (
    <div className="flex flex-col gap-4 px-5 pb-5">
      <PageHeader
        className="bg-linear-to-r from-blue-600 to-blue-900"
        icon={<UserRound className="w-5 h-5 text-white" />}
        title={`Perfil de ${getFirstName(profile.name)}`}
        description="Acompanhe sua consistência e grupo."
      />

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Sua Sequência</h2>
        <Card
          className="overflow-hidden border-0 bg-cover bg-center shadow-md"
          style={{ backgroundImage: "url('/stats-banner.png')" }}
        >
          <CardContent className="relative flex min-h-36 flex-col items-center justify-center py-6 text-white">
            <div className="mb-2 rounded-full bg-black/20 p-3 backdrop-blur-sm">
              <Flame className="size-6 text-orange-200" />
            </div>
            <p className="text-5xl leading-none font-bold">
              {profile.currentStreak}
            </p>
            <p className="text-sm text-orange-100">dias de sequência</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-xs text-orange-700">Pontuação</p>
              <p className="text-2xl font-bold text-orange-800">{userScore}</p>
              <p className="text-xs text-orange-600">
                {rankingPosition > 0
                  ? `${rankingPosition}º no ranking`
                  : "Posição indisponível"}
              </p>
            </div>
            <Coins className="size-6 text-orange-500" />
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="text-xs text-indigo-700">Maior Streak</p>
              <p className="text-2xl font-bold text-indigo-800">
                {profile.bestStreak}
              </p>
            </div>
            <Trophy className="size-6 text-indigo-500" />
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Seu Grupo</h2>
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <div className="rounded-full bg-indigo-100 p-2 text-indigo-600">
              <UsersRound className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Grupo atual</p>
              <p className="font-medium">
                {profile.group?.name ?? "Você ainda não está em um grupo"}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Eventos do Seu Grupo</h2>
        {profile.groupEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum evento com responsabilidade do seu grupo no momento.
          </p>
        ) : (
          profile.groupEvents.map((event) => (
            <EventCard
              key={event.id}
              name={event.name}
              date={event.date}
              location={event.location}
              responsibleGroup={profile.group?.name ?? null}
              responsibleMembers={event.responsibleMembers}
            />
          ))
        )}
      </section>

      {isAdmin && (
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Área Administrativa</h2>
          <Card className="border-emerald-200 bg-emerald-50/70">
            <CardContent className="flex items-center justify-between gap-3 py-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-emerald-900">
                    Painel de Administração
                  </p>
                  <p className="text-xs text-emerald-800/80">
                    Gerencie grupos, eventos e vínculos de usuários em uma tela
                    dedicada.
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Link href="/admin">
                  Acessar
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
